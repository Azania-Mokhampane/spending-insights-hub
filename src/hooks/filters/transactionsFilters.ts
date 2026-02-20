import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsIsoDate,
} from "nuqs";
import type { DateRangePresetType, TransactionsSortBy } from "types";

const FALLBACK_DEFAULT = "30d";

const sortByParser = parseAsStringLiteral<TransactionsSortBy>([
  "amount_asc",
  "amount_desc",
  "date_asc",
  "date_desc",
]);

export const usePerPageFilter = () =>
  useQueryState("perPage", parseAsInteger.withDefault(20));

export const usePageFilter = () =>
  useQueryState("page", parseAsInteger.withDefault(1));

export const useCategoryFilter = () =>
  useQueryState("category", parseAsString.withDefault("all"));

export const useStartDateFilter = () =>
  useQueryState("startDate", parseAsIsoDate);

export const useEndDateFilter = () => useQueryState("endDate", parseAsIsoDate);

export const useSortByFilter = () =>
  useQueryState("sortBy", {
    defaultValue: "date_desc",
    parse: sortByParser.parse,
    serialize: sortByParser.serialize,
  });

export const useMonthRangeFilter = () =>
  useQueryState("monthRange", parseAsInteger.withDefault(12));

export const usePeriodFilter = (presets?: DateRangePresetType[]) => {
  const defaultPeriod =
    presets?.find((p) => p.value === "30d")?.value ??
    presets?.[0]?.value ??
    FALLBACK_DEFAULT;

  return useQueryState("period", parseAsString.withDefault(defaultPeriod));
};
