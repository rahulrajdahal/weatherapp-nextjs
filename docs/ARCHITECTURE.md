# Architecture

## Architectural Principles
HawaPani implements clean, pragmatic architecture adhering to SOLID and DRY principles without unwarranted enterprise ceremony.

The core separation of concerns:
```
Presentation (UI Components)
          ↓
Application Layer (Hooks & State)
          ↓
Boundary / Route Handlers (`app/api/weather/*`)
          ↓
Weather Service Adapter (`lib/services/weatherService.ts`)
          ↓
External WeatherAPI
```

## Next.js App Router Structure
- **Server Components by Default**: Server Components are the standard. They render on the server, avoiding unnecessary client JavaScript overhead.
- **Client Boundaries**: The `"use client"` directive is reserved for components requiring browser APIs (`localStorage`, `navigator.geolocation`), event listeners, or interactive React state (`useState`, `useEffect`).
- **Server Boundary for External APIs**: Direct calls to WeatherAPI with credentials occur strictly on the server inside Next.js Route Handlers (`app/api/weather/forecast` and `app/api/weather/search`).
- **Data Transformation**: Upstream API schemas are converted into clean domain types (`lib/types/weather.ts`) inside the service layer before reaching UI components.

## Caching & Rendering Strategies
- **Current Conditions**: Cached for ~10 minutes.
- **Extended Forecast**: Cached for ~30 minutes.
- **Search Autocomplete**: Cached for ~1 hour.
- Transient upstream network errors are retried up to 3 times using exponential backoff, while client-side 4xx errors fail fast.
