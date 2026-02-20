import { render, screen } from "@testing-library/react";
import DateRangeFilters from "./DateRangeFilters";

const defaultProps = {
  startDate: null,
  endDate: null,
  setStartDate: vi.fn(),
  setEndDate: vi.fn(),
};

describe("DateRangeFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders start and end date buttons", () => {
    render(<DateRangeFilters {...defaultProps} />);
    expect(screen.getByLabelText("Start date filter")).toBeInTheDocument();
    expect(screen.getByLabelText("End date filter")).toBeInTheDocument();
  });

  it("renders From and To placeholders when no dates are selected", () => {
    render(<DateRangeFilters {...defaultProps} />);
    expect(screen.getByText("From")).toBeInTheDocument();
    expect(screen.getByText("To")).toBeInTheDocument();
  });

  it("renders formatted start date when provided", () => {
    render(
      <DateRangeFilters {...defaultProps} startDate={new Date("2024-01-15")} />,
    );
    expect(screen.getByText("15 Jan 24")).toBeInTheDocument();
  });

  it("renders formatted end date when provided", () => {
    render(
      <DateRangeFilters {...defaultProps} endDate={new Date("2024-01-31")} />,
    );
    expect(screen.getByText("31 Jan 24")).toBeInTheDocument();
  });

  it("does not render clear button when no dates are selected", () => {
    render(<DateRangeFilters {...defaultProps} />);
    expect(
      screen.queryByLabelText("Clear date filter"),
    ).not.toBeInTheDocument();
  });

  it("renders clear button when startDate is set", () => {
    render(
      <DateRangeFilters {...defaultProps} startDate={new Date("2024-01-15")} />,
    );
    expect(screen.getByLabelText("Clear date filter")).toBeInTheDocument();
  });

  it("renders clear button when endDate is set", () => {
    render(
      <DateRangeFilters {...defaultProps} endDate={new Date("2024-01-31")} />,
    );
    expect(screen.getByLabelText("Clear date filter")).toBeInTheDocument();
  });

  it("disables both buttons when disabled prop is true", () => {
    render(<DateRangeFilters {...defaultProps} disabled />);
    expect(screen.getByLabelText("Start date filter")).toBeDisabled();
    expect(screen.getByLabelText("End date filter")).toBeDisabled();
  });
});
