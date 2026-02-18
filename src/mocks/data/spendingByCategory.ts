import type { Period, SpendingByCategoryType } from "types";
import { faker } from "@faker-js/faker";
import { ALL_CATEGORIES } from "./categoriesAndFilters";

export const spendingByCategory = ({
  period,
  startDate,
  endDate,
}: {
  period: Period;
  endDate?: string;
  startDate?: string;
}): SpendingByCategoryType => {
  // generate random category data
  const categories = ALL_CATEGORIES.map((cat) => {
    const amount = faker.number.float({
      min: 200,
      max: 2000,
      fractionDigits: 2,
    });
    const transactionCount = faker.number.int({ min: 1, max: 20 });
    return { ...cat, amount, transactionCount, percentage: 0 };
  });

  const totalAmount = categories.reduce((sum, c) => sum + c.amount, 0);
  categories.forEach((c) => {
    c.percentage = Number(((c.amount / totalAmount) * 100).toFixed(2));
  });

  // default date range based on period
  const end = endDate ? new Date(endDate) : new Date();
  const start = startDate
    ? new Date(startDate)
    : (() => {
        const d = new Date(end);
        switch (period) {
          case "7d":
            d.setDate(d.getDate() - 7);
            break;
          case "30d":
            d.setMonth(d.getMonth() - 1);
            break;
          case "90d":
            d.setMonth(d.getMonth() - 3);
            break;
          case "1y":
            d.setFullYear(d.getFullYear() - 1);
            break;
        }
        return d;
      })();

  return {
    dateRange: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    },
    totalAmount: Number(totalAmount.toFixed(2)),
    categories,
  };
};
