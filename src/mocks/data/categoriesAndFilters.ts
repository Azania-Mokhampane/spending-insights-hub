import type { CategoryType, DateRangePresetType } from "types";

export const ALL_CATEGORIES = [
  { name: "Groceries", color: "#FF6B6B", icon: "ShoppingCart" },
  { name: "Entertainment", color: "#4ECDC4", icon: "Film" },
  { name: "Transportation", color: "#45B7D1", icon: "Car" },
  { name: "Dining", color: "#F7DC6F", icon: "Utensils" },
  { name: "Shopping", color: "#BB8FCE", icon: "ShoppingBag" },
  { name: "Utilities", color: "#85C1E9", icon: "Zap" },
  { name: "Home", color: "#F39C12", icon: "Home" },
  { name: "Health", color: "#E74C3C", icon: "Heart" },
  { name: "Clothing", color: "#8E44AD", icon: "Shirt" },
  { name: "Travel", color: "#3498DB", icon: "Plane" },
  { name: "Education", color: "#2ECC71", icon: "GraduationCap" },
  { name: "Mobile", color: "#1ABC9C", icon: "Smartphone" },
];

export const categoriesAndFilters = (): {
  categories: CategoryType[];
  dateRangePresets: DateRangePresetType[];
} => {
  const categories = ALL_CATEGORIES;
  //   const categories: CategoryType[] = [];

  return {
    categories,
    dateRangePresets: [
      { label: "Last 7 days", value: "7d" },
      { label: "Last 30 days", value: "30d" },
      { label: "Last 90 days", value: "90d" },
      { label: "Last year", value: "1y" },
    ],
  };
};
