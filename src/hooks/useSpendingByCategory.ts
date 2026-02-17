import type { Period, SpendingByCategoryType } from "types";
import { useQuery } from "@tanstack/react-query";

export const SPENDING_BY_CATEGORY_QUERY_KEY = "spending-by-category";

export const useSpendingByCategory = ({
  customerId,
  period,
  startDate,
  endDate,
}: {
  customerId: string;
  period: Period;
  startDate: string;
  endDate: string;
}) => {
  return useQuery<SpendingByCategoryType>({
    queryKey: [
      SPENDING_BY_CATEGORY_QUERY_KEY,
      customerId,
      period,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/spending/categories?period=${period}&startDate=${startDate}&endDate=${endDate}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch spendings by category");
      }
      return res.json();
    },
  });
};
