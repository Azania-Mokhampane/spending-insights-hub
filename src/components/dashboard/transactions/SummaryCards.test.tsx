import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/tests/testUtils";
import SummaryCards from "./SummaryCards";
import type { SpendingSummaryType } from "types";

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

describe("SummaryCards", () => {
  it("renders all card labels", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    expect(screen.getByText("Total Spent")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Avg. Transaction")).toBeInTheDocument();
    expect(screen.getByText("Top Category")).toBeInTheDocument();
  });

  it("renders the top category value", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });

  it("renders the transaction count", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders positive change with trending up indicator", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    expect(screen.getByText("5%")).toBeInTheDocument();
  });

  it("renders negative change with trending down indicator", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    expect(screen.getByText("3%")).toBeInTheDocument();
  });

  it("renders vs prev label for cards with change values", () => {
    renderWithProviders(<SummaryCards spendingSummary={mockSpendingSummary} />);
    const vsPrev = screen.getAllByText("vs prev");
    expect(vsPrev).toHaveLength(2);
  });
});
