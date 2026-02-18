import { getCustomerInitials } from "./getCustomerInitials";

describe("getCustomerInitials", () => {
  it("returns initials for a full name", () => {
    expect(getCustomerInitials("John Smith")).toBe("JS");
  });

  it("returns a single initial for a single name", () => {
    expect(getCustomerInitials("John")).toBe("J");
  });

  it("returns initials for three names", () => {
    expect(getCustomerInitials("John Michael Doe")).toBe("JMD");
  });

  it("returns uppercase initials", () => {
    expect(getCustomerInitials("john smith")).toBe("JS");
  });

  it("handles extra spaces between names", () => {
    expect(getCustomerInitials("John  Smith")).toBe("JS");
  });
});
