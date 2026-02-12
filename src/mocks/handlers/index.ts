import { customerProfileHandler } from "./customerProfile";
import { monthlySpendingTrendsHandler } from "./montlySpendingTrends";
import { spendingSummaryHandler } from "./spendingSummary";

// here we register handlers
export const handlers = [
  customerProfileHandler,
  spendingSummaryHandler,
  monthlySpendingTrendsHandler,
];
