import type { Period, SpendingSummaryType } from "types";
import { faker } from "@faker-js/faker";
import { ALL_CATEGORIES } from "./categoriesAndFilters";

const periodMultiplier: Record<Period, number> = {
  "7d": 1,
  "30d": 4,
  "90d": 12,
  "1y": 48,
};

const categories = ALL_CATEGORIES.map((category) => category.name);

export const customerSpendingSummary = (
  period: Period,
): SpendingSummaryType => {
  const multiplier = periodMultiplier[period];

  const transactionCount = faker.number.int({
    min: 5 * multiplier,
    max: 15 * multiplier,
  });

  const averageTransaction = faker.number.float({
    min: 50,
    max: 500,
    fractionDigits: 2,
  });

  const totalSpent = Number((transactionCount * averageTransaction).toFixed(2));

  return {
    period,
    totalSpent,
    transactionCount,
    averageTransaction: Number(averageTransaction.toFixed(2)),
    topCategory: faker.helpers.arrayElement(categories),
    comparedToPrevious: {
      spentChange: faker.number.float({
        min: -20,
        max: 25,
        fractionDigits: 1,
      }),
      transactionChange: faker.number.float({
        min: -15,
        max: 20,
        fractionDigits: 1,
      }),
    },
  };
};
