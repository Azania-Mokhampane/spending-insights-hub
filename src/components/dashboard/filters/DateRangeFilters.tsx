import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

interface IDateRangeFiltersProps {
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  disabled?: boolean;
}

const DateRangeFilters = ({
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  disabled,
}: IDateRangeFiltersProps) => {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  return (
    <div className="flex items-center gap-1.5">
      <Popover open={startOpen} onOpenChange={setStartOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            data-testid="start-date-filter"
            aria-label="Start date filter"
            variant="outline"
            size="xs"
            className={cn(
              "h-7 px-2 text-xs justify-start font-normal",
              !startDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-1 h-3 w-3" />
            {startDate ? format(startDate, "dd MMM yy") : "From"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate ?? undefined}
            onSelect={(date) => {
              setStartDate(date ?? null);
              setStartOpen(false);
            }}
            disabled={(date) => date > new Date()}
            autoFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      <span className="text-xs text-muted-foreground">–</span>
      <Popover open={endOpen} onOpenChange={setEndOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            data-testid="end-date-filter"
            aria-label="End date filter"
            variant="outline"
            size="xs"
            className={cn(
              "h-7 px-2 text-xs justify-start font-normal",
              !endDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-1 h-3 w-3" />
            {endDate ? format(endDate, "dd MMM yy") : "To"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate ?? undefined}
            onSelect={(date) => {
              setEndDate(date ?? null);
              setEndOpen(false);
            }}
            disabled={(date) =>
              date > new Date() || (startDate ? date < startDate : false)
            }
            autoFocus
            required={false}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {(startDate || endDate) && (
        <Button
          data-testid="clear-date-filter"
          aria-label="Clear date filter"
          variant="secondary"
          size="xs"
          className="h-7 px-2 text-xs"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default DateRangeFilters;
