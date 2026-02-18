import type { MonthlySpendingTrendType } from "types";
import { faker } from "@faker-js/faker";

export const customerMonthlySpendingTrends = (
  months: number,
): MonthlySpendingTrendType[] => {
  let baseAmount = faker.number.int({ min: 2000, max: 4000 });

  return Array.from({
    length: months,
  }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));

    const monthlyShift = faker.number.int({ min: -400, max: 500 });
    baseAmount = Math.max(1000, baseAmount + monthlyShift);

    const transactionCount = faker.number.int({ min: 25, max: 60 });
    const totalSpent = baseAmount;

    return {
      month: date.toISOString().slice(0, 7),
      totalSpent,
      transactionCount,
      averageTransaction: Number((totalSpent / transactionCount).toFixed(2)),
    };
  });
};
