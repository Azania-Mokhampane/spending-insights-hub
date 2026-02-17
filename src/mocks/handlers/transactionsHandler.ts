import type { TransactionsSortBy } from "types";
import { delay, http, HttpResponse } from "msw";
import { transactions } from "../data/transactions";
import { mockCustomers } from "../data/customers";

export const transactionsHandler = http.get(
  "/api/customers/:customerId/transactions",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);

    const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 100);
    const offset = Number(url.searchParams.get("offset")) || 0;
    const category = url.searchParams.get("category");
    const sortBy = url.searchParams.get("sortBy") as TransactionsSortBy;
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    await delay(600);

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    const result = transactions({
      limit,
      offset,
      category,
      sortBy,
      startDate,
      endDate,
    });

    return HttpResponse.json(result);
  },
);
