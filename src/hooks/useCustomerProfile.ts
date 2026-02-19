import type { CustomerProfileType } from "types";
import { useQuery } from "@tanstack/react-query";

export const CUSTOMER_PROFILE_QUERY_KEY = "customer-profile";

export const useCustomerProfile = (customerId: string) => {
  return useQuery<CustomerProfileType>({
    queryKey: [CUSTOMER_PROFILE_QUERY_KEY, customerId],
    queryFn: async () => {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }
      const res = await fetch(`/api/customers/${customerId}/profile`);

      if (!res.ok) {
        throw new Error("Failed to fetch customer profile");
      }

      return res.json();
    },
  });
};
