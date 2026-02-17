import type { BudgetGoal, GoalStatusType } from "types";
import { faker } from "@faker-js/faker";
import { ALL_CATEGORIES } from "./categoriesAndFilters";

const getStatus = (percentage: number): GoalStatusType => {
  if (percentage < 70) return "on_track";
  if (percentage < 95) return "warning";
  return "exceeded";
};

const getDaysRemainingInMonth = () => {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return end.getDate() - now.getDate();
};

export const budgetGoals = (): BudgetGoal[] => {
  const daysRemaining = getDaysRemainingInMonth();

  const goals = faker.helpers
    .arrayElements(ALL_CATEGORIES, { min: 2, max: 5 })
    .map((category, index) => {
      const monthlyBudget = faker.number.float({
        min: 500,
        max: 3000,
        fractionDigits: 2,
      });

      const currentSpent = faker.number.float({
        min: 0,
        max: monthlyBudget * 1.1, // can slightly exceed
        fractionDigits: 2,
      });

      const percentageUsed = Number(
        ((currentSpent / monthlyBudget) * 100).toFixed(2),
      );

      return {
        id: `goal_${index + 1}`.padStart(8, "0"),
        category: category.name,
        monthlyBudget,
        currentSpent,
        percentageUsed,
        daysRemaining,
        status: getStatus(percentageUsed),
      };
    });

  return goals;
};
