import {
  usePerPageFilter,
  usePageFilter,
  useCategoryFilter,
  useStartDateFilter,
  useEndDateFilter,
  useSortByFilter,
} from "@/hooks/filters/transactionsFilters";
import { useEffect } from "react";

export const useTransactionFilters = () => {
  const [perPage, setPerPage] = usePerPageFilter();
  const [page, setPage] = usePageFilter();
  const [category, setCategory] = useCategoryFilter();
  const [startDate, setStartDate] = useStartDateFilter();
  const [endDate, setEndDate] = useEndDateFilter();
  const [sortBy, setSortBy] = useSortByFilter();

  useEffect(() => {
    setPage(1);
  }, [category, startDate, endDate, sortBy, setPage]);

  return {
    perPage,
    setPerPage,
    page,
    setPage,
    category,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy,
  };
};
