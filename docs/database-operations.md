# Database operations and startup safety (v1.2.31)

## Scope and decision

`npm start` starts Next.js; the container starts `node server.js` directly.
Neither command changes schema, seeds data, downloads Prisma, or repairs drift.
Schema administration is a separate, reviewed maintenance operation. A new or
incompatible database can therefore produce application errors: provision or
reconcile it explicitly before serving traffic. Do not restore automatic `db push`
as a workaround.

This change adds no migrations and changes no Prisma models. It does not prove
that the deployed database matches the schema, nor that a backup is recoverable.
No production database was inspected or changed during preparation.

## Preparation evidence and limits (2026-10-15)

- Four `npm run test:startup` contract tests passed; `git diff --check` passed.
- The initial SQL applied successfully to Python SQLite in memory, with
  `PRAGMA integrity_check = ok`. Table/column inspection confirmed the gaps below.
  This checks the SQL independently; it is not a Prisma migrate/restore rehearsal.
- Dependency installation recovered with a clean cache and approved network access:
  `npm ci --no-audit --no-fund --cache ../npm-cache-diagnostic-clean
  --fetch-retries=0 --fetch-timeout=15000` installed 433 packages in 50 seconds.
  Initial logs showed registry `ENOTFOUND` before npm's misleading
  `Exit handler never called!`. Node 22.23.2 / npm 10.9.8 were retained; reviewed
  locked engines support this Node version. Dependency versions and lockfile
  integrity entries were unchanged. Installed Prisma is 6.19.3; Next is 16.1.6.
- `npm run db:schema:validate` passed with an explicit disposable SQLite URL.
  Prisma `migrate deploy` applied the one initial migration to a fresh isolated
  SQLite file. `migrate diff --from-url <isolated-file-url>
  --to-schema-datamodel prisma/schema.prisma --exit-code` returned the expected
  code 2: four missing tables plus `Client` and `User` table redefinitions. No
  generated diff SQL was executed and no production connection was used.
- Build used a separate disposable SQLite file explicitly provisioned from the
  current schema with `prisma db push --skip-generate` (no data-loss flag).
  `npm run build` generated Prisma Client, then failed on a Windows Turbopack
  junction error (OS error 80). The supported alternative
  `npm run build -- --webpack`, with approved access to Google Fonts, compiled
  successfully but failed Next's TypeScript route checks: exported `authOptions`
  in `app/api/auth/[...nextauth]/route.ts` is incompatible with allowed route
  exports. That source is identical to base `814021c`; auth code was not changed
  by this startup-safety PR. A complete production build has NOT passed.
  Next also inferred a parent workspace root because of an external lockfile.
- Container execution remains unverified: Docker and Podman CLIs are unavailable;
  WSL inventory returns `Wsl/E_ACCESSDENIED`. No container engine was installed
  and no controls were disabled. Minimum next steps are to fix/review the existing
  auth configuration export (move shared options to an ordinary module and update
  consumers), rerun the default build in an isolated supported environment, then
  build/run the Dockerfile against a disposable database with an available engine.
  Application smoke tests and a production restore rehearsal remain pending.
- Read-only Railway `describe_service` reported production tracking `main`, no
  staged changes, a `/data` volume, no explicit start/pre-deploy command in the
  returned config, and latest deployment `89643ea4-b4bd-46ea-a557-0e63d6d34762`
  in `SLEEPING` state. Service config reported `RAILPACK`, while repository
  `railway.json` selects `DOCKERFILE`; confirm the effective deployment snapshot
  and any overrides during release review. No request was sent to wake the app.
- The source checkout was left untouched. Tracked-file SHA-256 comparison with
  the base archive found no differences before edits in the isolated checkout.

## Repository evidence

At base commit `814021c20aa251167dbd3f0639ab841a6a754989`, Prisma uses SQLite;
the container default is `file:/data/dev.db`. Verify the effective Railway URL and
volume mount privately before operations; do not assume the default is active.

Only `prisma/migrations/20260314154238_init/migration.sql` is versioned, introduced
by `ea45247`. Later schema changes (`d1b3184`, `b5339ef`) have no corresponding
migrations. Compared with the current schema, the initial SQL lacks `User.role`,
`AuditLog`, `FeatureFlag`, `SystemSetting`, and `ClientCategory`. It still has
`Client.industry` and lacks `Client.url` and `Client.categoryId` and their relation.
Commit `ddaf506` replaced `migrate deploy` with `db push --accept-data-loss` after
reported production drift. This is evidence of a dangerous startup command, not
evidence that data loss occurred.

Consequently, **do not replace startup with `prisma migrate deploy`**. Applying
only the existing initial migration cannot produce the current application schema.
Production migration history, checksums, and drift remain unverified. Do not mark
the initial migration applied, generate a baseline against production, or run
`migrate reset`/`db push --accept-data-loss` to make a check pass.

## Local checks with no production connection

Use the locked dependencies (`npm ci`) and the project Prisma CLI, not an
unversioned `npx` download. With `DATABASE_URL` set to a disposable local SQLite
path, run `npm run db:schema:validate` and `npm run test:startup`. Validation checks
the Prisma schema/configuration, not the live database's compatibility.

For an isolated review of the migration gap, set `DATABASE_URL` to a fresh local
SQLite file, run `./node_modules/.bin/prisma migrate deploy`, then compare that
file with `prisma/schema.prisma` using the installed Prisma 6 CLI's `migrate diff`
and `--exit-code`. A difference is expected. Keep its generated SQL as review
evidence; never pipe it into a database. This test of an empty database is not a
production baseline or proof that existing data survives a reconciliation.

## Required production review before any rollout

1. Confirm Railway project `e4ad0d7e-7624-49c7-9bde-abdfe55f0901`, service
   `appealing-reflection`, effective start/pre-deploy overrides, deployed SHA,
   SQLite path, persistent volume, and restart policy. Inspect dashboard overrides
   as well as repository configuration: they can supersede the Docker command.
   Confirm only the intended branch deploys automatically before publishing or
   merging changes. No restart, merge, or deployment is authorized by this PR.
2. Agree on a maintenance window and stop all writers (web replicas, workers,
   scheduled article generation, admin tasks). Record an owner, rollback trigger,
   recovery time objective, and recovery point objective.
3. Verify a consistent backup through SQLite's backup facility or a proven
   platform snapshot procedure. Do not copy only `dev.db` while writers run:
   WAL/journal state may be required. Retain an immutable, access-controlled copy,
   checksum, timestamp, deployed application SHA, schema, and migration metadata.
   Check storage capacity and retention. Never commit a database or secrets.
4. Restore the backup into an isolated environment with external integrations
   disabled. Run SQLite `PRAGMA integrity_check` and `PRAGMA foreign_key_check`;
   verify expected row counts and representative records for articles, clients,
   CRM, users and auth, settings, and audit data. Record results privately.
5. On that restored copy only, inspect `_prisma_migrations` (including whether it
   exists), introspected schema, and the migration-to-schema and database-to-schema
   differences. Review the entire SQL, especially removed `industry` data, relation
   constraints, defaults, unique indexes, and table rebuilds. Resolve the history
   strategy in a separate reviewed change: a verified existing lineage or a
   deliberately designed baseline plus forward migrations. Do not blindly run
   the repository's initial migration against a populated database.
6. Rehearse the chosen reconciliation on another restored copy; compare data,
   constraints, and app behavior before/after. Preserve any legacy data explicitly.
   A zero-drift result and valid migration history are prerequisites to adopting
   future explicit `migrate deploy` operations. This PR supplies no reconciliation
   SQL and authorizes none against production.
7. Test this exact application image against the compatible restored copy. Verify
   startup/restart leaves schema and migration metadata unchanged, and exercise
   public locale pages, insights/articles, clients, Google login, admin roles,
   settings/flags, audit logs, and CRM submission. Prevent real emails, AI jobs, or
   other external side effects in the isolated environment.
8. After explicit rollout approval, take/verify a fresh consistent backup, use
   the separately approved schema procedure if required, deploy the reviewed
   image, and monitor errors and those application paths. Fresh database
   provisioning must use its own reviewed schema procedure before traffic.

## Recovery procedure to rehearse and approve

Keep traffic and all writers stopped. Preserve the failed database/volume and
logs for investigation. Restore the verified consistent backup into a clean
volume/path with correct ownership and permissions; handle WAL/journal files as
part of the verified restore procedure, never mix files from different snapshots.
Repeat integrity, foreign-key, counts, and representative-record checks. Start
the previously verified compatible application artifact with a schema-free
startup override and validate behavior before reopening traffic. The old image's
default startup includes `--accept-data-loss`: blindly reverting to that command
would reintroduce this risk. Any writes after the backup need an explicit recovery
decision; a restore can lose those writes. Do not automatically rerun migrations.

Record the actual backup identifier, successful restore evidence, migration
strategy, compatible artifact, start override, and named approvals in the release
record. None of those production checks is considered complete by this PR.
