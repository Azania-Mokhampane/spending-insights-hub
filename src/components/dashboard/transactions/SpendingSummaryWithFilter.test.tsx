import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "@/tests/testUtils";
import SpendingSummaryWithFilter from "./SpendingSummaryWithFilter";
import type { SpendingSummaryType } from "types";

vi.mock("@/hooks/filters/usePeriodSearchParams", () => ({
  usePeriodSearchParams: () => ["30d", vi.fn()],
}));

const mockSpendingSummary: SpendingSummaryType = {
  period: "30d",
  totalSpent: 15000,
  transactionCount: 42,
  averageTransaction: 357,
  topCategory: "Groceries",
  comparedToPrevious: {
    spentChange: 5,
    transactionChange: -3,
  },
};

vi.mock("@/hooks/useSpendingSummary", () => ({
  useSpendingSummary: () => ({ data: mockSpendingSummary }),
}));

describe("SpendingSummaryWithFilter", () => {
  it("renders the period select", () => {
    renderWithProviders(<SpendingSummaryWithFilter customerId="1" />);
    expect(
      screen.getByRole("combobox", { name: "Summary period filter select" }),
    ).toBeInTheDocument();
  });
  it("renders all period options", async () => {
    renderWithProviders(<SpendingSummaryWithFilter customerId="1" />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Summary period filter select" }),
    );
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
    expect(screen.getAllByText("Last 30 days").length).toBeGreaterThan(0);
    expect(screen.getByText("Last 90 days")).toBeInTheDocument();
    expect(screen.getByText("Last year")).toBeInTheDocument();
  });

  it("renders summary cards when data is available", () => {
    renderWithProviders(<SpendingSummaryWithFilter customerId="1" />);
    expect(screen.getByText("Total Spent")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Avg. Transaction")).toBeInTheDocument();
    expect(screen.getByText("Top Category")).toBeInTheDocument();
  });

  it("renders the top category value", () => {
    renderWithProviders(<SpendingSummaryWithFilter customerId="1" />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });
});
