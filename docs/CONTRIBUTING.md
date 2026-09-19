# Contributing Guidelines

## Development Workflow

1. Create a dedicated branch off `main`:
   - `feature/<short-description>`
   - `fix/<short-description>`
   - `test/<short-description>`
   - `refactor/<short-description>`
   - `docs/<short-description>`
2. Implement targeted, cohesive changes.
3. Validate locally:
   - `npm run lint`
   - `npm run test:coverage`
   - `npm run build`
4. Use Conventional Commits format:
   ```
   type(scope): concise imperative description
   ```
   Examples:
   - `feat(weather): add 7-day daily forecast distribution`
   - `fix(search): handle zero-result location gracefully`
   - `test(chart): add screen-reader table summary specs`
5. Open a Pull Request targeting `main`. Ensure all CI checks pass.
