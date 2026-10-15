# Admin access remediation — v1.2.33 (draft, not deployed)

## Deployment hold

Do not merge/deploy this draft until an existing authorized administrator can use
NextAuth and an independent reviewer approves the exact diff. No roles, users,
credentials, provider configuration, or production records are changed here.
Keep the user's existing NEXTAUTH_SECRET unchanged.

Read-only Railway metadata on 2026-10-15 confirmed:

- production environment `2647d8e7-51ce-4699-af15-8b00e279155c` has no shared
  variable names;
- the environment's Variable connection, selecting only `name`, `serviceId`,
  `pluginId`, `isSealed`, and `references`, contains only NEXTAUTH_SECRET for ODC,
  with no references;
- no GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, EMAIL_SERVER, or EMAIL_FROM appears;
- the repository's auth module reads those provider settings from environment
  variables, and the Dockerfile supplies no provider credentials.

No variable values were requested or read. `/api/auth/providers` listing provider
IDs is not proof of a configured, working login. The existing admin identity and
role were not inspected or changed. A real provider sign-in by the authorized
administrator remains a human verification prerequisite; no test email or OAuth
submission is part of this draft.

## Scope

- Replace browser-only admin credentials/sessionStorage gating with the existing
  server-side NextAuth/RBAC policy. The homepage and protected layout keep the
  existing four-role allow-list; no new role or broader access is introduced.
- A missing session no longer receives the member fallback used for authenticated
  users. Unknown roles stay denied.
- Redirect to real localized login pages with local admin callbacks. Old
  `/{locale}/admin/login` bookmarks redirect once to `/{locale}/login`.
  NextAuth's generic sign-in page uses the existing default Spanish login route.
- Restrict POST `/api/admin/clients` to super_admin/admin, matching existing admin
  user-management policy. Return 401 for anonymous and 403 for other roles before
  reading the request body or touching Prisma. Public/read-only client queries
  are unchanged.

This is not a complete authorization audit. Other preexisting mutation handlers,
server actions, role-specific page access, and error handling need a separate
review. In particular, protecting this one POST does not claim that every admin
write endpoint is secured.

## Review and verification

`npm run test:auth` runs the actual TS modules with mocked session, redirect and
Prisma boundaries. It covers anonymous/member/team_leader/admin/super_admin and
unknown roles, repeated navigation, all supported locales, legacy bookmark
redirects, safe callbacks, rejection before database access, and the adapter's
stored-role/session contract. All seven auth tests and four startup tests passed.
Test fixtures
never enter product code or production. `npm run test:startup` retains the
schema-free startup checks. The final `npm run build` completed with Next 16.4.1,
Prisma Client generation, TypeScript checks and static generation. `npm run lint`
completed with zero errors and ten warnings in preexisting UI files. Tests use
ES modules rather than disabling the lint rule for CommonJS imports.
`git diff --check` and the final `npm ls` compatibility check passed. This draft
has not been built/run as a new Linux container; production remains untouched.

## Compatible dependency work and remaining decisions

Next.js and its ESLint config advance together from 16.1.6 to 16.4.1; NextAuth
stays on v4 and advances to 4.24.15. Sharp/PostCSS transitives update through the
official Next package. No force install, legacy-peer mode, audit suppression, or
schema migration is used.

Updating `@auth/prisma-adapter` to 2.11.3 initially exposed a peer conflict:
it requires core 0.41.3 while NextAuth v4 declares optional core 0.34.3. The draft
instead uses the official `@next-auth/prisma-adapter` 1.0.7, whose published peer
contract is NextAuth ^4 and Prisma Client >=2.26 / >=3. This removes the unused
Auth.js-core tree and `npm ls` passes. The database models and session callback
remain unchanged. Mocked adapter/session checks preserve stored roles and IDs;
this is not proof of real provider login and is specifically part of independent
review before deployment.

After those changes, npm audit reports zero critical findings: four findings in
`--omit=dev` (three high through the Prisma CLI/config/deepmerge chain and one
moderate baseline-browser-mapping finding), versus fifteen before this draft.
Full audit is thirteen findings (twelve high, one moderate), versus twenty-three
at the previous Linux build. This does NOT mean every runtime issue is fixed:
Nodemailer remains in devDependencies but EmailProvider imports it at runtime.
Its suggested fix is 10.1.1, outside NextAuth v4's ^7.0.7 peer range. A major mail
integration change must be reviewed separately; no peer constraint is bypassed.
Likewise, npm's suggested Prisma downgrade to 6.12 is not applied. Other lint/build
tool alerts and the baseline-browser-mapping patch remain separate decisions.

The deployment hold is deliberate: removing the insecure browser credential
screen without a usable authorized replacement could strand the operator. The
draft is reviewable independently; no production fallback credential or session
protection bypass is supplied.
