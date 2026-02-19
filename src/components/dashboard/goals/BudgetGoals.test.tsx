import { render, screen } from "@testing-library/react";
import BudgetGoals from "./BudgetGoals";
import type { BudgetGoal } from "types";

const mockGoals: BudgetGoal[] = [
  {
    id: "1",
    category: "Groceries",
    monthlyBudget: 3000,
    currentSpent: 1500,
    percentageUsed: 50,
    daysRemaining: 15,
    status: "on_track",
  },
  {
    id: "2",
    category: "Entertainment",
    monthlyBudget: 1000,
    currentSpent: 850,
    percentageUsed: 85,
    daysRemaining: 15,
    status: "warning",
  },
  {
    id: "3",
    category: "Dining",
    monthlyBudget: 2000,
    currentSpent: 2200,
    percentageUsed: 110,
    daysRemaining: 15,
    status: "exceeded",
  },
];

describe("BudgetGoals", () => {
  it("renders the card title", () => {
    render(<BudgetGoals goals={mockGoals} />);
    expect(screen.getByText("Budget Goals")).toBeInTheDocument();
  });

  it("renders all goal categories", () => {
    render(<BudgetGoals goals={mockGoals} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Dining")).toBeInTheDocument();
  });

  it("renders days remaining for each goal", () => {
    render(<BudgetGoals goals={mockGoals} />);
    const daysLeft = screen.getAllByText(/d left/);
    expect(daysLeft).toHaveLength(3);
  });

  it("caps progress bar at 100% when percentage exceeds budget", () => {
    render(<BudgetGoals goals={mockGoals} />);
    const progressBars = screen
      .getAllByRole("generic")
      .filter((el) => el.style.width !== "");
    const exceededBar = progressBars.find((el) => el.style.width === "100%");
    expect(exceededBar).toBeDefined();
  });

  it("renders empty state with no goals", () => {
    render(<BudgetGoals goals={[]} />);
    expect(screen.getByText("Budget Goals")).toBeInTheDocument();
    expect(screen.queryByText(/d left/)).not.toBeInTheDocument();
  });
});
