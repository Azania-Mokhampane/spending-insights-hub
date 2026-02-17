import type {
  PaginationType,
  TransactionsSortBy,
  TransactionType,
} from "types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { formatToISODate } from "@/helpers/dateUtils";

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
  page: number;
  perPage: number;
  category?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  sortBy?: TransactionsSortBy;
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
      params.set("offset", String((page - 1) * perPage));
      if (category) params.set("category", category);
      if (startDate) params.set("startDate", formatToISODate(startDate));
      if (endDate) params.set("endDate", formatToISODate(endDate));
      params.set("sortBy", sortBy);

      if (!customerId) {
        throw new Error("Customer ID is required");
      }

      const res = await fetch(
        `/api/customers/${customerId}/transactions?${params.toString()}`,
      );

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(
          errorMessage?.message || "Failed to fetch transactions",
        );
      }

      return res.json();
    },
    placeholderData: keepPreviousData,
  });
};
