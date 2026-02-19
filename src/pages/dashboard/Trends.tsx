import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import DateRangeFilters from "@/components/dashboard/DateRangeFilters";
import MonthlySpendingTrends from "@/components/dashboard/MonthlySpendingTrends";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import PageHeader from "@/components/ui/page-header";
import { State } from "@/components/ui/state";

import {
  useEndDateFilter,
  useMonthRangeFilter,
  useStartDateFilter,
} from "@/hooks/filters/transactionsFilters";
import { usePeriodSearchParams } from "@/hooks/filters/usePeriodSearchParams";
import { useMonthlyTrends } from "@/hooks/useMonthlyTrends";
import { useSpendingByCategory } from "@/hooks/useSpendingByCategory";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";

const TrendsPage = () => {
  const customerId = MOCK_CUSTOMER_ID;

  const [monthRange, setMonthRange] = useMonthRangeFilter();
  const [period, setPeriod] = usePeriodSearchParams();
  const [startDate, setStartDate] = useStartDateFilter();
  const [endDate, setEndDate] = useEndDateFilter();
  const {
    data: trends,
    isPending: isTrendsPending,
    isError: isTrendsError,
  } = useMonthlyTrends({
    months: monthRange,
    customerId,
  });
  const {
    data: spendingByCategory,
    isPending: isSpendingByCategoryPending,
    isError: isSpendingByCategoryError,
  } = useSpendingByCategory({
    customerId,
    period,
    startDate,
    endDate,
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <PageHeader
        title="Trends & Analysis"
        caption="Visualize your spending patterns and category distribution"
      />
      <div className="flex flex-col gap-8">
        <State
          isLoading={isTrendsPending}
          loadingText="Loading monthly spending trends"
          isError={isTrendsError}
          isEmpty={trends?.trends.length === 0}
        >
          <MonthlySpendingTrends
            trends={trends?.trends || []}
            monthRange={monthRange}
            setMonthRange={setMonthRange}
          />
        </State>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <PeriodFilter
              disabled={isSpendingByCategoryPending}
              ariaLabel="Spending by category period filter"
              period={period}
              setPeriod={setPeriod}
            />
            <DateRangeFilters
              disabled={isSpendingByCategoryPending}
              endDate={endDate}
              setEndDate={setEndDate}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <State
            isLoading={isSpendingByCategoryPending}
            loadingText="Loading spending by category"
            isError={isSpendingByCategoryError}
          >
            {spendingByCategory && (
              <CategoryBreakdown spendingByCategory={spendingByCategory} />
            )}
          </State>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;
