export type CustomerProfileType = {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: "basic" | "premium";
  totalSpent: number;
  currency: string;
};

export type Period = "7d" | "30d" | "90d" | "1y";

export type SpendingSummaryType = {
  period: Period;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;
    transactionChange: number;
  };
};

export type MonthlySpendingTrendType = {
  month: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
};
