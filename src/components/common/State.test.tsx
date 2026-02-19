import { render, screen } from "@testing-library/react";
import { State } from "../common/State";

describe("State", () => {
  it("renders children when all states are false", () => {
    render(
      <State>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  // loading
  it("renders default loading UI when isLoading is true", () => {
    render(
      <State isLoading>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders custom loadingText when provided", () => {
    render(
      <State isLoading loadingText="Please wait...">
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("renders custom loadingComponent when provided", () => {
    render(
      <State isLoading loadingComponent={<p>Custom Loader</p>}>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Custom Loader")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // error
  it("renders default error UI when isError is true", () => {
    render(
      <State isError>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Please try again later")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders custom errorComponent when provided", () => {
    render(
      <State isError errorComponent={<p>Custom Error</p>}>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  // empty
  it("renders default empty UI when isEmpty is true", () => {
    render(
      <State isEmpty>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("No data found")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders custom emptyComponent when provided", () => {
    render(
      <State isEmpty emptyComponent={<p>Custom Empty</p>}>
        <p>Content</p>
      </State>,
    );
    expect(screen.getByText("Custom Empty")).toBeInTheDocument();
    expect(screen.queryByText("No data found")).not.toBeInTheDocument();
  });
});
