import type { BudgetGoal } from "types";
import { useQuery } from "@tanstack/react-query";

export const BUDGET_GOALS_QUERY_KEY = "budget-goals";

export const useBudgetGoals = (customerId: string) => {
  return useQuery<{ goals: BudgetGoal[] }>({
    queryKey: [BUDGET_GOALS_QUERY_KEY, customerId],
    queryFn: async () => {
      const res = await fetch(`/api/customers/${customerId}/goals`);
      if (!res.ok) {
        throw new Error("Failed to fetch customer budget goals");
      }
      return res.json();
    },
  });
};
