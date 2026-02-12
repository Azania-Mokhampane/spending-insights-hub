import type { Period, SpendingSummaryType } from "@/lib/types";

export const mockCustomerSpendingSummary: Record<Period, SpendingSummaryType> =
  {
    "7d": {
      period: "7d",
      totalSpent: 420.75,
      transactionCount: 8,
      averageTransaction: 52.59,
      topCategory: "Dining",
      comparedToPrevious: {
        spentChange: -2.4,
        transactionChange: -1.2,
      },
    },
    "30d": {
      period: "30d",
      totalSpent: 2840.3,
      transactionCount: 34,
      averageTransaction: 83.54,
      topCategory: "Groceries",
      comparedToPrevious: {
        spentChange: 15.2,
        transactionChange: 5.4,
      },
    },
    "90d": {
      period: "90d",
      totalSpent: 8150.25,
      transactionCount: 92,
      averageTransaction: 88.59,
      topCategory: "Transportation",
      comparedToPrevious: {
        spentChange: 8.7,
        transactionChange: 2.1,
      },
    },
    "1y": {
      period: "1y",
      totalSpent: 15420.5,
      transactionCount: 184,
      averageTransaction: 83.81,
      topCategory: "Shopping",
      comparedToPrevious: {
        spentChange: 12.5,
        transactionChange: 4.8,
      },
    },
  };
