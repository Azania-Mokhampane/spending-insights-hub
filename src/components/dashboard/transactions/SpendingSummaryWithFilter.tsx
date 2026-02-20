import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import PeriodFilter from "../PeriodFilter";
import { State } from "@/components/common/State";
import SummaryCards from "../SummaryCards";
import { usePeriodFilter } from "@/hooks/filters/transactionsFilters";
import { useDateRangePresets } from "@/hooks/useCategoriesAndFilters";

interface ISpendingSummaryWithFilterProps {
  customerId: string;
}

const SpendingSummaryWithFilter = ({
  customerId,
}: ISpendingSummaryWithFilterProps) => {
  const [period, setPeriod] = usePeriodFilter();
  const { data, isPending, isError } = useSpendingSummary({
    period,
    customerId,
  });
  const { data: dateRangePresets } = useDateRangePresets(customerId);
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3 justify-end">
        <PeriodFilter
          disabled={isPending}
          ariaLabel="Summary period filter select"
          period={period}
          setPeriod={setPeriod}
          dateRangePresets={dateRangePresets || []}
        />
      </div>
      <State isLoading={isPending} isError={isError}>
        {data && <SummaryCards spendingSummary={data} />}
      </State>
    </div>
  );
};

export default SpendingSummaryWithFilter;
