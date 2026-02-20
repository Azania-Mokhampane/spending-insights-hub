import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SectionHeader from "./SectionHeader";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("SectionHeader", () => {
  it("renders the title", () => {
    renderWithRouter(
      <SectionHeader
        title="Transactions"
        subtitle="Last 30 days"
        linkTo="/dashboard/transactions"
      />,
    );
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithRouter(
      <SectionHeader
        title="Transactions"
        subtitle="Last 30 days"
        linkTo="/dashboard/transactions"
      />,
    );
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
  });

  it("renders the default link label when linkLabel is not provided", () => {
    renderWithRouter(
      <SectionHeader
        title="Transactions"
        subtitle="Last 30 days"
        linkTo="/dashboard/transactions"
      />,
    );
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("renders a custom link label when provided", () => {
    renderWithRouter(
      <SectionHeader
        title="Transactions"
        subtitle="Last 30 days"
        linkTo="/dashboard/transactions"
        linkLabel="See All"
      />,
    );
    expect(screen.getByText("See All")).toBeInTheDocument();
  });

  it("renders the correct href on the link", () => {
    renderWithRouter(
      <SectionHeader
        title="Transactions"
        subtitle="Last 30 days"
        linkTo="/dashboard/transactions"
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/dashboard/transactions",
    );
  });
});
