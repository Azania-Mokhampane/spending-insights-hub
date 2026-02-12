import { faker } from "@faker-js/faker";
import type { Period } from "@/lib/types";
import { delay, http, HttpResponse } from "msw";
import { mockCustomers } from "../data/customers";

const categoryOptions = [
  { name: "Groceries", color: "#FF6B6B", icon: "shopping-cart" },
  { name: "Entertainment", color: "#4ECDC4", icon: "film" },
  { name: "Transportation", color: "#45B7D1", icon: "car" },
  { name: "Dining", color: "#F7DC6F", icon: "utensils" },
  { name: "Shopping", color: "#BB8FCE", icon: "shopping-bag" },
  { name: "Utilities", color: "#85C1E9", icon: "zap" },
];

export const spendingByCategoryHandler = http.get(
  "/api/customers/:customerId/spending/categories",
  async ({ params, request }) => {
    const { customerId } = params;
    const url = new URL(request.url);
    const period = (url.searchParams.get("period") ?? "30d") as Period;
    const startDate = url.searchParams.get("startDate") || undefined;
    const endDate = url.searchParams.get("endDate") || undefined;

    await delay(600);

    if (!customerId) {
      return HttpResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    if (!mockCustomers.has(customerId as string)) {
      return HttpResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    // generate random category data
    const categories = categoryOptions.map((cat) => {
      const amount = faker.number.float({
        min: 200,
        max: 2000,
        fractionDigits: 2,
      });
      const transactionCount = faker.number.int({ min: 1, max: 20 });
      return { ...cat, amount, transactionCount, percentage: 0 };
    });

    const totalAmount = categories.reduce((sum, c) => sum + c.amount, 0);
    categories.forEach((c) => {
      c.percentage = Number(((c.amount / totalAmount) * 100).toFixed(1));
    });

    // default date range based on period
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

    return HttpResponse.json({
      dateRange: {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      },
      totalAmount: Number(totalAmount.toFixed(2)),
      categories,
    });
  },
);
