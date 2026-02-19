import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("does not render month range buttons when monthRange is not provided", () => {
    render(<MonthlySpendingTrends trends={mockTrends} />);
    expect(screen.queryByText("6M")).not.toBeInTheDocument();
    expect(screen.queryByText("12M")).not.toBeInTheDocument();
    expect(screen.queryByText("24M")).not.toBeInTheDocument();
  });

  it("renders all month range buttons when monthRange is provided", () => {
    render(
      <MonthlySpendingTrends
        trends={mockTrends}
        monthRange={6}
        setMonthRange={vi.fn()}
      />,
    );
    expect(screen.getByText("6M")).toBeInTheDocument();
    expect(screen.getByText("12M")).toBeInTheDocument();
    expect(screen.getByText("24M")).toBeInTheDocument();
  });

  it("applies default variant to the active month range button", () => {
    render(
      <MonthlySpendingTrends
        trends={mockTrends}
        monthRange={12}
        setMonthRange={vi.fn()}
      />,
    );
    const activeButton = screen.getByText("12M");
    const inactiveButton = screen.getByText("6M");
    expect(activeButton.closest("button")).toHaveAttribute(
      "data-variant",
      "default",
    );
    expect(inactiveButton.closest("button")).toHaveAttribute(
      "data-variant",
      "outline",
    );
  });

  it("calls setMonthRange with correct value when a button is clicked", async () => {
    const setMonthRange = vi.fn();
    render(
      <MonthlySpendingTrends
        trends={mockTrends}
        monthRange={6}
        setMonthRange={setMonthRange}
      />,
    );
    await userEvent.click(screen.getByText("24M"));
    expect(setMonthRange).toHaveBeenCalledWith(24);
  });

  it("does not throw when setMonthRange is not provided but buttons are clicked", async () => {
    render(<MonthlySpendingTrends trends={mockTrends} monthRange={6} />);
    await userEvent.click(screen.getByText("12M"));
    // should not throw
  });

  it("renders correctly with empty trends array", () => {
    render(<MonthlySpendingTrends trends={[]} />);
    expect(screen.getByText("Monthly Spending Trends")).toBeInTheDocument();
  });
});
