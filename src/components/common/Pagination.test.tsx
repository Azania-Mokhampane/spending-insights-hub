import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../common/Pagination";

const defaultProps = {
  page: 1,
  setPage: vi.fn(),
  totalEntries: 100,
  perPage: 20,
  setPerPage: vi.fn(),
};

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page info correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("returns null when totalPages is 0", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalEntries={0} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("disables previous buttons on first page", () => {
    render(<Pagination {...defaultProps} page={1} />);
    const prevButton = screen
      .getByLabelText("Go to previous page")
      .closest("button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next buttons on last page", () => {
    render(<Pagination {...defaultProps} page={5} />);
    const nextButton = screen
      .getByLabelText("Go to next page")
      .closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("calls setPage with page - 1 when previous is clicked", async () => {
    render(<Pagination {...defaultProps} page={3} />);
    await userEvent.click(screen.getByLabelText("Go to previous page"));
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });

  it("calls setPage with page + 1 when next is clicked", async () => {
    render(<Pagination {...defaultProps} page={2} />);
    await userEvent.click(screen.getByLabelText("Go to next page"));
    expect(defaultProps.setPage).toHaveBeenCalledWith(3);
  });

  it("calls setPage with 1 when first page button is clicked", async () => {
    render(<Pagination {...defaultProps} page={3} />);
    await userEvent.click(screen.getByLabelText("Go to first page"));
    expect(defaultProps.setPage).toHaveBeenCalledWith(1);
  });

  it("calls setPage with totalPages when last page button is clicked", async () => {
    render(<Pagination {...defaultProps} page={2} />);
    await userEvent.click(screen.getByLabelText("Go to last page"));
    expect(defaultProps.setPage).toHaveBeenCalledWith(5);
  });

  it("calls setPerPage and resets page to 1 when rows per page changes", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByLabelText("Pagination per page select"));
    await userEvent.click(screen.getByText("50"));
    expect(defaultProps.setPerPage).toHaveBeenCalledWith(50);
    expect(defaultProps.setPage).toHaveBeenCalledWith(1);
  });
});
