import type { CategoryType, DateRangePresetType } from "types";
import { useQuery } from "@tanstack/react-query";

export const CATEGORIES_AND_FILTERS_QUERY_KEY = "categories-and-filters";

export const useCategoriesAndFilters = (customerId: string) => {
  return useQuery<{
    categories: CategoryType[];
    dateRangePresets: DateRangePresetType[];
  }>({
    queryKey: [CATEGORIES_AND_FILTERS_QUERY_KEY, customerId],
    queryFn: async () => {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }
      const res = await fetch(`/api/customers/${customerId}/filters`);
      if (!res.ok) {
        throw new Error("Failed to fetch categories and filters");
      }

      return res.json();
    },
  });
};
