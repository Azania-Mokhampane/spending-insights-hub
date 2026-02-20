import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatePresetFilter from "./DatePresetFilter";
import type { DateRangePresetType } from "types";

const mockPresets: DateRangePresetType[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last year", value: "1y" },
];

const defaultProps = {
  datePreset: "30d",
  setDatePreset: vi.fn(),
  dateRangePresets: mockPresets,
};

describe("DatePresetFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default aria label when none provided", () => {
    render(<DatePresetFilter {...defaultProps} />);
    expect(screen.getByLabelText("Period filter select")).toBeInTheDocument();
  });

  it("renders with custom aria label when provided", () => {
    render(<DatePresetFilter {...defaultProps} ariaLabel="Spending period" />);
    expect(screen.getByLabelText("Spending period")).toBeInTheDocument();
  });

  it("renders all period options from presets", async () => {
    render(<DatePresetFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText("Period filter select"));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Last 7 days");
    expect(options[1]).toHaveTextContent("Last 30 days");
    expect(options[2]).toHaveTextContent("Last 90 days");
    expect(options[3]).toHaveTextContent("Last year");
  });

  it("renders empty select when no presets provided", () => {
    render(<DatePresetFilter {...defaultProps} dateRangePresets={[]} />);
    expect(screen.getByLabelText("Period filter select")).toBeInTheDocument();
  });

  it("calls setPeriod with correct value when an option is selected", async () => {
    render(<DatePresetFilter {...defaultProps} />);
    await userEvent.click(screen.getByLabelText("Period filter select"));
    await userEvent.click(screen.getByText("Last 7 days"));
    expect(defaultProps.setDatePreset).toHaveBeenCalledWith("7d");
  });

  it("disables the select when disabled prop is true", () => {
    render(<DatePresetFilter {...defaultProps} disabled />);
    expect(screen.getByLabelText("Period filter select")).toBeDisabled();
  });
});
