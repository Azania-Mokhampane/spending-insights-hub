import { faker } from "@faker-js/faker";
import type { CustomerProfileType } from "types";

export const MOCK_CUSTOMER_ID = "12345";

export const mockCustomers = new Map<string, CustomerProfileType>();

mockCustomers.set(MOCK_CUSTOMER_ID, {
  customerId: MOCK_CUSTOMER_ID,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  joinDate: faker.date.past({ years: 3 }).toISOString().slice(0, 10),
  accountType: faker.helpers.arrayElement(["basic", "premium"]),
  totalSpent: Number(faker.finance.amount({ min: 15000, max: 50000, dec: 2 })),
  currency: "ZAR",
});
