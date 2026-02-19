import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import {
  DASHBOARD_ROUTE,
  DASHBOARD_TRANSACTIONS_ROUTE,
  DASHBOARD_TRENDS_ROUTE,
  HOME_ROUTE,
} from "./routes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/Overview";
import TransactionsPage from "./pages/dashboard/Transactions";
import TrendsPage from "./pages/dashboard/Trends";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={DASHBOARD_ROUTE} element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route
                path={DASHBOARD_TRANSACTIONS_ROUTE.replace(
                  DASHBOARD_ROUTE,
                  "",
                ).slice(1)}
                element={<TransactionsPage />}
              />
              <Route
                path={DASHBOARD_TRENDS_ROUTE.replace(DASHBOARD_ROUTE, "").slice(
                  1,
                )}
                element={<TrendsPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
