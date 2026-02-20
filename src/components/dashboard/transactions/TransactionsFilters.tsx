import type { CategoryType, TransactionsSortBy } from "types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_SORT_LABELS } from "@/lib/constants";
import { ArrowDownUp, Filter } from "lucide-react";
import CategoryIcon from "../../common/CategoryIcon";
import DateRangeFilters from "../filters/DateRangeFilters";

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
  disabled?: boolean;
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
  disabled,
}: ITransactionsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={category} onValueChange={setCategory} disabled={disabled}>
        <SelectTrigger size="sm" aria-label="Transactions category filter">
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
      <DateRangeFilters
        disabled={disabled}
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <Select value={sortBy} onValueChange={setSortBy} disabled={disabled}>
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
