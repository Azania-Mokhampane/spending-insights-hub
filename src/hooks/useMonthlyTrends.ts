import type { MonthlySpendingTrendType } from "types";
import { useQuery } from "@tanstack/react-query";

export const MONTHLY_TRENDS_QUERY_KEY = "monthly-trends";

export const useMonthlyTrends = ({
  months,
  customerId,
}: {
  months: number;
  customerId: string;
}) => {
  return useQuery<{ trends: MonthlySpendingTrendType[] }>({
    queryKey: [MONTHLY_TRENDS_QUERY_KEY, months, customerId],
    queryFn: async () => {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }
      const res = await fetch(
        `/api/customers/${customerId}/spending/trends?months=${months}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch customer monthly spending trends");
      }
      return res.json();
    },
  });
};
