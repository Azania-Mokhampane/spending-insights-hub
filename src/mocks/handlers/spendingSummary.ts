import type { Period } from "@/lib/types";
import { delay, http, HttpResponse } from "msw";
import { mockCustomerSpendingSummary } from "../data/customers";

export const spendingSummaryHandler = http.get(
  "/api/customers/:customerId/spending/summary",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);
    const period = (url.searchParams.get("period") ?? "30d") as Period;

    await delay(600);

    // simulate a non existing customer
    if (customerId === "0000") {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(mockCustomerSpendingSummary[period]);
  },
);
