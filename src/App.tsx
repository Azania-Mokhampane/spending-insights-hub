import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "./routes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/Overview";
import TransactionsPage from "./pages/dashboard/Transactions";
import TrendsPage from "./pages/dashboard/Trends";
import GoalsPage from "./pages/dashboard/Goals";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <HomePage />,
    handle: { title: "Spending Insights Hub" },
  },
  {
    path: DASHBOARD_ROUTE,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <OverviewPage />, handle: { title: "Overview" } },
      {
        path: "transactions",
        element: <TransactionsPage />,
        handle: { title: "Transactions" },
      },
      { path: "trends", element: <TrendsPage />, handle: { title: "Trends" } },
      { path: "goals", element: <GoalsPage />, handle: { title: "Goals" } },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
