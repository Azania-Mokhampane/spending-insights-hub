import type { Period, SpendingSummaryType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const CUSTOMER_SPENDING_SUMMARY_QUERY_KEY = "customer-spending-summary";
export const useCustomerSpendingSummary = ({
  period,
  customerId,
}: {
  period: Period;
  customerId: string;
}) => {
  return useQuery<SpendingSummaryType>({
    queryKey: [CUSTOMER_SPENDING_SUMMARY_QUERY_KEY, period, customerId],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/spending/summary?period=${period}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch filtered customer spending summary");
      }
      return res.json();
    },
  });
};
