import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePeriodSearchParams } from "@/hooks/filters/usePeriodSearchParams";
import { useSpendingSummary } from "@/hooks/useSpendingSummary";
import { periodNames } from "@/lib/constants";
import type { Period } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const Transactions = () => {
  const customerId = MOCK_CUSTOMER_ID;
  const [period, setPeriod] = usePeriodSearchParams();

  const { data: spendingSummary } = useSpendingSummary({
    period,
    customerId,
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse, search, and filter all your transactions
        </p>
      </div>

      {/* Spending Summary with Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-end">
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

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 text-xs justify-start font-normal",
                    // !startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                  {/* {startDate ? format(startDate, "dd MMM yyyy") : "Start date"} */}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(d) => {
                    setStartDate(d);
                    if (d && endDate) setUseCustomRange(true);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                /> */}
              </PopoverContent>
            </Popover>
            <span className="text-xs text-muted-foreground">to</span>
            <Popover>
              {/* <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 text-xs justify-start font-normal",
                    !endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                  {endDate ? format(endDate, "dd MMM yyyy") : "End date"}
                </Button>
              </PopoverTrigger> */}
              {/* <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(d) => {
                    setEndDate(d);
                    if (startDate && d) setUseCustomRange(true);
                  }}
                  disabled={(date) => (startDate ? date < startDate : false)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent> */}
            </Popover>
          </div>
        </div>

        {spendingSummary && <SummaryCards spendingSummary={spendingSummary} />}
      </div>

      <TransactionList />
    </div>
  );
};

export default Transactions;
