import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeriodFilter from "./PeriodFilter";

const defaultProps = {
  period: "30d" as const,
  setPeriod: vi.fn(),
};

describe("PeriodFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default aria label when none provided", () => {
    render(<PeriodFilter {...defaultProps} />);
    expect(screen.getByLabelText("Period filter select")).toBeInTheDocument();
  });

  it("renders with custom aria label when provided", () => {
    render(<PeriodFilter {...defaultProps} ariaLabel="Spending period" />);
    expect(screen.getByLabelText("Spending period")).toBeInTheDocument();
  });

  it("calls setPeriod with correct value when an option is selected", async () => {
    render(<PeriodFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText("Period filter select"));
    await userEvent.click(screen.getByText("Last 7 days"));
    expect(defaultProps.setPeriod).toHaveBeenCalledWith("7d");
  });

  it("disables the select when disabled prop is true", () => {
    render(<PeriodFilter {...defaultProps} disabled />);
    expect(screen.getByLabelText("Period filter select")).toBeDisabled();
  });
});
