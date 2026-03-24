---
name: ia-development-standards
description: Use when developing any software project from scratch, implementing features, or making architectural decisions - ensures real data only (no mocks/demos), established tech stack (Next.js + ORM + Auth.js), SQLite to Postgres via config, multilingual (EN/ES/PT), admin with Google OAuth and RBAC, debug mode with DB flag and verbose logging, proper routing with real URLs, file/function limits, versioned commits, auto-deploy from hosting platform (not GitHub Actions or CLI), and full observability.
---

# Reglas Maestras de Desarrollo con IA

Esta skill debe aplicarse a TODO desarrollo de software, sin excepción.

1.  **VERDAD OPERATIVA** - No mostrar datos falsos, métricas simuladas, dashboards decorativos, placeholders o números aleatorios. Todo debe ser real y funcional desde el día 1.
2.  **TECH STACK ESTABLECIDO ANTES** - Definir antes de programar: Next.js App Router, TypeScript, Tailwind, shadcn/ui, ORM (prisma), Auth (Auth.js/NextAuth), hosting (Railway/Render/Vercel con auto-deploy desde repo).
3.  **ORM OBLIGATORIO** - Usar Prisma u ORM similar para poder cambiar de SQLite (local) a Postgres (producción) solo con cambio de configuración de conexión a base de datos, NO reescribiendo código.
4.  **I18N DESDE EL INICIO** - Soporte mínimo ES/EN/PT, textos en diccionarios por locale, no usar OpenAI para traducir UI, detección de locale + override manual, fallback chain: usuario → defecto → inglés.
5.  **MULTILINGÜE SIEMPRE** - La app debe soportar cambio de idioma sin recargar página, usando variables configurables. Debe permitir agregar idiomas futuros sin reescribir componentes.
6.  **ADMIN SIEMPRE** - Sección admin con: user management, role management (super_admin, admin, team_leader, member), system status, debug controls, audit trail, feature flags visibility. Google OAuth integrado.
7.  **GOOGLE LOGIN** - Auth.js/NextAuth con Google como provider por defecto, roles persistidos en DB.
8.  **RBAC SERVER-SIDE** - Validación de permisos en backend, NO solo en UI. Toda mutación administrativa debe verificar rol.
9.  **DEBUG MODE** - Cuando super_user activa debug, guardar flag en DB. Todas las funciones deben verificar ese flag y volverse verbose. Logs enrichecidos con correlation IDs. Debug mode debe autoexpirar y auditarse su activación.
10. **OBSERVABILIDAD** - Structured logging, error capture (Sentry o equivalente), request IDs, módulo de logging por feature.
11. **COPY DEBUG REPORT** - Un clic para copiar reporte técnico: project name, version, git SHA, build timestamp, user info, locale, route, errores recientes, logs sanitizados. Formato: texto plano + JSON.
12. **VERSIONADO** - Semver (vMAJOR.MINOR.PATCH) + git SHA corto + build timestamp UTC inyectado en build time. Visible en login, app principal y admin.
13. **ROUTING REAL** - Cada feature principal con su propia ruta (/admin/users, /admin/roles, /settings/profile, etc.). NO usar hash fragments ni esconder features en modales sin URL.
14. **LÍMITES** - Archivos max 600 líneas (target 300). Funciones con responsabilidad única, nombres claros, comentarios de intención y versión.
15. **ESTRUCTURA ORDENADA** - Cada feature en su propio módulo con: rutas, UI, servicio, acceso a datos, schemas, permisos, tests, logs.
16. **IA COMO SUBSISTEMA** - Si se usa IA: prompts versionados en repo, evaluación, output validation, AI observability (modelo, latencia, costo, errores), safety rules (no decisiones irreversibles sin confirmación).
17. **GIT FLOW** - feature/<nombre> para desarrollo, testing local, luego merge a main. NO hacer deploy desde CLI ni GitHub Actions. El server (Railway/Render/Vercel) debe detectar push y auto-deploy.
18. **COMMITS CON VERSIÓN** - Cada commit debe iniciar con el número de versión incrementado (ej: v0.1.0, v0.1.1, v0.2.0).
19. **FEATURE FLAGS** - Visibles en admin, asociables a global/tenant/user, fecha de retiro.
20. **DECISION LAYER** - Registrar: qué decisión, quién, contexto, hipótesis, señales usadas, resultado. Para sistemas de soporte a decisiones.
21. **SEGURIDAD** - No exponer secretos en logs, PII minimizada, stacks sanitizados en reportes.
22. **NO MOCKUPS NI DEMOS** - Todo código debe ser real, funcional, conectado a datos reales o estados vacíos honestos.
23. **CHECKLIST PRE-PROJECT** - Antes de empezar: project name, logo, objetivo, default/supported locales, ORM, auth providers, role matrix, hosting, versioning scheme, debug policy, audit rules, AI scope, rutas iniciales, decisiones críticas que soportará.
