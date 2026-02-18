import CustomerSummary from "@/components/dashboard/CustomerSummary";
import MonthlySpendingTrends from "@/components/dashboard/MonthlySpendingTrends";
import SectionHeader from "@/components/dashboard/SectionHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { useMonthlyTrends } from "@/hooks/useMonthlyTrends";

import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import { useSpendingByCategory } from "@/hooks/useSpendingByCategory";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import { DASHBOARD_TRANSACTIONS_ROUTE, DASHBOARD_TRENDS_ROUTE } from "@/routes";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";

const Overview = () => {
  const customerId = MOCK_CUSTOMER_ID;
  const { data: customer } = useCustomerProfile(customerId);
  const { data: spendingSummary } = useSpendingSummary({
    period: "30d", // showing just for the past 30 days for overview then filters will apply for a more detailed view
    customerId,
  });
  const { data: trends } = useMonthlyTrends({ months: 12, customerId });
  const { data: spendingByCategory } = useSpendingByCategory({
    customerId,
    period: "30d",
    startDate: "",
    endDate: "",
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* TODO: add error and loading state */}
      {customer && <CustomerSummary customer={customer} />}

      {/* TODO: add error and loading state */}
      <div className="space-y-2">
        <SectionHeader
          title="Spending Summary"
          subtitle="Past 30 days"
          linkTo={DASHBOARD_TRANSACTIONS_ROUTE}
        />
        {spendingSummary && <SummaryCards spendingSummary={spendingSummary} />}
      </div>

      {/* TODO: add error and loading state */}
      <div className="space-y-2">
        <SectionHeader
          title="Spending Trends"
          subtitle="Past 12 months"
          linkTo={DASHBOARD_TRENDS_ROUTE}
        />
        <MonthlySpendingTrends trends={trends?.trends || []} />
      </div>

      {/* TODO: add error and loading state */}
      <div className="space-y-2">
        <SectionHeader
          title="By Category"
          subtitle="Past 30 days"
          linkTo={DASHBOARD_TRENDS_ROUTE}
        />
        {spendingByCategory && (
          <CategoryBreakdown spendingByCategory={spendingByCategory} />
        )}
      </div>
    </div>
  );
};

export default Overview;
