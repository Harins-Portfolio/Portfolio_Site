# React + Vite
 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
 
Currently, two official plugins are available:
 
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
 
## React Compiler
 
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
 
## Expanding the ESLint configuration
 
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Nikhil Harins — Portfolio/Offer landing page
 
A modern, dark-mode, single-page portfolio built to generate leads for freelance
data & business analytics consulting. Targets recruiters, startup
founders, and small businesses.
 
Built with **Vite + React + Tailwind CSS**.
 
## Sections
 
- **Hero** — strong headline with dual CTAs (Book a call / View case studies) and key stats
- **About** — positioning and working principles
- **Services** — 6 consulting tracks as reusable cards (3 marked "Coming soon")
- **Case studies** — real projects with expandable SPEAR breakdowns and GitHub links
- **Tech stack** — tools across modeling, statistics and reporting
- **Testimonials** — placeholder quotes (swap with real feedback)
- **Contact** — accessible form (mailto), Calendly link and social links
 
## Getting started
 
```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```
 
## Editing content
 
All content lives in `src/data/`:
 
- `site.js` — name, role, contact details, socials, nav links, hero stats
- `services.js` — service tracks (set `available: false` for "Coming soon")
- `caseStudies.js` — case studies in SPEAR format with GitHub links
- `techStack.js` — tech stack groups
- `testimonials.js` — testimonials (currently placeholders)
 
## Accessibility
 
- Semantic landmarks (`header`, `main`, `nav`, `footer`), skip-to-content link
- Labelled form controls and `aria-*` on interactive elements
- Visible focus rings, AA-contrast palette, `prefers-reduced-motion` support
