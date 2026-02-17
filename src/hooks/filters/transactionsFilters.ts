import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import type { SortBy } from "types";

const sortByParser = parseAsStringLiteral<SortBy>([
  "amount_asc",
  "amount_desc",
  "date_asc",
  "date_desc",
]);

export const usePerPageFilter = () =>
  useQueryState("perPage", parseAsInteger.withDefault(20));

export const usePageFilter = () =>
  useQueryState("page", parseAsInteger.withDefault(1));

export const useCategoryFilter = () => useQueryState("category", parseAsString);

export const useStartDateFilter = () =>
  useQueryState("startDate", parseAsString);

export const useEndDateFilter = () => useQueryState("endDate", parseAsString);

export const useSortByFilter = () =>
  useQueryState("sortBy", {
    defaultValue: "date_desc",
    parse: sortByParser.parse,
    serialize: sortByParser.serialize,
  });
