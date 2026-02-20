import { render, screen } from "@testing-library/react";
import PageHeader from "../common/PageHeader";

describe("PageHeader", () => {
  it("renders the title", () => {
    render(<PageHeader title="Transactions" />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("renders the caption when provided", () => {
    render(
      <PageHeader title="Transactions" caption="View all your transactions" />,
    );
    expect(screen.getByText("View all your transactions")).toBeInTheDocument();
  });

  it("does not render caption when not provided", () => {
    render(<PageHeader title="Transactions" />);
    expect(
      screen.queryByText("View all your transactions"),
    ).not.toBeInTheDocument();
  });
});
