import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "@/tests/testUtils";
import TransactionsFilters from "./TransactionsFilters";
import type { CategoryType } from "types";

const mockCategories: CategoryType[] = [
  { name: "Groceries", color: "#4CAF50", icon: "ShoppingCart" },
  { name: "Entertainment", color: "#2196F3", icon: "Film" },
];

const defaultProps = {
  categories: mockCategories,
  sortBy: "date_desc" as const,
  setSortBy: vi.fn(),
  endDate: null,
  setEndDate: vi.fn(),
  startDate: null,
  setStartDate: vi.fn(),
  category: "all",
  setCategory: vi.fn(),
};

describe("TransactionsFilters", () => {
  it("renders the category filter", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(
      screen.getByRole("combobox", { name: "Transactions category filter" }),
    ).toBeInTheDocument();
  });

  it("renders the start date filter button", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(screen.getByTestId("start-date-filter")).toBeInTheDocument();
  });

  it("renders the end date filter button", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(screen.getByTestId("end-date-filter")).toBeInTheDocument();
  });

  it("renders From placeholder when no start date is set", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(screen.getByText("From")).toBeInTheDocument();
  });

  it("renders To placeholder when no end date is set", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(screen.getByText("To")).toBeInTheDocument();
  });

  it("renders formatted start date when set", () => {
    renderWithProviders(
      <TransactionsFilters
        {...defaultProps}
        startDate={new Date("2024-01-15")}
      />,
    );
    expect(screen.getByText("15 Jan 24")).toBeInTheDocument();
  });

  it("renders formatted end date when set", () => {
    renderWithProviders(
      <TransactionsFilters
        {...defaultProps}
        endDate={new Date("2024-01-31")}
      />,
    );
    expect(screen.getByText("31 Jan 24")).toBeInTheDocument();
  });

  it("renders clear button when start date is set", () => {
    renderWithProviders(
      <TransactionsFilters
        {...defaultProps}
        startDate={new Date("2024-01-15")}
      />,
    );
    expect(screen.getByTestId("clear-date-filter")).toBeInTheDocument();
  });

  it("renders clear button when end date is set", () => {
    renderWithProviders(
      <TransactionsFilters
        {...defaultProps}
        endDate={new Date("2024-01-31")}
      />,
    );
    expect(screen.getByTestId("clear-date-filter")).toBeInTheDocument();
  });

  it("does not render clear button when no dates are set", () => {
    renderWithProviders(<TransactionsFilters {...defaultProps} />);
    expect(screen.queryByTestId("clear-date-filter")).not.toBeInTheDocument();
  });

  it("calls setStartDate and setEndDate with null when clear is clicked", async () => {
    const setStartDate = vi.fn();
    const setEndDate = vi.fn();
    renderWithProviders(
      <TransactionsFilters
        {...defaultProps}
        startDate={new Date("2024-01-15")}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );
    await userEvent.click(screen.getByTestId("clear-date-filter"));
    expect(setStartDate).toHaveBeenCalledWith(null);
    expect(setEndDate).toHaveBeenCalledWith(null);
  });
});
