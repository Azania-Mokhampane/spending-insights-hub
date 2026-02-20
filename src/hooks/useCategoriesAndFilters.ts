import type { CategoryType, DateRangePresetType } from "types";
import { useQuery } from "@tanstack/react-query";

export const CATEGORIES_AND_FILTERS_QUERY_KEY = "categories-and-filters";

interface CategoriesAndFiltersResponse {
  categories: CategoryType[];
  dateRangePresets: DateRangePresetType[];
}

const fetchCategoriesAndFilters = async (
  customerId: string,
): Promise<CategoriesAndFiltersResponse> => {
  if (!customerId) {
    throw new Error("Customer ID is required");
  }

  const res = await fetch(`/api/customers/${customerId}/filters`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories and filters");
  }

  return res.json();
};

export const useCategories = (customerId: string) => {
  return useQuery({
    queryKey: [CATEGORIES_AND_FILTERS_QUERY_KEY, customerId],
    queryFn: () => fetchCategoriesAndFilters(customerId),
    select: (data) => data.categories,
  });
};

export const useDateRangePresets = (customerId: string) => {
  return useQuery({
    queryKey: [CATEGORIES_AND_FILTERS_QUERY_KEY, customerId],
    queryFn: () => fetchCategoriesAndFilters(customerId),
    select: (data) => data.dateRangePresets,
  });
};
