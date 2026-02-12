import type { CustomerProfile } from "@/lib/types";

export const mockCustomers: Record<string, CustomerProfile> = {
  "12345": {
    customerId: "12345",
    name: "John Doe",
    email: "john.doe@email.com",
    joinDate: "2023-01-15",
    accountType: "premium",
    totalSpent: 15420.5,
    currency: "ZAR",
  },
};
