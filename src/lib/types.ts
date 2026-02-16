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

export type CategoryType = {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
};

export type SpendingByCategoryType = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: CategoryType[];
};

export type GoalStatusType = "on_track" | "warning" | "exceeded";

export type BudgetGoal = {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: GoalStatusType;
};
