import { formatMonth, formatToISODate, formatUTCDate } from "./dateUtils";

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

describe("formatUTCDate", () => {
  it("formats a UTC date string using the default pattern", () => {
    expect(formatUTCDate("2026-02-15T14:30:00Z")).toBe("15 Feb 26, 14:30");
  });

  it("renders time as-is regardless of local timezone", () => {
    expect(formatUTCDate("2026-06-01T09:05:00Z")).toBe("01 Jun 26, 09:05");
  });

  it("accepts a custom pattern", () => {
    expect(formatUTCDate("2026-02-15T14:30:00Z", "dd/MM/yyyy")).toBe(
      "15/02/2026",
    );
  });
});
