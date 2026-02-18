import { render } from "@testing-library/react";
import CategoryIcon from "./CategoryIcon";

describe("CategoryIcon", () => {
  it("renders nothing when iconName is not provided", () => {
    const { container } = render(<CategoryIcon />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a known icon from ICON_PRESETS", () => {
    const { container } = render(<CategoryIcon iconName="ShoppingCart" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the fallback ShoppingCart icon for an unknown iconName", () => {
    const { container } = render(<CategoryIcon iconName="UnknownIcon" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
