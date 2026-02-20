import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/tests/testUtils";
import TransactionTableRow from "./TransactionTableRow";
import type { TransactionType } from "types";

const mockTransaction: TransactionType = {
  id: "trans_1",
  date: "2026-02-15T14:30:00Z",
  merchant: "Whole Foods Market",
  category: "Groceries",
  amount: 125.5,
  description: "Weekly grocery shopping",
  paymentMethod: "Credit Card",
  icon: "ShoppingCart",
  categoryColor: "#10b981",
};

describe("TransactionTableRow", () => {
  it("renders merchant name in first cell", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
  });

  it("renders transaction description", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    expect(screen.getByText("Weekly grocery shopping")).toBeInTheDocument();
  });

  it("renders category name", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });

  it("renders formatted date with year and time", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    expect(screen.getByText(/15 Feb 26, 14:30/)).toBeInTheDocument();
  });

  it("renders payment method", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
  });

  it("renders formatted transaction amount", () => {
    renderWithProviders(<TransactionTableRow transaction={mockTransaction} />);
    const amount = screen.getByText(/125/);
    expect(amount).toBeInTheDocument();
  });
});
