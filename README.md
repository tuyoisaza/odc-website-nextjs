This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Production startup does not modify the database schema. Read the [database operations runbook](docs/database-operations.md) before a rollout or any schema operation. Run `npm run test:startup` to check this safety contract; `npm run db:schema:validate` validates the schema configuration only.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Client logos

The public clients page and admin preview share the [local logo resolver](lib/client-branding.ts), [brand mapping](lib/client-brands.json), and [ClientLogo component](components/ClientLogo.tsx). The [asset inventory and sources](docs/client-logos.md) links every file in `public/clients/`. Known placeholder records display local logos without reseeding the database. The public [clients page](app/[locale]/clients/page.tsx) hides empty categories and uses the verified WOPP / La Integridad links when no link is configured.

Run `npm run test:client-logos` for the [client logo regression checks](tests/client-branding.test.cjs). The admin image field label is translated in [Spanish](messages/es.json), [English](messages/en.json) and [Portuguese](messages/pt.json).
