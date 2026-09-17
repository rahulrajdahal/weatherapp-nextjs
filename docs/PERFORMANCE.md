# Performance & Core Web Vitals

## Engineering Principles
1. **Server-Side Rendering & Server Components**:
   - Heavy rendering logic remains on the server, ensuring light client JavaScript bundles.
2. **Deterministic Dimensions & Zero-CLS**:
   - Cumulative Layout Shift (CLS) target: **0**.
   - Shimmer skeleton loaders (`WeatherDashboardSkeleton`) precisely match the dimensions of rendered hero cards, metric grids, and hourly forecast items.
3. **Request Deduplication & Caching**:
   - Route Handlers incorporate `Cache-Control` response headers.
   - Client searches use a 300ms debounce (`useDebounce`) to avoid excessive request bursts.
4. **Image Optimization**:
   - External WeatherAPI condition icons route through Next.js `<Image />` optimization with remote pattern rules defined in `next.config.ts`.
5. **Zero Heavy Date Dependencies**:
   - Zero-dependency native `Intl.DateTimeFormat` implementation (`lib/utils/dateTime.ts`), avoiding legacy packages like `moment.js` (~70KB savings).
