import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface IAllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: IAllProvidersProps) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <MemoryRouter>{children}</MemoryRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

const renderWithProviders = (ui: ReactElement) =>
  render(ui, { wrapper: AllProviders });

export * from "@testing-library/react";
export { renderWithProviders };
