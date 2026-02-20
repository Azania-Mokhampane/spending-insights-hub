import CategoryIcon from "@/components/common/CategoryIcon";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/helpers/formatCurrency";
import type { CategorySpendingType } from "types";

interface ICategoryListItemProps {
  category: CategorySpendingType;
}

const CategoryListItem = ({ category }: ICategoryListItemProps) => (
  <div className="flex items-center gap-2">
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${category.color}20` }}
    >
      <CategoryIcon iconName={category.icon} color={category.color} />
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="flex items-center justify-between text-sm gap-1">
        <div className="flex flex-row gap-1 items-center">
          <p className="font-medium truncate text-xs sm:text-sm">
            {category.name}
          </p>
          <Badge variant="outline" className="text-xs">
            {category.transactionCount} Transactions
          </Badge>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
          <span className="hidden xl:inline">
            {formatCurrency(category.amount)} ·{" "}
          </span>
          {category.percentage}%
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${category.percentage}%`,
            backgroundColor: category.color,
          }}
        />
      </div>
    </div>
  </div>
);

export default CategoryListItem;
