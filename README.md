# Spending Insights Hub

A responsive personal finance dashboard that helps users visualize spending patterns, track transactions, manage budget goals, and analyze category-wise breakdowns through interactive charts and filtering.

## Live Demo

[spending-insights-hub.pages.dev](https://spending-insights-hub.pages.dev/)

## Repository

[github.com/Azania-Mokhampane/spending-insights-hub](https://github.com/Azania-Mokhampane/spending-insights-hub)

---

## Screenshots

### Desktop

<img width="756" alt="Screenshot 2026-02-20 at 18 31 03" src="https://github.com/user-attachments/assets/7115d2c9-7b3e-44e9-8e39-363a6909de53" />
<img width="756" alt="Screenshot 2026-02-20 at 18 31 12" src="https://github.com/user-attachments/assets/8c4ecf9a-e1ca-43b8-bf72-b62ffa520d95" />
<img width="756" alt="Screenshot 2026-02-20 at 18 31 22" src="https://github.com/user-attachments/assets/2e2ad123-d96a-48c9-914d-986e309f3e38" />
<img width="756" alt="Screenshot 2026-02-20 at 18 34 25" src="https://github.com/user-attachments/assets/21cae50c-3210-40e0-8749-58ea871e99a4" />
<img width="756" alt="Screenshot 2026-02-20 at 18 34 40" src="https://github.com/user-attachments/assets/d5fce050-f497-4946-ab22-a65f06879733" />

### Mobile

<img width="349" height="752" alt="Screenshot 2026-02-20 at 18 41 10" src="https://github.com/user-attachments/assets/eb7b5d07-db51-4c7e-a6d7-14bea78ea4c4" />
<img width="349" height="751" alt="Screenshot 2026-02-20 at 18 41 25" src="https://github.com/user-attachments/assets/7171bab8-2b36-40de-96ff-015afacc2a00" />
<img width="347" height="752" alt="Screenshot 2026-02-20 at 18 41 47" src="https://github.com/user-attachments/assets/46dbf354-87c3-4df8-8c79-4e20eb4cee52" />
<img width="349" height="749" alt="Screenshot 2026-02-20 at 18 42 00" src="https://github.com/user-attachments/assets/baee63dc-84ea-4f22-aa2d-3d13480f5d69" />
<img width="348" height="750" alt="Screenshot 2026-02-20 at 18 42 14" src="https://github.com/user-attachments/assets/98ca5dd9-d531-4003-af88-799da64ac5fe" />

---

## Tech Stack

- **React 19**, TypeScript, Vite, Tailwind CSS 4, Shadcn/ui
- **React Router v7**, TanStack Query v5
- **Recharts** for data visualization
- **Vitest**, Testing Library
- **MSW** and Faker.js for API mocking
- ESLint, Prettier for code quality

---

## Prerequisites

- Node.js v24+
- Yarn v1.22+
- Docker

---

## Getting Started

```bash
git clone https://github.com/Azania-Mokhampane/spending-insights-hub.git
cd spending-insights-hub
yarn install
yarn dev
```

App runs at `http://localhost:5173`

---

## Available Scripts

```bash
yarn dev              # Start development server
yarn build            # Production build
yarn preview          # Preview production build locally
yarn typecheck        # TypeScript type checking
yarn lint             # Lint code
yarn format:check     # Check formatting
```

---

## Running Tests

```bash
# Unit & component tests
yarn test:run

# With coverage
yarn test:coverage
```

---

## Docker

```bash
# Using Docker Compose (recommended)
docker compose up --build
# App runs at http://localhost:4173

# Or manually
docker build -t spending-insights-hub .
docker run -p 4173:4173 spending-insights-hub
```

---

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components (State, Pagination, PageHeader, CategoryIcon)
│   ├── dashboard/
│   │   ├── charts/       # MonthlySpendingTrends, CategoryBreakdown
│   │   ├── filters/      # DateRangeFilters, PeriodFilter
│   │   ├── goals/        # BudgetGoals
│   │   ├── overview/     # CustomerSummary, SectionHeader
│   │   └── transactions/ # TransactionList, TransactionsFilters, SummaryCards
│   ├── navigation/       # Navbar, sidebar
│   └── ui/               # Shadcn/ui components
├── pages/                # Route-level page components
├── hooks/                # Custom hooks for data fetching and filters
├── mocks/                # MSW handlers and Faker.js mock data
├── types/                # Centralized TypeScript definitions
├── helpers/              # Formatting and utility functions
└── lib/                  # Constants and shared utilities
```

---

## Key Decisions

**Mock API with MSW** — No live backend was provided, so MSW intercepts API calls at the service worker level, allowing realistic development and testing without a real server. Handlers can be swapped for real endpoints without touching component code.

**URL-based filtering** — All filters (period, category, date range, sort, pagination) are stored in URL search params via `nuqs`, making views shareable and filter state persistent across page reloads.

**TanStack Query for server state** — Handles caching, background refetching, and loading/error states cleanly without manual state management, keeping components lean.

**Feature-based component structure** — Components are grouped by feature rather than type (e.g. `dashboard/`, `navigation/`) for better colocation and scalability as the app grows.

**CI/CD with reusable workflows** — GitHub Actions pipeline uses reusable workflow files for quality, build, test and deploy jobs. Deploy only triggers on pushes to master after all checks pass, using Docker to build the app and Wrangler to deploy to Cloudflare Pages.

---

# Contact

Built by **Azania Mokhampane**

📧 [azaniam04@gmail.com](mailto:azaniam04@gmail.com)
