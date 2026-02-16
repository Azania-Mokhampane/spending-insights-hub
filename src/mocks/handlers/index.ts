import { customerProfileHandler } from "./customerProfileHandler";
import { spendingSummaryHandler } from "./spendingSummaryHandler";
import { spendingByCategoryHandler } from "./spendingByCategoryHandler";
import { monthlySpendingTrendsHandler } from "./montlySpendingTrendsHandler";
import { budgetGoalsHandler } from "./budgetGoalsHandler";

// register handlers
export const handlers = [
  customerProfileHandler,
  spendingSummaryHandler,
  monthlySpendingTrendsHandler,
  spendingByCategoryHandler,
  budgetGoalsHandler,
];
