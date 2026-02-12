import { faker } from "@faker-js/faker";
import type { Period } from "@/lib/types";

export type CategoryBreakdownType = {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
};

export type SpendingByCategoryType = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: CategoryBreakdownType[];
};

// example colors & icons for categories
const categoryOptions = [
  { name: "Groceries", color: "#FF6B6B", icon: "shopping-cart" },
  { name: "Entertainment", color: "#4ECDC4", icon: "film" },
  { name: "Transportation", color: "#45B7D1", icon: "car" },
  { name: "Dining", color: "#F7DC6F", icon: "utensils" },
  { name: "Shopping", color: "#BB8FCE", icon: "shopping-bag" },
  { name: "Utilities", color: "#85C1E9", icon: "zap" },
];

// customerId -> period -> SpendingByCategoryType
const customerCategoryStore = new Map<
  string,
  Map<Period, SpendingByCategoryType>
>();

// generate random breakdown
const generateSpendingByCategory = (
  period: Period,
  startDate?: string,
  endDate?: string,
): SpendingByCategoryType => {
  const categories = categoryOptions.map((cat) => {
    const amount = faker.number.float({
      min: 200,
      max: 2000,
      fractionDigits: 2,
    });
    const transactionCount = faker.number.int({ min: 1, max: 20 });
    return { ...cat, amount, transactionCount, percentage: 0 }; // percentage will fix later
  });

  const totalAmount = categories.reduce((sum, c) => sum + c.amount, 0);

  // fix percentages
  categories.forEach((c) => {
    c.percentage = Number(((c.amount / totalAmount) * 100).toFixed(1));
  });

  // default date range based on period if not provided
  const end = endDate ? new Date(endDate) : new Date();
  const start = startDate
    ? new Date(startDate)
    : (() => {
        const d = new Date(end);
        switch (period) {
          case "7d":
            d.setDate(d.getDate() - 7);
            break;
          case "30d":
            d.setMonth(d.getMonth() - 1);
            break;
          case "90d":
            d.setMonth(d.getMonth() - 3);
            break;
          case "1y":
            d.setFullYear(d.getFullYear() - 1);
            break;
        }
        return d;
      })();

  return {
    dateRange: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    },
    totalAmount: Number(totalAmount.toFixed(2)),
    categories,
  };
};

export const getCustomerSpendingByCategory = (
  customerId: string,
  period: Period,
  startDate?: string,
  endDate?: string,
): SpendingByCategoryType => {
  if (!customerCategoryStore.has(customerId)) {
    customerCategoryStore.set(customerId, new Map());
  }

  const customerMap = customerCategoryStore.get(customerId)!;

  // for simplicity, store by period only
  if (!customerMap.has(period)) {
    customerMap.set(
      period,
      generateSpendingByCategory(period, startDate, endDate),
    );
  }

  return customerMap.get(period)!;
};
