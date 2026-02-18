import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";

export const customerProfileHandler = http.get(
  "/api/customers/:customerId/profile",
  async ({ params }) => {
    const { customerId } = params;

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

    return HttpResponse.json(mockCustomers.get(customerId as string));
  },
);
