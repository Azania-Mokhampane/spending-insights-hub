import { render, screen } from "@testing-library/react";
import MonthlySpendingTrends from "./MonthlySpendingTrends";
import type { MonthlySpendingTrendType } from "types";

const mockTrends: MonthlySpendingTrendType[] = [
  {
    month: "2024-01",
    totalSpent: 15000,
    transactionCount: 42,
    averageTransaction: 357,
  },
  {
    month: "2024-02",
    totalSpent: 12000,
    transactionCount: 38,
    averageTransaction: 316,
  },
  {
    month: "2024-03",
    totalSpent: 18000,
    transactionCount: 55,
    averageTransaction: 327,
  },
];

describe("MonthlySpendingTrends", () => {
  it("renders the card title", () => {
    render(<MonthlySpendingTrends trends={mockTrends} />);
    expect(screen.getByText("Monthly Spending Trends")).toBeInTheDocument();
  });

  it("renders the recharts container", () => {
    const { container } = render(<MonthlySpendingTrends trends={mockTrends} />);
    expect(
      container.querySelector(".recharts-responsive-container"),
    ).toBeInTheDocument();
  });
});
