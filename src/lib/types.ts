export type CustomerProfile = {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: "basic" | "premium";
  totalSpent: number;
  currency: string;
};
