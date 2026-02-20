import { format, parse } from "date-fns";

export const formatMonth = (month: string) => {
  const date = parse(month, "yyyy-MM", new Date());

  return format(date, "MMM yy");
};

export const formatToISODate = (date: Date) => format(date, "yyyy-MM-dd");

export const formatUTCDate = (
  dateStr: string,
  pattern: string = "dd MMM yy, HH:mm",
): string => {
  const date = new Date(dateStr);
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  return format(utcDate, pattern);
};
