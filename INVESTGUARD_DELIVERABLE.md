# InvestGuard

Production-style React/TypeScript fintech MVP for the Hefty Hacks 2026 Finance × Trading hackathon.

## Run locally

```bash
pnpm install
pnpm dev
```

Build and QA commands:

```bash
pnpm run build
pnpm run test
pnpm run lint
```

No environment variables are required. The app is local-first and uses fictional seeded data.

## What is included

- Landing page, mock login, Demo Mode, protected app shell, responsive sidebar/mobile navigation, light/dark mode.
- Dashboard with portfolio metrics, performance line chart, allocation donut, sector exposure, behavior overview, recent transactions, and recent alerts.
- Portfolio search/filter table with gain/loss math and concentration banner.
- Transactions CRUD with positive-value validation, sell-quantity validation, local persistence, and automatic behavior re-analysis.
- Six deterministic behavior detectors: FOMO-like buying, overtrading, concentration, short-term reaction after declines, loss-aversion, and market timing.
- Smart Alerts inbox with reviewed/dismissed state and offline deterministic explanation drawer.
- Investment Journal, thesis-vs-action reflection, contribution planner, Learn content, and Settings threshold controls.
- AI Profit & Loss Assistant with English, Hindi, and Hinglish explanations, verified calculations, daily change, highest profit/loss, and expandable per-holding P/L explanations.
- Floating Guard AI agent that answers local portfolio, P/L, daily change, alert, and risk-signal questions from deterministic data.

## Project structure

```text
src/
  components/       Layout, charts, reusable UI primitives
  content/          Centralized behavioral copy and learning content
  engine/           Pure deterministic analyzer + Vitest tests
  lib/              Formatters and seeded demo data / price history
  services/         Portfolio math and transaction-derived holdings
  store/            Zustand local persistence and analysis orchestration
  types/            Domain models
  App.tsx           Routes and page experiences
  styles.css        Responsive premium fintech styling
```

## Local storage

Zustand persists the `investguard_v1` payload. It contains the local profile, demo flag, transactions, holdings, price history, journal entries, generated alerts, patterns, detection config, and theme. Demo Mode resets this payload to the current-date seeded scenarios.

## Engine defaults

Lookback 5 days; reaction window 3 days; FOMO rise 10%; panic drop 8%; timing move 5%; concentration 30%; loss-aversion drawdown 15% held for 30+ days; overtrading 5 transactions in 7 days and above baseline; market timing 3 recent trades.

Every alert includes concrete evidence, related transaction IDs, a hedged explanation, and a reflection question. The UI never recommends a security, promises returns, diagnoses emotions, or presents a behavioral signal as fact.

## Demo Mode

Click **Try demo** on the landing page or **Enter Demo Mode** on Login. The current-date seed includes normal investing, run-up buys, an overtrading burst, a concentrated NOVA position, a sale after a decline, alternating short-term trades, and a changed-thesis journal entry. Use **Run analysis** or open Smart Alerts to review the evidence.

## QA completed

- `tsc --noEmit` and production `vite build`: passing.
- Vitest: 2 tests passing, including deterministic output, evidence/reflection presence, and empty-data behavior.
- ESLint: passing.
- Browser smoke test: landing, Demo Mode, dashboard, six alerts, explanation drawer, and responsive navigation verified; no browser console errors observed.

## Future improvements

Backend/API service layer, schema validation on hydration, read-only broker aggregation, real market data, an LLM provider behind `POST /api/ai/profit-loss-explain`, notifications, voice output, and multi-currency support.
