import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { DateRangePresetType } from "types";

interface IPeriodFilterProps {
  period: string;
  setPeriod: (period: string) => void;
  ariaLabel?: string;
  disabled?: boolean;
  dateRangePresets: DateRangePresetType[];
}

const PeriodFilter = ({
  period,
  setPeriod,
  ariaLabel,
  disabled,
  dateRangePresets,
}: IPeriodFilterProps) => {
  return (
    <Select
      value={period}
      onValueChange={(value) => setPeriod(value)}
      disabled={disabled}
    >
      <SelectTrigger
        className="w-40 h-9 text-sm"
        aria-label={ariaLabel ?? "Period filter select"}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {dateRangePresets.map((preset) => (
          <SelectItem key={preset.value} value={preset.value}>
            {preset.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodFilter;
