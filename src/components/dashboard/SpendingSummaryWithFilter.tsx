import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { periodNames } from "@/lib/constants";
import SummaryCards from "./SummaryCards";
import { usePeriodSearchParams } from "@/hooks/filters/usePeriodSearchParams";
import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import type { Period } from "types";

interface ISpendingSummaryWithFilterProps {
  customerId: string;
}

const SpendingSummaryWithFilter = ({
  customerId,
}: ISpendingSummaryWithFilterProps) => {
  const [period, setPeriod] = usePeriodSearchParams();
  const { data: spendingSummary } = useSpendingSummary({
    period,
    customerId,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3 justify-end">
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
      {spendingSummary && <SummaryCards spendingSummary={spendingSummary} />}
    </div>
  );
};

export default SpendingSummaryWithFilter;
