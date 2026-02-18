import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats a positive amount in ZAR by default", () => {
    expect(formatCurrency(1000)).toMatch(/R.*1.*000,00/);
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toMatch(/R.*0,00/);
  });

  it("formats a negative amount", () => {
    expect(formatCurrency(-500)).toMatch(/-.*R.*500,00/);
  });

  it("formats with a custom locale and currency", () => {
    expect(formatCurrency(1000, "en-US", "USD")).toBe("$1,000.00");
  });
});
