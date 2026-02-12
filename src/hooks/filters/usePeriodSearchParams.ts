import type { Period } from "@/lib/types";
import { parseAsStringLiteral, useQueryState } from "nuqs";

const periodParser = parseAsStringLiteral<Period>(["7d", "30d", "90d", "1y"]);

export const usePeriodSearchParams = () =>
  useQueryState("period", {
    defaultValue: "30d",
    parse: periodParser.parse,
    serialize: periodParser.serialize,
  });
