import { render, screen } from "@testing-library/react";
import CustomerSummary from "./CustomerSummary";
import type { CustomerProfileType } from "types";

const mockCustomer: CustomerProfileType = {
  customerId: "1",
  name: "John Smith",
  email: "john@example.com",
  joinDate: "2022-03-15",
  accountType: "premium",
  totalSpent: 15000,
  currency: "ZAR",
};

describe("CustomerSummary", () => {
  it("renders the customer first name in the welcome message", () => {
    render(<CustomerSummary customer={mockCustomer} />);
    expect(screen.getByText("Welcome back, John")).toBeInTheDocument();
  });

  it("renders the correct initials in the avatar", () => {
    render(<CustomerSummary customer={mockCustomer} />);
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("renders the account type badge", () => {
    render(<CustomerSummary customer={mockCustomer} />);
    expect(screen.getByText("premium")).toBeInTheDocument();
  });

  it("renders the join date formatted correctly", () => {
    render(<CustomerSummary customer={mockCustomer} />);
    expect(screen.getByText(/Member since Mar 22/)).toBeInTheDocument();
  });

  it("renders the total spent amount", () => {
    render(<CustomerSummary customer={mockCustomer} />);
    expect(screen.getByText(/R.*15.*000/)).toBeInTheDocument();
  });

  it("renders basic account type badge", () => {
    render(
      <CustomerSummary customer={{ ...mockCustomer, accountType: "basic" }} />,
    );
    expect(screen.getByText("basic")).toBeInTheDocument();
  });
});
