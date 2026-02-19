import { periodNames } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Period } from "types";

interface IPeriodFilterProps {
  period: Period;
  setPeriod: (period: Period) => void;
  ariaLabel?: string;
  disabled?: boolean;
}

const PeriodFilter = ({
  period,
  setPeriod,
  ariaLabel,
  disabled,
}: IPeriodFilterProps) => {
  return (
    <Select
      value={period}
      onValueChange={(value) => setPeriod(value as Period)}
      disabled={disabled}
    >
      <SelectTrigger
        className="w-40 h-9 text-sm"
        aria-label={ariaLabel ?? "Period filter select"}
      >
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
  );
};

export default PeriodFilter;
