import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";
import type { Period } from "types";
import { customerSpendingSummary } from "../data/customerSpendingSummary";

export const spendingSummaryHandler = http.get(
  "/api/customers/:customerId/spending/summary",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);
    const period = (url.searchParams.get("period") ?? "30d") as Period;

    await delay(600);

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(customerSpendingSummary(period));
  },
);
