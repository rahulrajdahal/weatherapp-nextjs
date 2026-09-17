# API & Data Fetching

## External Provider: WeatherAPI
- Base Endpoint: `https://api.weatherapi.com/v1`
- Endpoints utilized:
  - `/forecast.json`: Queries 7-day forecast, hourly projections, air quality indicators (`aqi=yes`), and meteorological alerts (`alerts=yes`).
  - `/search.json`: Autocomplete location queries for instant city lookup.

## Internal Route Handlers
Client components query our secure Next.js internal routes:
- `GET /api/weather/forecast?q={city}`
- `GET /api/weather/search?q={query}`

## Error Normalization
Upstream errors are mapped to normalized, predictable error codes:
- `LOCATION_NOT_FOUND`: Target location query matched zero coordinates.
- `RATE_LIMITED`: Upstream provider quota reached (HTTP 429).
- `UPSTREAM_UNAVAILABLE`: Upstream service timeout or HTTP 500.
- `NETWORK_ERROR`: Node fetch timeout or connectivity disruption.
- `INVALID_RESPONSE`: Upstream response schema mismatch.

## Retry Policy
- Transient network and 5xx errors retry up to 3 times using exponential backoff (e.g. 500ms, 1500ms, 4500ms).
- Client 4xx errors (e.g. invalid query) are rejected immediately without retries.
