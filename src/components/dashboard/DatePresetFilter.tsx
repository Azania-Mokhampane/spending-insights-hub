import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { DateRangePresetType } from "types";

interface IDatePresetFilterProps {
  datePreset: string;
  setDatePreset: (datePreset: string) => void;
  ariaLabel?: string;
  disabled?: boolean;
  dateRangePresets: DateRangePresetType[];
}

const DatePresetFilter = ({
  datePreset,
  setDatePreset,
  ariaLabel,
  disabled,
  dateRangePresets,
}: IDatePresetFilterProps) => {
  return (
    <Select
      value={datePreset}
      onValueChange={(value) => setDatePreset(value)}
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

export default DatePresetFilter;
