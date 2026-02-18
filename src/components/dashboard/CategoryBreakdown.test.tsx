import { render, screen } from "@testing-library/react";
import CategoryBreakdown from "./CategoryBreakdown";
import type { SpendingByCategoryType } from "types";

const mockSpendingByCategory: SpendingByCategoryType = {
  dateRange: {
    startDate: "2026-01-01",
    endDate: "2026-01-31",
  },
  totalAmount: 5000,
  categories: [
    {
      name: "Groceries",
      amount: 2500,
      percentage: 50,
      transactionCount: 10,
      color: "#4CAF50",
      icon: "ShoppingCart",
    },
    {
      name: "Entertainment",
      amount: 1500,
      percentage: 30,
      transactionCount: 5,
      color: "#2196F3",
      icon: "Film",
    },
    {
      name: "Transport",
      amount: 1000,
      percentage: 20,
      transactionCount: 8,
      color: "#FF5722",
      icon: "Car",
    },
  ],
};

describe("CategoryBreakdown", () => {
  it("renders the card title", () => {
    render(<CategoryBreakdown spendingByCategory={mockSpendingByCategory} />);
    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });

  it("renders all category names", () => {
    render(<CategoryBreakdown spendingByCategory={mockSpendingByCategory} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });

  it("renders percentage for each category", () => {
    render(<CategoryBreakdown spendingByCategory={mockSpendingByCategory} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders empty state with no categories", () => {
    render(
      <CategoryBreakdown
        spendingByCategory={{ ...mockSpendingByCategory, categories: [] }}
      />,
    );
    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
    expect(
      screen.getByText("No spending by category data available"),
    ).toBeInTheDocument();
  });
});
