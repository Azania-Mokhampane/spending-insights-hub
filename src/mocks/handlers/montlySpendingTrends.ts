import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";
import { customerMonthlySpendingTrends } from "../data/customerMonthlySpendingTrends";

export const monthlySpendingTrendsHandler = http.get(
  "/api/customers/:customerId/spending/trends",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);
    const monthsParam = Number(url.searchParams.get("months"));
    const months = Math.min(Math.max(monthsParam || 12, 1), 24); // default 12, max 24

    await delay(600);

    if (!customerId) {
      return HttpResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    const customer = mockCustomers[customerId as string];

    if (!customer) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }
    const trends = customerMonthlySpendingTrends(months);

    return HttpResponse.json({ trends });
  },
);
