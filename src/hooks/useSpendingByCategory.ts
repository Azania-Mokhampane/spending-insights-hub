import type { SpendingByCategoryType } from "types";
import { useQuery } from "@tanstack/react-query";
import { formatToISODate } from "@/helpers/dateUtils";

export const SPENDING_BY_CATEGORY_QUERY_KEY = "spending-by-category";

export const useSpendingByCategory = ({
  customerId,
  period,
  startDate,
  endDate,
}: {
  customerId: string;
  period: string;
  startDate?: Date | null;
  endDate?: Date | null;
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
      const params = new URLSearchParams();
      if (startDate) params.set("startDate", formatToISODate(startDate));
      if (endDate) params.set("endDate", formatToISODate(endDate));
      params.set("period", period);

      if (!customerId) {
        throw new Error("Customer ID is required");
      }

      const res = await fetch(
        `/api/customers/${customerId}/spending/categories?${params.toString()}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch spendings by category");
      }
      return res.json();
    },
  });
};
