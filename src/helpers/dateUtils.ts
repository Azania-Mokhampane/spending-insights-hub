import { format, parse } from "date-fns";

export const formatMonth = (month: string) => {
  const date = parse(month, "yyyy-MM", new Date());

  return format(date, "MMM yy");
};

export const formatToISODate = (date: Date) => format(date, "yyyy-MM-dd");
