import type { PaginationType, SortBy, TransactionType } from "types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const TRANSACTIONS_QUERY_KEY = "transactions";

export const useTransactions = ({
  customerId,
  perPage = 20,
  page = 1,
  category,
  startDate,
  endDate,
  sortBy = "date_asc",
}: {
  customerId: string;
  page?: number;
  perPage?: number;
  category?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  sortBy?: SortBy;
}) => {
  return useQuery<{
    transactions: TransactionType[];
    pagination: PaginationType;
  }>({
    queryKey: [
      TRANSACTIONS_QUERY_KEY,
      customerId,
      perPage,
      page,
      category,
      startDate,
      endDate,
      sortBy,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("limit", String(perPage));
      params.set("offset", String(page - 1));
      if (category) params.set("category", category);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      params.set("sortBy", sortBy);

      const res = await fetch(
        `/api/customers/${customerId}/transactions?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      return res.json();
    },
    placeholderData: keepPreviousData,
  });
};
