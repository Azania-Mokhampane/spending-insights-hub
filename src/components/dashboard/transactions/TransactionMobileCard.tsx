import CategoryIcon from "@/components/common/CategoryIcon";
import { formatUTCDate } from "@/helpers/dateUtils";
import { formatCurrency } from "@/helpers/formatCurrency";
import type { TransactionType } from "types";

interface ITransactionMobileCardProps {
  transaction: TransactionType;
}

const TransactionMobileCard = ({
  transaction,
}: ITransactionMobileCardProps) => (
  <div className="flex flex-col gap-2 px-4 py-3 hover:bg-muted/50 w-full text-left">
    <div className="flex items-center gap-2">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${transaction.categoryColor}18` }}
      >
        <CategoryIcon
          color={transaction.categoryColor}
          iconName={transaction.icon}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{transaction.merchant}</p>
        <p className="text-xs text-muted-foreground truncate">
          {transaction.description}
        </p>
      </div>
      <p className="text-sm font-mono font-medium text-destructive shrink-0">
        -{formatCurrency(transaction.amount)}
      </p>
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground pl-11">
      <span
        className="font-medium px-1.5 py-0.5 rounded-full"
        style={{
          backgroundColor: `${transaction.categoryColor}18`,
          color: transaction.categoryColor,
        }}
      >
        {transaction.category}
      </span>
      <span>{transaction.paymentMethod}</span>
      <span> {formatUTCDate(transaction.date)}</span>
    </div>
  </div>
);

export default TransactionMobileCard;
