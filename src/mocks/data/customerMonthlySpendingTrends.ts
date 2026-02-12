import type { MonthlySpendingTrendType } from "@/lib/types";

export const customerMonthlySpendingTrends = (
  months: number,
): MonthlySpendingTrendType[] =>
  Array.from({ length: months }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));

    const totalSpent = 2000 + Math.floor(Math.random() * 1500);
    const transactionCount = 30 + Math.floor(Math.random() * 20);
    const averageTransaction = Number(
      (totalSpent / transactionCount).toFixed(2),
    );

    return {
      month: date.toISOString().slice(0, 7), // YYYY-MM
      totalSpent,
      transactionCount,
      averageTransaction,
    };
  });
