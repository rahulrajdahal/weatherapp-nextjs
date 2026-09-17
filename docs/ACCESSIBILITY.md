# Accessibility (a11y)

## Compliance Standard
- **Baseline**: WCAG 2.1 AA compliant across all views.
- **Target**: WCAG 2.2 AA.

## Implementation Details
1. **Landmark Architecture**:
   - `<header>`: Contains logo branding, search bar, and unit toggle.
   - `<main id="main-content">`: Main dashboard content area.
   - `<section>` & `<article>`: Semantic division of hero metrics, hourly cards, and daily forecast lists.
   - `<footer role="contentinfo">`: Attribution, copyright, and telemetry statements.
2. **Keyboard Navigation & Trapping**:
   - Skip-to-content accessible bypass link (`#main-content`) is available at top of DOM.
   - Modals (`CityComparisonModal`) trap keyboard focus, prevent background scroll, and close upon `Escape` key press.
   - Autocomplete dropdowns implement the WAI-ARIA Combobox pattern (Up/Down arrow navigation, Enter selection, Esc to dismiss).
   - Quick-access `FavoritesBar` chips and removal buttons feature visible keyboard focus rings (`focus-visible:ring-2`).
3. **Contrast & Atmospheric Gradients**:
   - Atmospheric gradients (`lib/utils/weatherTheme.ts`) maintain a minimum contrast ratio of $4.5:1$ for body text and $3:1$ for large text/icons.
   - Status badges (e.g. Good, Moderate, Unhealthy for Air Quality; Low to Extreme for UV Index) guarantee accessible text contrast ($\ge 4.5:1$) against chip backgrounds and pair color with explicit text labels.
   - `OfflineBadge` uses a self-contained high-opacity dark capsule (`bg-slate-900/90 text-amber-300 border-amber-400/40`) with an embedded signal icon to guarantee WCAG AAA contrast ($\ge 11.8:1$) and non-color-only identification against dynamic weather background gradients.
   - `AlertBanner` uses a self-contained high-opacity card (`bg-slate-900/95 border-2 border-amber-500/50`) guaranteeing WCAG AAA contrast ($\ge 12.5:1$ headline, $\ge 15:1$ body text), `role="region"` with `aria-live="polite"`, `aria-expanded` state tracking, and visible focus indicators.
4. **Automated & Manual Verification**:
   - Automated axe checks via Storybook `@storybook/addon-a11y`.
   - Cypress keyboard tests and component tests.
   - Screen-reader text summaries (`.sr-only`) provided for visual graphs (`WeatherTrendChart`) and loading transitions (`WeatherDashboardSkeleton` with `role="status"` and `aria-live="polite"`).
