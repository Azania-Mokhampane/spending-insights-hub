import { http, HttpResponse, delay } from "msw";
import { mockCustomers } from "../data/customers";

export const customerProfileHandler = http.get(
  "/api/customers/:customerId/profile",
  async ({ params }) => {
    const { customerId } = params;

    // this simulates network latency
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

    return HttpResponse.json(customer);
  },
);
