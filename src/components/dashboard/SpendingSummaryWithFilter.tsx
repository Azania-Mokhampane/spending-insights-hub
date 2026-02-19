import SummaryCards from "./SummaryCards";
import { usePeriodSearchParams } from "@/hooks/filters/usePeriodSearchParams";
import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import PeriodFilter from "./PeriodFilter";
import { State } from "../ui/state";

interface ISpendingSummaryWithFilterProps {
  customerId: string;
}

const SpendingSummaryWithFilter = ({
  customerId,
}: ISpendingSummaryWithFilterProps) => {
  const [period, setPeriod] = usePeriodSearchParams();
  const { data, isPending, isError } = useSpendingSummary({
    period,
    customerId,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3 justify-end">
        <PeriodFilter
          disabled={isPending}
          ariaLabel="Summary period filter select"
          period={period}
          setPeriod={setPeriod}
        />
      </div>
      <State isLoading={isPending} isError={isError}>
        {data && <SummaryCards spendingSummary={data} />}
      </State>
    </div>
  );
};

export default SpendingSummaryWithFilter;
