import type { CategoryType, TransactionsSortBy } from "types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TRANSACTION_SORT_LABELS } from "@/lib/constants";
import { ArrowDownUp, CalendarIcon, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import CategoryIcon from "./CategoryIcon";

interface ITransactionsFiltersProps {
  categories: CategoryType[];
  sortBy: TransactionsSortBy;
  setSortBy: (sortBy: TransactionsSortBy) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  category: string;
  setCategory: (category: string) => void;
}

const TransactionsFilters = ({
  categories,
  sortBy,
  setSortBy,
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  category,
  setCategory,
}: ITransactionsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <Filter className="h-4 w-4" />
            All Categories
          </SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.name} value={cat.name}>
              <CategoryIcon color={cat.color} iconName={cat.icon} />
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
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
              onSelect={(date) => setStartDate(date ?? null)}
              disabled={(date) => date > new Date()}
              autoFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        <span className="text-xs text-muted-foreground">–</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
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
              onSelect={(date) => setEndDate(date ?? null)}
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
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger size="sm">
          <ArrowDownUp className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TRANSACTION_SORT_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TransactionsFilters;
