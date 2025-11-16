# TSA-Webmaster — Frontend

## Overview

This repository contains the frontend code for the TSA-Webmaster website, built with Vite and Web Components
and intended to be served as a static SPA (Single Page / multi-template setup) with an Express.js backend
handling API requests (search, submissions, resources, events, etc.). The project separates private templating
sources from public components to keep source templates and production components clearly distinct.

Key folders (in this `Frontend/` directory):

- `Private/Templates/` — authoring templates and server-side templates used during generation.
- `Public/Components/` — site-ready web component implementations organized by area (Global, Home, Highlights, Resource, Submission).
- `Public/Site/` — generated static pages (index.html, resources.html, highlights.html, submission.html) and client script.

The app uses Web Components (vanilla custom elements) to build modular, reusable UI pieces (navbar, head, body, footer, resource map, cards, submission forms). This makes components independent, testable, and easy to reuse between templates and generated pages.

## Contract (inputs / outputs / success criteria)

- Inputs: static assets (HTML templates, JS web components), user search input, submission form data.
- Outputs: rendered pages, API calls to backend for search and data persistence, user confirmation on successful submissions.
- Success criteria: pages render with reusable components; search returns relevant resources/events; submission data is accepted and stored; About and Contact pages available.

## Features (current)

- Componentized UI using Web Components.
- Static site pages in `Public/Site/` (index.html, resources.html, highlights.html, submission.html).
- Modular components in `Public/Components/` (Global/ for shared elements; Home/, Highlights/, Resource/, Submission/ for specific areas).

## Planned / Future Functions (high-level)

This section outlines planned features that extend the current project.

- About page
  - Static or server-rendered page describing the project and organization.
  - Contains team bios, mission statement, and contact links.

- Contact page
  - Contact form that submits to the backend (email relay or database record).
  - Rate-limiting and spam protection (CAPTCHA or honeypot field).
  - Admin notifications on new contact requests.

- Resource page (expanded)
  - The existing Resource Map will be expanded into a full Resource page.
  - Features:
    - Interactive map view (if desired) as one view option.
    - List view with pagination and filters (category, tags, region, online/in-person).
    - Search bar (see next section) for finding resources and events across the community.
    - Resource detail view with full metadata and contact info.

- Search function (resource & event search)
  - Full-text search endpoint on the backend: search across events and resources.
  - Client-side search UI with suggestions/typeahead and debounced queries.
  - Filters and facets (date ranges for events, categories for resources).
  - Support for fuzzy matching and simple ranking (title match > tag match > description match).

## How we use Web Components

Why Web Components?
- Encapsulation: components keep markup, style, and behavior bundled.
- Reusability: components can be reused across templates and pages without duplication.
- Progressive enhancement: components work as standard HTML custom elements and degrade gracefully.

Examples of component patterns used:
- Global components: `head.js`, `navbar.js`, `body.js`, `footer.js` live under `Public/Components/Global/`.
- Page-specific components: `cards.js` and `resources.js` implement the UI for the home page lists and resource views.
- Submission components: `Public/Components/Submission/form.js` handles user submission UI and validation.

Best practices followed:
- Use shadow DOM where style encapsulation is required.
- Keep components small and focused (single responsibility).
- Expose configuration via attributes and events for inter-component communication (e.g., `search-updated` events).
- Provide clear lifecycle handling (connectedCallback, disconnectedCallback) to avoid leaks.

## Backend (Express.js) — architecture & planned APIs

We plan to use Express.js for the backend API. It will:
- Serve dynamic API endpoints consumed by the frontend.
- Provide search functionality for resources and events.
- Accept and validate submission and contact form POSTs.
- Serve static assets if desired in production, or be used solely as an API when static site is served separately.

Planned endpoints (examples):

- GET /api/resources?search=...&category=...&page=...&limit=...
  - Query resources with filters and search.
  - Returns paginated list: { items: [], total, page, limit }

- GET /api/resources/:id
  - Fetch full resource by id.

- GET /api/events?search=...&start=...&end=...&page=...&limit=...
  - Search events by date and text.

- POST /api/submissions
  - Accept submissions (e.g., for contest/projects). Validate and store.
  - Body: { name, email, title, description, files? }
  - Response: { success: true, id }

- POST /api/contact
  - Accept contact messages. Validate (email, message) and deliver (email, DB, or notification).

- Health and admin endpoints (protected):
  - GET /api/admin/stats

Authentication & security notes:
- Admin endpoints protected by token-based auth (JWT or session + cookie).
- Rate-limiting and input validation on any form or public endpoint.
- Escape and sanitize any data used in templates or returned to clients.

Search implementation options:
- Small scale: implement a simple database-backed text search (Postgres full-text search, MongoDB text index).
- Mid scale: add fuzzy search with trigram or use Ascii folding for internationalized input.
- Larger scale: integrate an external search engine (Elasticsearch, Meilisearch, or Typesense) for better relevance ranking and facets.

## Data models (example)

Resource (example):
- id: string
- title: string
- description: string
- categories: [string]
- tags: [string]
- contact: { name, email, url }
- address: { city, state, country }
- geolocation: { lat, lng } (optional)
- createdAt, updatedAt

Event (example):
- id: string
- title: string
- startDate, endDate
- location: { online: bool, address? }
- description
- resources: [resourceId]

Submission (example):
- id
- authorName
- authorEmail
- title
- description
- files (if supported)
- status (pending, accepted, rejected)

Contact message:
- id
- name
- email
- subject
- message
- createdAt

## Client-server interaction patterns

- Search: client calls GET `/api/resources` or `/api/events` with query params; server returns JSON; client renders components.
- Details: client navigates to resource page and fetches `/api/resources/:id`.
- Submission: client POSTs to `/api/submissions` and shows success or errors returned from server.
- Contact: client POSTs to `/api/contact` and shows confirmation.

## Frontend development & run instructions

Assuming you are working in `Frontend/` and have Node.js installed:

1. Install dependencies

```bash
cd Frontend
npm install
```

2. Development server (Vite)

```bash
npm run dev
```

This runs the Vite dev server which loads the web components and serves `Public/Site/` (depending on the current project config). For production build:

```bash
npm run build
npm run preview
```

3. Backend

The Express backend is planned but not included in this repository. When implemented, typical steps are:

```bash
cd backend
npm install
npm run dev   # express server
```

4. Environment

- Keep API base URL configurable (e.g., via `process.env.API_BASE` or a small runtime config file) so the frontend can target staging/production backends.

## Tests

Suggested tests to add:
- Unit tests for each web component (rendering output given attributes, events emitted).
- Integration tests for client-side search flow (mock API responses).
- API contract tests once Express backend exists (end-to-end for search/submission/contact).

Testing tools:
- Jest + jsdom for component tests.
- Playwright or Cypress for end-to-end browser tests.

Example test cases to include initially:
- Component renders with required attributes.
- Search returns expected items for a mock query (happy path).
- Submission returns validation errors for missing required fields (edge cases).

## Edge cases & error handling

- Empty search results: show a friendly message and suggested next steps.
- Network failures: show retry affordances and offline-friendly behavior where possible.
- Invalid form input: client-side validation plus server-side enforcement and clear error messages.
- Large result sets: implement pagination or infinite scroll to avoid DOM bloat.
- Concurrency: ensure submissions are idempotent or guarded against duplicate submissions (client-side disable submit button after click, server-side duplicate detection).

## Accessibility & Internationalization

- Use semantic HTML in components and ensure components expose ARIA attributes where necessary (roles, labels).
- Provide keyboard navigation for interactive components (maps, lists, search suggestions).
- Plan i18n for text content (resource titles, dates). Keep copy in a single place / translation files.

## Deployment & hosting

Options:
- Host static assets (Public/Site) on a CDN or static host (Netlify, Vercel, GitHub Pages).
- Host Express API on a Node host (Heroku, Render, Azure App Service, DigitalOcean App Platform) or containerize and deploy to Kubernetes.
- Consider separating static frontend CDN from API host for scaling.

CI/CD:
- Run tests + linters on PRs.
- On main branch, build static frontend and deploy to CDN; deploy backend with migration and blue/green strategy if needed.

## Security notes

- Rate-limit public endpoints (search, contact, submissions).
- Validate and sanitize user-provided HTML or markdown.
- Keep secrets out of repository (use environment variables for API keys and DB credentials).

## Contribution guidelines

- Use feature branches and open PRs targeting `main`.
- Add tests for new components and API endpoints.
- Keep components small and document any new public attributes/events.

## Next steps (implementation roadmap)

1. Implement Express backend scaffold (routes for search, resources, events, submissions, contact).
2. Implement search endpoint (start with DB text search or in-memory index for prototype).
3. Expand Resource page with list & detail views; wire up client search UI and filters.
4. Create About and Contact pages and wire contact submissions to backend.
5. Add tests for search and submission flows.

## Who to contact

- Project owner / maintainer: (add contact email here)
- Repo: TSA-Webmaster (owner: Vittalbigamudra)

---

This README is a starting point. If you'd like, I can:
- Add an Express backend scaffold (routes, example controllers, minimal in-memory search) and sample API tests.
- Add a small search component with debounced queries and typeahead suggestions wired to a mock API.

If you want any of the next-step items implemented now, tell me which one and I'll scaffold it next.
