# Spending Insights Hub

A modern, responsive personal finance dashboard built with React that helps users visualize their spending patterns, track transactions, manage budget goals, and analyze category-wise spending breakdowns. The application provides actionable insights into spending habits through interactive charts and detailed transaction filtering.

## Live Demo

[Coming soon - Demo link will be added here]

## Tech Stack

### Frontend

- **React 19** - UI library with latest features and optimizations
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **TanStack Query v5** - Server state management
- **Recharts** - Interactive data visualization
- **Shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon set
- **Date-fns** - Date utility library

### Testing & Code Quality

- **Vitest** - Fast unit test framework
- **Testing Library** - DOM and React testing utilities
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

### Development Tools

- **MSW (Mock Service Worker)** - API mocking for development
- **Faker.js** - Realistic mock data generation
- **Tailwind CSS Vite Plugin** - Optimized CSS processing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Yarn** (v1.22 or higher) - Package manager
- **Git** - Version control
- **Docker** (optional) - For containerized development/deployment

## Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spending-insights-hub
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Type Checking

Run TypeScript compiler to check for type errors:

```bash
yarn typecheck
```

### 5. Code Quality

Lint and format your code:

```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format

# Check formatting without modifying
yarn format:check
```

## Running Tests

### Unit & Component Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once (CI mode)
yarn test:run

# Run tests with UI dashboard
yarn test:ui

# Run tests with coverage report
yarn test:coverage
```

### E2E Tests

```bash
# Run Playwright tests
yarn playwright test

# View Playwright test report
yarn playwright show-report
```

## Building for Production

### Build the Application

```bash
# Build with type checking and optimization
yarn build
```

The optimized production build will be generated in the `dist/` directory.

### Preview Production Build Locally

```bash
yarn preview
```

This serves the built application locally for testing before deployment.

## Docker

### Build Docker Image

```bash
docker build -t spending-insights-hub:latest .
```

### Run Docker Container

```bash
docker run -p 3000:3000 spending-insights-hub:latest
```

Access the application at `http://localhost:3000`

### Docker Compose

For local development with Docker:

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`

## Project Structure

```
spending-insights-hub/
├── src/
│   ├── components/
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── BudgetGoals.tsx
│   │   │   ├── CategoryBreakdown.tsx
│   │   │   ├── CategoryIcon.tsx
│   │   │   ├── CustomerSummary.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── MonthlySpendingTrends.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   └── TransactionsFilters.tsx
│   │   ├── navigation/          # Navigation components
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavLink.tsx
│   │   │   └── SidebarContent.tsx
│   │   └── ui/                  # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── select.tsx
│   │       └── ... other UI components
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── NotFound.tsx
│   │   └── dashboard/
│   │       └── Transactions.tsx
│   ├── hooks/
│   │   ├── useBudgetGoals.ts
│   │   ├── useTransactions.ts
│   │   ├── useCategoriesAndFilters.ts
│   │   ├── useSpendingSummary.ts
│   │   ├── filters/             # Filter-specific hooks
│   │   └── ... other custom hooks
│   ├── helpers/
│   │   ├── formatCurrency.ts
│   │   ├── getCustomerInitials.ts
│   │   └── dateUtils.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── mocks/
│   │   ├── browser.ts           # MSW setup
│   │   ├── handlers/            # API handlers
│   │   └── data/                # Mock data
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   └── routes.ts                # Route definitions
├── tests/
│   └── e2e/                     # E2E tests
│       ├── example.spec.ts
│       └── transactions.spec.ts
├── public/
│   └── mockServiceWorker.js     # MSW service worker
├── Dockerfile                   # Container configuration
├── docker-compose.yml           # Docker Compose setup
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── eslint.config.js             # ESLint configuration
├── prettier.config.json         # Prettier configuration
└── package.json                 # Dependencies and scripts
```

## Assumptions & Decisions

### Architecture & Design Patterns

1. **Component-Based Architecture**
   - Organized components by feature (dashboard, navigation, ui) for better maintainability
   - Separated presentational components from containers
   - Reusable UI components built with Shadcn/ui and Tailwind CSS

2. **State Management**
   - Used **TanStack Query** for server state management (data fetching, caching, synchronization)
   - Used **React Router** search params for client state (URL-based filtering)
   - Custom hooks encapsulate data-fetching logic and API interactions

3. **Data Fetching & Mock API**
   - Integrated **MSW (Mock Service Worker)** for API mocking during development
   - Allows testing without a real backend
   - Mock data generated using **Faker.js** for realistic test scenarios
   - API structure can be easily replaced with real endpoints

4. **Type Safety**
   - Strict TypeScript configuration with full type coverage
   - Centralized type definitions in `types/index.ts`
   - Type-safe API responses and component props

5. **URL-Based Filtering**
   - Filters stored in URL search params (period, category, date range, sort, pagination)
   - Enables shareable URLs with filtered views
   - Preserves filter state on page reload
   - Implemented using `nuqs` library for type-safe search params

6. **Styling Approach**
   - **Tailwind CSS 4** for utility-first styling
   - Component variants using **CVA (Class Variance Authority)**
   - Dark mode support built-in
   - Responsive design with mobile-first approach

7. **Testing Strategy**
   - **Unit/Component Tests** with Vitest for logic and UI behavior
   - **E2E Tests** with Playwright for user workflows
   - Mock data for consistent test scenarios
   - Test coverage for components, hooks, and utilities

8. **Code Quality**
   - ESLint for code standards enforcement
   - Prettier for consistent code formatting
   - Type checking with TypeScript compiler
   - Pre-commit checks recommended

9. **Performance Optimizations**
   - Vite for fast development and optimized builds
   - React 19 with automatic optimizations
   - TanStack Query for efficient data fetching and caching
   - Code splitting and lazy loading with React Router
   - Responsive images and optimized assets

10. **Data Visualization**
    - **Recharts** for charts and graphs
    - Pie charts for category breakdown
    - Line charts for spending trends
    - Tooltip and interactive features for better UX

### Development Workflow

- **Hot Module Replacement (HMR)** enabled in Vite for instant feedback during development
- **MSW** intercepts API calls in development for seamless mock data integration
- **Search params** used for filter state to enable bookmark-able and shareable URLs
- Monolithic frontend structure suitable for this single-page application

### Future Scalability Considerations

- Component structure allows easy addition of new dashboard sections
- Hook-based data fetching can be extended for additional API endpoints
- Type system provides foundation for backend integration
- MSW handlers can be gradually replaced with real API calls
- Modular styling system allows theming and customization
