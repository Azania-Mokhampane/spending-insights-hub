import CustomerSummary from "@/components/dashboard/CustomerSummary";
import MonthlySpendingTrends from "@/components/dashboard/MonthlySpendingTrends";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { useMonthlyTrends } from "@/hooks/useMonthlyTrends";

import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import { useSpendingByCategory } from "@/hooks/useSpendingByCategory";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import { DASHBOARD_TRANSACTIONS_ROUTE, DASHBOARD_TRENDS_ROUTE } from "@/routes";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";
import { State } from "@/components/common/State";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/dashboard/overview/SectionHeader";

const OverviewPage = () => {
  const customerId = MOCK_CUSTOMER_ID;
  const { data: customer, isPending: isCustomerPending } =
    useCustomerProfile(customerId);
  const {
    data: spendingSummary,
    isPending: isSpendingSummaryPending,
    isError: isSpendingSummaryError,
  } = useSpendingSummary({
    period: "30d",
    customerId,
  });
  const {
    data: trends,
    isPending: isTrendsPending,
    isError: isTrendsError,
  } = useMonthlyTrends({ months: 12, customerId });
  const {
    data: spendingByCategory,
    isPending: isSpendingByCategoryPending,
    isError: isSpendingByCategoryError,
  } = useSpendingByCategory({
    customerId,
    period: "30d",
    startDate: null,
    endDate: null,
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <State
        isLoading={isCustomerPending}
        loadingComponent={
          <div className="flex flex-row gap-2">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-60 h-4" />
            </div>
          </div>
        }
      >
        {customer && <CustomerSummary customer={customer} />}
      </State>

      <div className="space-y-2">
        <SectionHeader
          title="Spending Summary"
          subtitle="Past 30 days"
          linkTo={DASHBOARD_TRANSACTIONS_ROUTE}
        />
        <State
          isLoading={isSpendingSummaryPending}
          loadingText="Loading spending summary"
          isError={isSpendingSummaryError}
        >
          {spendingSummary && (
            <SummaryCards spendingSummary={spendingSummary} />
          )}
        </State>
      </div>

      <div className="space-y-2">
        <SectionHeader
          title="Spending Trends"
          subtitle="Past 12 months"
          linkTo={DASHBOARD_TRENDS_ROUTE}
        />
        <State
          isLoading={isTrendsPending}
          loadingText="Loading monthly spending trends"
          isError={isTrendsError}
        >
          <MonthlySpendingTrends trends={trends?.trends || []} />
        </State>
      </div>

      <div className="space-y-2">
        <SectionHeader
          title="By Category"
          subtitle="Past 30 days"
          linkTo={DASHBOARD_TRENDS_ROUTE}
        />
        <State
          isLoading={isSpendingByCategoryPending}
          loadingText="Loading spending by category summary"
          isError={isSpendingByCategoryError}
        >
          {spendingByCategory && (
            <CategoryBreakdown spendingByCategory={spendingByCategory} />
          )}
        </State>
      </div>
    </div>
  );
};

export default OverviewPage;
