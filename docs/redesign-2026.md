# ODC Website Redesign — Implementation Brief

Status: Design direction approved
Branch: `redesign/perceptual-scale`
Market: Mexico base, Latin America target
Languages: English, Spanish, Portuguese

## Strategic premise
**Growth is a system, not a tactic.**

ODC should communicate the sophistication and intellectual depth of a large consulting firm while remaining truthful about its operating model: a two-principal, senior-led boutique consultancy.

Perceptual scale comes from depth of thinking, breadth of capabilities, editorial rigor, experience, and consistency — not invented headcount.

## Positioning
- Senior-led boutique consultancy
- 40+ years combined experience
- Mexico base / Latin America focus
- Direct principal involvement from discovery through execution
- Speed, expertise and proximity
- AI accelerates research, analysis and execution; AI is not the core product
- Engagements are tailored rather than methodology-led

Working idea: **Senior expertise. In your corner.**

## Visual direction
Approved from concept explorations:
- Editorial consulting-firm aesthetic
- Generous whitespace
- Cream / warm-white surfaces
- ODC dark green as primary brand color
- Charcoal typography
- Restrained line diagrams and information graphics
- Atmospheric landscape / mountain / cloud imagery expressing perspective, horizon, movement and systems
- Avoid architecture imagery
- Avoid generic corporate stock photography
- Homepage may be visually rich
- Internal pages must be materially quieter and simpler than homepage
- Article pages should feel editorial, readable and authoritative
- Footer must be compact, not another large content section
- Existing principal portraits remain visible
- Existing organization logos remain, but framing changes

## Information architecture

### Primary navigation
- What We Do
- How We Work
- Experience
- Insights
- About
- Contact
- Language selector
- Talk to us

### What We Do
1. Growth Strategy & Performance
2. Transformation, Digital & AI
3. Brand & Marketing Strategy
4. Innovation & Growth Ecosystems
5. Strategic Storytelling & Communication
6. Boards & Leadership

Each capability receives a dedicated internal page.

### How We Work
On-Demand Consulting:
1. Discover
2. Define
3. Work
4. Activate

Every engagement starts with discovery, followed by a tailored proposal and work plan.

### Experience
Use existing organization logos under:
**Experience that shaped our perspective.**

Required disclaimer:
Organizations shown represent professional experience accumulated by ODC's principals throughout their careers and do not necessarily represent current ODC client engagements.

Do not map logos to engagements, industries, executives or outcomes.

### Insights
Editorial categories:
- Growth
- Transformation
- AI
- Brand & Marketing
- Leadership & Boards
- Innovation

Content demonstrates ODC's point of view rather than disclosing confidential client work.

### About
Core idea:
**Two principals. Directly involved.**

Individual principal profiles should carry education, memberships and certifications discretely. Do not overstate in-progress education.

## Homepage structure
1. Hero — Growth is a system, not a tactic.
2. Senior expertise / In your corner
3. Capabilities
4. How We Work
5. Experience that shaped our perspective + logos
6. Growth is a system perspective
7. Insights
8. Two principals. Directly involved.
9. Compact conversion band
10. Compact footer

## Internal capability page template
Internal pages should be simpler than home:
1. Breadcrumb
2. Editorial hero + restrained landscape image
3. How we help
4. Related insights
5. Short ODC perspective block
6. Compact How We Work
7. Compact conversion band
8. Compact footer

Do not repeat homepage-scale visual modules.

## Insight article template
1. Breadcrumb
2. Category / date
3. Large editorial headline
4. Dek
5. Author + share controls
6. Hero image
7. Narrow readable article column
8. Structured headings / numbered arguments / diagrams as appropriate
9. Related insights sidebar on desktop
10. Tags + previous/next
11. Compact footer

## Content principles
- Speak primarily about the leader/client and the decision at hand.
- Avoid generic claims: leader, innovative, passionate, world-class.
- Prefer: we help, we work, we build, we challenge, we translate, we activate.
- Do not fabricate scale, client outcomes, titles, engagements or network capacity.
- Client confidentiality is a feature of the operating model.
- Avoid traditional case studies when they could reveal clients indirectly.
- Thought leadership is the primary proof of expertise.

## Responsive requirements
- Mobile-first behavior for all new components.
- Navigation collapses cleanly.
- Capability cards become stacked.
- Article sidebar moves below article.
- Logo wall remains legible and restrained.
- CTAs remain visible without dominating the page.

## Existing product constraints
Preserve:
- Next.js App Router
- next-intl ES/EN/PT architecture
- Prisma-backed insights
- Existing CRM/contact endpoint
- Existing local client-logo resolver and assets
- Existing principal portrait assets

## Implementation approach
1. Establish design tokens and global editorial layout primitives.
2. Refactor Navbar and create compact Footer.
3. Build reusable section components.
4. Rebuild Home using approved content.
5. Build capability template and six capability routes/content sets.
6. Reframe Clients as Experience without breaking logo administration.
7. Redesign Insights index.
8. Redesign article template.
9. Redesign About/team.
10. Redesign Contact around WhatsApp / email / scheduling plus existing form where appropriate.
11. Localize master copy into ES/PT contextually, not literally.
12. Responsive/accessibility/SEO QA.

## Visual assets still required
Produce a small reusable image library, not one unique stock image per section:
- Hero horizon / mountain perspective
- Seated or standing figure with expansive landscape
- Cloud / atmospheric perspective
- 3–5 complementary landscape crops for capability and insight cards

Images should be 16:9 where practical and share a consistent photographic treatment.
