import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import {
  DASHBOARD_ROUTE,
  DASHBOARD_TRANSACTIONS_ROUTE,
  HOME_ROUTE,
} from "./routes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Transactions from "./pages/dashboard/Transactions";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={DASHBOARD_ROUTE} element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route
                path={DASHBOARD_TRANSACTIONS_ROUTE}
                element={<Transactions />}
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
