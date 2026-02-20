import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import DatePresetFilter from "../DatePresetFilter";
import { State } from "@/components/common/State";
import SummaryCards from "../SummaryCards";
import { useDatePresetFilter } from "@/hooks/filters/transactionsFilters";
import { useDateRangePresets } from "@/hooks/useCategoriesAndFilters";

interface ISpendingSummaryWithFilterProps {
  customerId: string;
}

const SpendingSummaryWithFilter = ({
  customerId,
}: ISpendingSummaryWithFilterProps) => {
  const [datePreset, setDatePreset] = useDatePresetFilter();
  const { data, isPending, isError } = useSpendingSummary({
    datePreset,
    customerId,
  });
  const { data: dateRangePresets } = useDateRangePresets(customerId);
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3 justify-end">
        <DatePresetFilter
          disabled={isPending}
          ariaLabel="Summary period filter select"
          datePreset={datePreset}
          setDatePreset={setDatePreset}
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
