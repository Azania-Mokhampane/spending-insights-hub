export const formatCurrency = (
  amount: number,
  locale = "en-ZA",
  currency = "ZAR",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
