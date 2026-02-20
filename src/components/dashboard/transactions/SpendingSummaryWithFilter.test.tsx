import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "@/tests/testUtils";
import type { DateRangePresetType, SpendingSummaryType } from "types";
import SpendingSummaryWithFilter from "./SpendingSummaryWithFilter";

vi.mock("@/hooks/filters/transactionFilters", () => ({
  usePeriodFilter: () => ["30d", vi.fn()],
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

const mockPresets: DateRangePresetType[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last year", value: "1y" },
];

vi.mock("@/hooks/useSpendingSummary", () => ({
  useSpendingSummary: () => ({ data: mockSpendingSummary }),
}));

vi.mock("@/hooks/useCategoriesAndFilters", () => ({
  useDateRangePresets: () => ({ data: mockPresets }),
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
      screen.getByLabelText("Summary period filter select"),
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Last 7 days");
    expect(options[1]).toHaveTextContent("Last 30 days");
    expect(options[2]).toHaveTextContent("Last 90 days");
    expect(options[3]).toHaveTextContent("Last year");
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
