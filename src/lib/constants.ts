import {
  Car,
  Film,
  ShoppingBag,
  ShoppingCart,
  Utensils,
  Zap,
} from "lucide-react";
import type { Period } from "./types";

export const periodNames: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "1y": "Last year",
};

export const ICON_PRESETS = {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
} as const;
