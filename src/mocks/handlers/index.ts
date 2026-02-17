import { customerProfileHandler } from "./customerProfileHandler";
import { spendingSummaryHandler } from "./spendingSummaryHandler";
import { spendingByCategoryHandler } from "./spendingByCategoryHandler";
import { monthlySpendingTrendsHandler } from "./montlySpendingTrendsHandler";
import { budgetGoalsHandler } from "./budgetGoalsHandler";
import { transactionsHandler } from "./transactionsHandler";
import { categoriesAndFiltersHandler } from "./categoriesAndFiltersHandler";

// register handlers
export const handlers = [
  customerProfileHandler,
  spendingSummaryHandler,
  monthlySpendingTrendsHandler,
  spendingByCategoryHandler,
  budgetGoalsHandler,
  transactionsHandler,
  categoriesAndFiltersHandler,
];
