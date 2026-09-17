# Component Guidelines

## Component Architecture & Location
All reusable components reside in `components/` organized by component directory:
```
components/
  └── [ComponentName]/
        ├── [ComponentName].tsx
        ├── [ComponentName].stories.tsx
        ├── [ComponentName].cy.tsx (optional component spec)
        └── index.ts
```

## Core Standards
1. **Single Responsibility**: Each component performs one clear job (e.g. `HourForecastCard` renders hourly weather, `SegmentedControl` manages accessible tab selection).
2. **Encapsulated Primitives**:
   - Never import Radix UI primitives directly into feature components.
   - Always route through established project wrappers:
     - `components/Input` (wraps text input with forwardRef and accessible defaults)
     - `components/Popover` (wraps Radix UI Popover primitives)
     - `components/SearchInput` (manages debounced search autocomplete)
     - `components/SegmentedControl` (manages accessible radio/tab switching)
3. **Strong Typing**:
   - Every component exports a typed props interface.
   - Avoid generic `any` types or passing entire unstructured API response objects.
4. **Accessible Defaults**:
   - All interactive controls feature visible focus indicators (`focus-visible:ring-2 focus-visible:ring-blue-500`).
   - All buttons have accessible labels (`aria-label` when text is visual-only).
