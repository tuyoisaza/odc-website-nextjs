const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

test('npm startup only starts Next.js and has no lifecycle schema hooks', () => {
  assert.equal(pkg.scripts.start, 'next start');
  assert.equal(pkg.scripts.prestart, undefined);
  assert.equal(pkg.scripts.poststart, undefined);
});

test('container starts the standalone server directly without a shell or schema command', () => {
  const dockerfile = fs.readFileSync(path.join(root, 'Dockerfile'), 'utf8');
  const instructions = dockerfile.split(/\r?\n/).filter(line => !/^\s*#/.test(line));
  const cmds = instructions.filter(line => /^CMD\s/.test(line));
  assert.equal(cmds.length, 1);
  assert.deepEqual(JSON.parse(cmds[0].replace(/^CMD\s+/, '')), ['node', 'server.js']);
  assert.equal(instructions.some(line => /^ENTRYPOINT\s/.test(line)), false);
  assert.doesNotMatch(instructions.join('\n'), /db\s+push|migrate\s+(deploy|dev|reset)|accept-data-loss/);
});

test('Railway configuration does not add a schema mutation deployment hook', () => {
  const config = fs.readFileSync(path.join(root, 'railway.json'), 'utf8');
  assert.doesNotMatch(config, /prisma|db\s+push|migrate|accept-data-loss/i);
});

test('schema validation is explicit and does not reconcile a database', () => {
  assert.equal(pkg.scripts['db:schema:validate'], 'prisma validate');
});
