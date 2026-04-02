# Teamflow Frontend

## Abstract
Teamflow Frontend is a React + TypeScript single-page application scaffolded with Vite. The codebase implements authentication flows and organization management views, and provides a protected dashboard area that depends on a backend API. This README documents the project scope, architecture, and reproducible setup steps in an academic, implementation-focused format.

## Key Features
- Authentication flow: register, sign-in, password reset, avatar upload.
- Protected dashboard shell with a sidebar, search, and organization list.
- Organization creation view (file upload planned).
- API integration with token refresh and centralized error handling.

## Technology Stack
- UI: React 19, React Router 7, Tailwind CSS 4, shadcn/ui components.
- State: Zustand (auth state persistence).
- Data and HTTP: Axios, TanStack Query (dependency available).
- Tooling: Vite, TypeScript, ESLint.

## Architecture Overview
- Routing is defined in [src/app/routes.tsx](src/app/routes.tsx#L1-L35) using `createBrowserRouter`.
- Auth state is stored in a persistent Zustand store in [src/app/providers/user.ts](src/app/providers/user.ts#L1-L33).
- Protected routes are enforced by a route guard that validates `/auth/me` and refreshes tokens on 401 in [src/app/providers/ProtectedRoute.tsx](src/app/providers/ProtectedRoute.tsx#L1-L51).
- API utilities wrap Axios with unified error handling in [src/shared/utils/api.ts](src/shared/utils/api.ts#L1-L92).

## Project Structure
- [src/app](src/app): routing, providers, and shared types.
- [src/features](src/features): feature modules (auth, organizations).
- [src/shared](src/shared): reusable UI components, layout, hooks, and API utilities.
- [src/index.css](src/index.css): global styles and Tailwind entry.

## Getting Started
1) Install dependencies:
```bash
npm install
```

2) Configure environment variables (see next section).

3) Start the dev server:
```bash
npm run dev
```

## Environment Variables
Create a `.env` file at the project root with:
```
VITE_SERVER_URL=http://localhost:3000
```
This value is consumed by the Axios client in [src/shared/utils/api.ts](src/shared/utils/api.ts#L38-L92) to construct API URLs.

## Available Scripts
- `npm run dev`: start Vite in development mode.
- `npm run build`: type-check and build for production.
- `npm run lint`: run ESLint.
- `npm run preview`: preview the production build.

## Current Routes (Selected)
- `/account/register`, `/account/login`, `/account/forgot-password`.
- `/dashboard`, `/orgs/add`, `/project`, `/task` (protected via auth guard).
- `/privacy-policy`, `/term-and-conditions`, `/contact-us` (placeholders).

## API Integration Notes
- Auth endpoints are defined in [src/features/auth/utils/apis.ts](src/features/auth/utils/apis.ts#L1-L116).
- Organization endpoints are defined in [src/features/orgs/apis.ts](src/features/orgs/apis.ts#L1-L35).
- The refresh flow uses `/auth/refresh` and retries failed requests on 401.

## Status and Limitations
- Several routes render placeholders and require UI/feature completion.
- Organization logo upload is planned but not yet implemented.
- No automated tests are included at this time.

## License
License information has not been specified. Add a license file if this repository is intended for distribution.
