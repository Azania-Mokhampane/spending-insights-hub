import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";
import { budgetGoals } from "../data/budgetGoals";

export const budgetGoalsHandler = http.get(
  "/api/customers/:customerId/goals",
  async ({ params }) => {
    const { customerId } = params;

    await delay(600);

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    const goals = budgetGoals();

    return HttpResponse.json({ goals });
  },
);
