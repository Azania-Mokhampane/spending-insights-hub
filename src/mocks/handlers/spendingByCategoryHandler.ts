import type { Period } from "@/lib/types";
import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";
import { spendingByCategory } from "../data/spendingByCategory";

export const spendingByCategoryHandler = http.get(
  "/api/customers/:customerId/spending/categories",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);
    const period = (url.searchParams.get("period") ?? "30d") as Period;
    const startDate = url.searchParams.get("startDate") || undefined;
    const endDate = url.searchParams.get("endDate") || undefined;

    await delay(600);

    if (!customerId) {
      return HttpResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }
    const data = spendingByCategory({ period, startDate, endDate });

    return HttpResponse.json(data);
  },
);
