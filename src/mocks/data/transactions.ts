import { faker } from "@faker-js/faker";
import type { PaginationType, SortBy, TransactionType } from "types";
import { ALL_CATEGORIES } from "./categoriesAndFilters";

const paymentMethods = ["Credit Card", "Debit Card", "Debit Order"];

const merchants = [
  "Shoprite",
  "Pick n Pay",
  "Checkers",
  "Woolworths",
  "Spar",
  "Clicks",
  "Dis-Chem",
  "Takealot",
  "Makro",
  "Game",
  "Mr Price",
  "Pep",
  "KFC",
  "Nando's",
  "Steers",
  "Debonairs",
  "Uber Eats",
  "Bolt",
  "Engen",
  "Shell",
  "Netflix",
];

const generateTransactions = (count: number) =>
  Array.from({ length: count }).map(() => {
    const category = faker.helpers.arrayElement(ALL_CATEGORIES);

    return {
      id: `txn_${faker.string.numeric(6)}`,
      date: faker.date.recent({ days: 90 }).toISOString(),
      merchant: faker.helpers.arrayElement(merchants),
      category: category.name,
      amount: Number(faker.finance.amount({ min: 20, max: 2000, dec: 2 })),
      description: faker.commerce.productName(),
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      icon: category.icon,
      categoryColor: category.color,
    };
  });

type TransactionsParams = {
  limit?: number;
  offset?: number;
  category?: string | null;
  sortBy?: SortBy;
  startDate?: string | null;
  endDate?: string | null;
};

export const transactions = ({
  limit = 20,
  offset = 0,
  category,
  sortBy = "date_desc",
  startDate,
  endDate,
}: TransactionsParams): {
  transactions: TransactionType[];
  pagination: PaginationType;
} => {
  let data = generateTransactions(100);

  // category filter
  if (category) {
    data = data.filter((t) => t.category === category);
  }

  // filter by date range
  if (startDate) {
    const start = new Date(startDate);
    data = data.filter((t) => new Date(t.date) >= start);
  }
  if (endDate) {
    const end = new Date(endDate);
    data = data.filter((t) => new Date(t.date) <= end);
  }

  // date and amount sorting
  data.sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return +new Date(a.date) - +new Date(b.date);
      case "date_desc":
        return +new Date(b.date) - +new Date(a.date);
      case "amount_asc":
        return a.amount - b.amount;
      case "amount_desc":
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  const total = data.length;
  const paginated = data.slice(offset, offset + limit);

  return {
    transactions: paginated,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  };
};
