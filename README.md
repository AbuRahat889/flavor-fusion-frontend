# Flavor Fusion — Frontend

A beautiful Next.js + TypeScript storefront built with Tailwind CSS and shadcn/ui. This repository contains the frontend for the Flavor Fusion project (landing pages, menu, cart, checkout, and an admin area).

## Live demo

- **Live URL**: https://flavor-fusion-ashen-five.vercel.app

> Replace the `REPLACE_WITH_YOUR_LIVE_URL` value above with your deployed site URL.

## Screenshots

Landing page preview:

![Landing preview](/images/landing.svg)

Admin dashboard preview:

![Dashboard preview](/images/dashboard.svg)

## Features

- Fast, SEO-friendly Next.js App Router pages
- Responsive landing, menu and product listing
- Cart and checkout flow (UI only — connect to API)
- Admin area for products, categories, and orders
- Tailwind CSS + shadcn/ui components

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui component primitives
- React Context + Redux Toolkit for state

## Getting started (local)

Prerequisites:

- Node.js 18+ (recommend using nvm)
- npm or yarn

Install and run:

```bash
git clone <YOUR_GIT_URL>
cd flavor-fusion-frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables

Create a `.env.local` file at the project root with your values. Example:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxx
```

Note: The frontend expects an API for products, orders, and auth. If you don't have one yet, point `NEXT_PUBLIC_API_URL` to your backend or a mock server.

## Build & deploy

Build for production:

```bash
npm run build
npm run start
```

Deploy recommendations:

- Vercel: automatic for Next.js projects (recommended)
- Netlify: supports Next.js builds
- Docker: build the production image and run behind a reverse proxy

If you deploy on Vercel, set the environment variables in the Vercel project settings and update the Live URL above.

## Admin demo credentials (replace or remove in public repos)

- Email: admin@example.com
- Password: changeme

## Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch
3. Add tests/verify locally
4. Open a Pull Request

## Folder structure (key parts)

- `src/app/` — Next.js app routes and layouts
- `src/components/` — UI components and shadcn primitives
- `src/redux/` — Redux toolkit slice and API definitions
- `public/images/` — Project images and static assets

## Updating screenshots

The placeholder SVGs are at `public/images/landing.svg` and `public/images/dashboard.svg`. Replace them with high-fidelity PNG/SVG exports from your design tool to show real screenshots.

## License & contact

This project is licensed under MIT. For questions, open an issue or contact the maintainer.

---

If you'd like, I can:

- Deploy a demo to Vercel using these sources
- Replace the SVG placeholders with exported PNG screenshots (if you provide them)

Replace the live URL placeholder and admin credentials before sharing or deploying publicly.
