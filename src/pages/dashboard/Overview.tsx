import CustomerSummary from "@/components/dashboard/CustomerSummary";
import MonthlySpendingTrends from "@/components/dashboard/MonthlySpendingTrends";
import SectionHeader from "@/components/dashboard/SectionHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { useCustomerMonthlyTrends } from "@/hooks/useCustomerMonthlyTrends";

import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useCustomerSpendingSummary } from "@/hooks/useCustomerSpendingSummary";

const Overview = () => {
  const customerId = "12345";
  const { data: customer } = useCustomerProfile(customerId);
  const { data: spendingSummary } = useCustomerSpendingSummary({
    period: "30d", // showing just for the past 30 days for overview then filters will apply for a more detailed view
    customerId,
  });
  const { data: trends } = useCustomerMonthlyTrends({ months: 12, customerId });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* TODO: add error and loading state */}
      {customer && <CustomerSummary customer={customer} />}
      {/* this will go where we have filters
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-40 h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(periodNames).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      {/* TODO: add error and loading state */}
      <div className="space-y-2">
        <SectionHeader
          title="Spending Summary"
          subtitle="Past 30 days"
          linkTo="/dashboard/transactions"
        />
        {spendingSummary && <SummaryCards spendingSummary={spendingSummary} />}
      </div>

      {/* TODO: add error and loading state */}
      <div className="space-y-2">
        <SectionHeader
          title="Spending Trends"
          subtitle="Past 12 months"
          linkTo="/dashboard/trends"
        />
        <MonthlySpendingTrends trends={trends?.trends || []} />
      </div>

      <div className="space-y-2">
        <SectionHeader
          title="By Category"
          subtitle="Past 30 days"
          linkTo="/dashboard/trends"
        />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SpendingTrends trends={trends.slice(-6)} />
        </div>
        <div className="lg:col-span-2">
          <CategoryBreakdown categories={categories} />
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
