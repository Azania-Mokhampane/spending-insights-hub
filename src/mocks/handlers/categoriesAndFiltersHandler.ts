import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";
import { categoriesAndFilters } from "../data/categoriesAndFilters";

export const categoriesAndFiltersHandler = http.get(
  "/api/customers/:customerId/filters",
  async ({ params }) => {
    const { customerId } = params;

    await delay(200);

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(categoriesAndFilters());
  },
);
