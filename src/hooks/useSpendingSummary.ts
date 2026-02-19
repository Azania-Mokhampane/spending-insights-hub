import type { Period, SpendingSummaryType } from "types";
import { useQuery } from "@tanstack/react-query";

export const SPENDING_SUMMARY_QUERY_KEY = "spending-summary";
export const useSpendingSummary = ({
  period,
  customerId,
}: {
  period: Period;
  customerId: string;
}) => {
  return useQuery<SpendingSummaryType>({
    queryKey: [SPENDING_SUMMARY_QUERY_KEY, period, customerId],
    queryFn: async () => {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }
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
