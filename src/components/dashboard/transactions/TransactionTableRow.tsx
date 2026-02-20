import CategoryIcon from "@/components/common/CategoryIcon";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatUTCDate } from "@/helpers/dateUtils";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Badge } from "lucide-react";
import type { TransactionType } from "types";

interface ITransactionTableRowProps {
  transaction: TransactionType;
}

const TransactionTableRow = ({ transaction }: ITransactionTableRowProps) => {
  console.log(transaction.date);
  return (
    <TableRow className="w-full text-muted-foreground">
      <TableCell className="flex flex-row gap-2 flex-1 pl-4 md:pl-6 py-3">
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
          <p className="text-xs text-muted-foreground">
            {transaction.description}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          style={{
            backgroundColor: `${transaction.categoryColor}18`,
            color: transaction.categoryColor,
          }}
        >
          {transaction.category}
        </Badge>
      </TableCell>
      <TableCell>{formatUTCDate(transaction.date)}</TableCell>
      <TableCell>{transaction.paymentMethod}</TableCell>
      <TableCell className="text-right font-mono text-sm pr-4 md:pr-6 text-destructive">
        -{formatCurrency(transaction.amount)}
      </TableCell>
    </TableRow>
  );
};

export default TransactionTableRow;
