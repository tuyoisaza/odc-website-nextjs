import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const resolveModule = createRequire(import.meta.url);
import ts from 'typescript';
import { test } from 'node:test';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Exercise the real TS modules with only network/session/database boundaries mocked.
function load(file, mocks = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020,
  } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, module: { exports }, Response, URL, console, process: { env: {} },
    require: name => name in mocks ? mocks[name] : resolveModule(name),
  }, { filename: file });
  return exports;
}

const navigation = load('lib/auth-navigation.ts');
function harness() {
  let session = null;
  const redirects = [];
  const rbac = load('lib/rbac.ts', {
    'next-auth/next': { getServerSession: async () => session },
    '@/lib/auth': { authOptions: {} },
    '@/lib/auth-navigation': navigation,
    'next/navigation': { redirect: url => { redirects.push(url); throw new Error('REDIRECT'); } },
  });
  return { rbac, redirects, setSession: value => { session = value; } };
}
const userSession = role => ({ user: { id: 'unit-user', role }, expires: '2099-01-01' });

test('anonymous sessions never inherit member access; authenticated policy is preserved', async () => {
  const h = harness();
  assert.equal(await h.rbac.hasRole(['member']), false);
  for (const role of ['member', 'team_leader', 'admin', 'super_admin']) {
    h.setSession(userSession(role));
    assert.equal(await h.rbac.hasRole([role]), true);
    assert.equal(await h.rbac.hasRole(['admin', 'super_admin']), ['admin', 'super_admin'].includes(role));
  }
  h.setSession(userSession('unknown'));
  assert.equal(await h.rbac.hasRole(['member', 'admin', 'super_admin', 'team_leader']), false);
  h.setSession(null);
  await assert.rejects(h.rbac.requireRole(['member']), /REDIRECT/);
  assert.equal(h.redirects.at(-1), '/en/login?callbackUrl=%2Fen%2Fadmin');
});

test('callbacks remain in the selected admin area and never loop through login or external URLs', () => {
  for (const locale of ['en', 'es', 'pt']) {
    const fallback = `/${locale}/admin`;
    const target = `/${locale}/admin/clients?sort=name`;
    assert.equal(navigation.adminCallbackPath(locale, target), target);
    assert.equal(navigation.adminLoginUrl(locale, target), `/${locale}/login?callbackUrl=${encodeURIComponent(target)}`);
    for (const value of ['https://outside.invalid', '//outside.invalid', '/%2foutside.invalid',
      `/${locale}/login`, `/${locale}/admin/login`, '/api/auth/signin', '/en/admin/../login',
      '/en/admin\\outside', '/en/admin%0a', '%invalid']) {
      assert.equal(navigation.adminCallbackPath(locale, value), fallback);
    }
  }
});

test('admin home and protected layouts consistently reject anonymous navigation, then permit existing roles', async () => {
  const h = harness();
  const mocks = { '@/lib/rbac': h.rbac, '@/lib/auth-navigation': navigation, 'next/link': 'a' };
  const home = load('app/[locale]/admin/page.tsx', mocks).default;
  const protectedLayout = load('app/[locale]/admin/(protected)/layout.tsx', mocks).default;
  for (const locale of ['en', 'es', 'pt']) {
    for (let visit = 0; visit < 2; visit++) {
      h.setSession(null);
      const props = { params: Promise.resolve({ locale }), children: 'protected-content' };
      await assert.rejects(home(props), /REDIRECT/);
      await assert.rejects(protectedLayout(props), /REDIRECT/);
      assert.equal(h.redirects.at(-1), navigation.adminLoginUrl(locale));
      for (const role of ['member', 'team_leader', 'admin', 'super_admin']) {
        h.setSession(userSession(role));
        assert.ok(await home(props));
        assert.ok(await protectedLayout(props));
      }
    }
  }
  const source = fs.readFileSync(path.join(root, 'app/[locale]/admin/page.tsx'), 'utf8');
  assert.doesNotMatch(source, /sessionStorage|ADMIN_PASS|ADMIN_USER|use client/);
});

test('login button preserves safe callbacks across repeated locale navigation', () => {
  let locale = 'en';
  let callback = null;
  const calls = [];
  const page = load('app/[locale]/login/page.tsx', {
    '@/lib/auth-navigation': navigation,
    'next-auth/react': { signIn: (...args) => calls.push(args) },
    'next/navigation': {
      useParams: () => ({ locale }),
      useSearchParams: () => new URLSearchParams(callback ? { callbackUrl: callback } : {}),
    },
  }).default;
  function button(element) {
    if (!element || typeof element !== 'object') return undefined;
    if (element.type === 'button') return element;
    return [element.props?.children].flat(Infinity).map(button).find(Boolean);
  }
  for (locale of ['en', 'es', 'pt', 'en']) {
    for (callback of [`/${locale}/admin/clients`, 'https://outside.invalid', `/${locale}/login`]) {
      button(page()).props.onClick();
      const [provider, options] = calls.at(-1);
      assert.equal(provider, 'google');
      assert.equal(options.callbackUrl, navigation.adminCallbackPath(locale, callback));
    }
  }
});

test('old admin login bookmarks redirect once to the real localized login', async () => {
  const targets = [];
  const page = load('app/[locale]/admin/login/page.tsx', {
    '@/lib/auth-navigation': navigation,
    'next/navigation': { redirect: url => { targets.push(url); throw new Error('REDIRECT'); } },
  }).default;
  for (const locale of ['en', 'es', 'pt', 'en']) {
    await assert.rejects(page({ params: Promise.resolve({ locale }) }), /REDIRECT/);
    assert.equal(targets.at(-1), navigation.adminLoginUrl(locale));
    assert.equal(navigation.adminCallbackPath(locale), `/${locale}/admin`);
  }
  const source = fs.readFileSync(path.join(root, 'lib/auth.ts'), 'utf8');
  assert.match(source, /signIn: "\/es\/login"/);
});

test('POST admin clients rejects anonymous and non-admin requests before parsing body or accessing DB', async () => {
  const h = harness();
  let writes = 0;
  let reads = 0;
  const route = load('app/api/admin/clients/route.ts', {
    '@/lib/rbac': h.rbac,
    'next/server': { NextResponse: { json: (value, options) => Response.json(value, options) } },
    '@/lib/prisma': { prisma: { client: { create: async ({ data }) => { writes++; return data; } } } },
  });
  const request = { json: async () => { reads++; return { name: 'unit-client' }; } };
  for (const [session, expected] of [[null, 401], [userSession('member'), 403],
    [userSession('team_leader'), 403], [userSession('unknown'), 403], [null, 401]]) {
    h.setSession(session);
    assert.equal((await route.POST(request)).status, expected);
  }
  assert.equal(reads, 0);
  assert.equal(writes, 0);
  for (const role of ['admin', 'super_admin']) {
    h.setSession(userSession(role));
    assert.equal((await route.POST(request)).status, 200);
  }
  assert.equal(writes, 2);
  h.setSession(userSession('admin'));
  assert.equal((await route.POST({ json: async () => ({}) })).status, 400);
  assert.equal(writes, 2);
});

test('v4 adapter preserves stored user roles and session model without a schema migration', async () => {
  const user = { id: 'unit-user', email: 'unit@example.invalid', role: 'admin' };
  const session = { sessionToken: 'unit-session', userId: user.id, expires: new Date('2099-01-01') };
  let storedSession = null;
  let sessionData;
  const adapter = PrismaAdapter({
    user: { findUnique: async () => user },
    account: { findUnique: async () => ({ user }) },
    session: {
      findUnique: async () => storedSession,
      create: async ({ data }) => { sessionData = data; return data; },
    },
    verificationToken: { delete: async () => { throw { code: 'P2025' }; } },
  });
  assert.equal(await adapter.getSessionAndUser(session.sessionToken), null);
  storedSession = { ...session, user };
  assert.deepEqual(await adapter.getSessionAndUser(session.sessionToken), { session, user });
  assert.equal((await adapter.getUserByAccount({ provider: 'google', providerAccountId: 'unit-account' })).role, 'admin');
  await adapter.createSession(session);
  assert.deepEqual(sessionData, session);
  assert.equal(await adapter.useVerificationToken({ identifier: 'unit@example.invalid', token: 'unit-token' }), null);
  const auth = load('lib/auth.ts', {
    '@next-auth/prisma-adapter': { PrismaAdapter: () => adapter },
    '@/lib/prisma': { prisma: {} },
    'next-auth/providers/email': { default: options => options },
    'next-auth/providers/google': { default: options => options },
  }).authOptions;
  const result = await auth.callbacks.session({ session: { user: {} }, user });
  assert.equal(result.user.id, user.id);
  assert.equal(result.user.role, 'admin');
  assert.equal(user.role, 'admin');
});
