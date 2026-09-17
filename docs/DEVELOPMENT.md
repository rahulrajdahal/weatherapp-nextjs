# Local Development Guide

## Prerequisites
- Node.js: >= 20.x
- npm: >= 10.x

## Setup Instructions
1. Clone repository and install dependencies:
   ```bash
   npm install
   ```
2. Configure local environment:
   Create a `.env` file in the root directory:
   ```env
   WEATHER_API_KEY=your_weatherapi_key_here
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Useful Scripts
- `npm run dev`: Next.js development server.
- `npm run build`: Production build with TypeScript checking.
- `npm run test`: Vitest unit tests in fast run mode.
- `npm run test:watch`: Vitest in interactive watch mode.
- `npm run test:coverage`: Vitest test suite with v8 coverage analysis.
- `npm run lint`: Strict TypeScript noEmit typecheck.
- `npm run storybook`: Launch Storybook workbench at `http://localhost:6006`.
- `npm run build-storybook`: Static build of Storybook catalog.
- `npm run e2e`: Interactive Cypress E2E runner.
- `npm run e2e:headless`: Headless Cypress runner.
- `npm run component:headless`: Headless Cypress component runner.
