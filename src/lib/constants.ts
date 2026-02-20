import {
  Car,
  Film,
  GraduationCap,
  Heart,
  Home,
  Plane,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Utensils,
  Zap,
} from "lucide-react";
import type { MonthRange, TransactionsSortBy } from "types";

export const ICON_PRESETS = {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
  Home,
  Heart,
  Shirt,
  Plane,
  GraduationCap,
  Smartphone,
} as const;

export const TRANSACTION_SORT_LABELS: Record<TransactionsSortBy, string> = {
  date_desc: "Newest first",
  date_asc: "Oldest first",
  amount_desc: "Highest amount",
  amount_asc: "Lowest amount",
};

export const MONTH_RANGE_OPTIONS: MonthRange[] = [6, 12, 24];
