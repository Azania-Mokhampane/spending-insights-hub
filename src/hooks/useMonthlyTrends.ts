import type { MonthlySpendingTrendType } from "@/lib/types";
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
      const res = await fetch(
        `/api/customers/${customerId}/spending/trends?months=${months}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch customer monthly spending trends");
      }
      return res.json();
    },
    staleTime: "static",
  });
};
