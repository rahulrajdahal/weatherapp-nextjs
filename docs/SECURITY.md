# Security & Privacy Architecture

## Secrets Protection

- **Zero API Key Leakage**: WeatherAPI credentials (`WEATHER_API_KEY`) reside exclusively in server-side environment configurations.
- Client bundles never reference `WEATHER_API_KEY` or expose it via `NEXT_PUBLIC_` prefixes.
- Route Handlers (`app/api/weather/forecast` and `app/api/weather/search`) act as the secure gateway, proxying queries and stripping upstream authentication headers.

## Input Sanitization & Validation

- Search queries (`?q=`) are sanitized:
  - Whitespace trimmed.
  - Length capped to reasonable limits (100 characters max) to protect against buffer or memory abuse.
  - URL encoding applied to protect against parameter pollution.
- Upstream responses are validated before returning to clients; raw untrusted HTML is never passed to `dangerouslySetInnerHTML`.

## HTTP Security Headers

Configured in Next.js response pipeline:

- `Content-Security-Policy`: Disallows untrusted scripts and restricts media to self and `cdn.weatherapi.com`.
- `X-Frame-Options: DENY`: Prevents clickjacking attacks.
- `X-Content-Type-Options: nosniff`: Mitigates MIME-type sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy`: Restricts camera, microphone, and payment; allows geolocation explicitly when requested.
