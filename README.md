# Automation Showcase

Interactive, plain-language demos that make small business automation visible. The first demo animates a pile of messy bank-statement lines sorting themselves into a clean, categorized spreadsheet with a counting total. All data is simulated and everything runs in the browser.

Live at [davin-willis.github.io/automation-showcase](https://davin-willis.github.io/automation-showcase/). Linked from the services section of [davinwillis.dev](https://davinwillis.dev).

## AI-assisted development

Built with AI-assisted development. All architecture, design, and implementation decisions are my own.

## How the demo works

Each fake transaction exists in two forms: the raw statement string and its clean parsed row. The pile and the table share Framer Motion layoutIds, so one state change flies every line from its scattered position into its table row with a staggered spring. The total counts up once the last row lands. Reduced-motion users get an instant crossfade instead.

## Stack

- Next.js (App Router, TypeScript, static export)
- Tailwind CSS v4
- Framer Motion (layout animations, respects prefers-reduced-motion)
- Fonts: Bricolage Grotesque, Public Sans, Spline Sans Mono via next/font
- Deployed to GitHub Pages via GitHub Actions

## Run locally

```bash
npm install
npm run dev
```
