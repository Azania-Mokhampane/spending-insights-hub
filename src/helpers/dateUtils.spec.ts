import { formatMonth, formatToISODate } from "./dateUtils";

describe("formatMonth", () => {
  it("formats a yyyy-MM string to MMM yy", () => {
    expect(formatMonth("2026-01")).toBe("Jan 26");
  });
});

describe("formatToISODate", () => {
  it("formats a Date to yyyy-MM-dd", () => {
    expect(formatToISODate(new Date("2026-01-15"))).toBe("2026-01-15");
  });
});
