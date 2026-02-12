import CustomerSummary from "@/components/dashboard/CustomerSummary";
import SummaryCards from "@/components/dashboard/SummaryCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePeriodSearchParams } from "@/hooks/filters/usePeriodSearchParams";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useCustomerSpendingSummary } from "@/hooks/useCustomerSpendingSummary";
import { periodNames } from "@/lib/constants";
import type { Period } from "@/lib/types";

const Overview = () => {
  const [period, setPeriod] = usePeriodSearchParams();
  const customerId = "12345";
  const { data: customer } = useCustomerProfile(customerId);
  const { data: spendingSummary } = useCustomerSpendingSummary({
    period,
    customerId,
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* TODO: add error and loading state */}
        {customer && <CustomerSummary customer={customer} />}

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
        </Select>
      </div>
      {/* TODO: add error and loading state */}
      {spendingSummary && <SummaryCards spendingSummary={spendingSummary} />}
    </div>
  );
};

export default Overview;
