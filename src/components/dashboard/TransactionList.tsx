import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { formatCurrency } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import {
  useCategoryFilter,
  useEndDateFilter,
  usePageFilter,
  usePerPageFilter,
  useSortByFilter,
  useStartDateFilter,
} from "@/hooks/filters/transactionsFilters";
import CategoryIcon from "./CategoryIcon";
import { Badge } from "../ui/badge";
import TransactionsFilters from "./TransactionsFilters";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategoriesAndFilters } from "@/hooks/useCategoriesAndFilters";

interface ITransactionListProps {
  customerId: string;
}

const TransactionList = ({ customerId }: ITransactionListProps) => {
  const [perPage, setPerPage] = usePerPageFilter();
  const [page, setPage] = usePageFilter();
  const [category] = useCategoryFilter();
  const [startDate] = useStartDateFilter();
  const [endDate] = useEndDateFilter();
  const [sortBy] = useSortByFilter();

  const { data: customerTransactions, isFetching } = useTransactions({
    customerId,
    page,
    perPage,
    category,
    endDate,
    sortBy,
    startDate,
  });

  const { data: categoriesAndFilters } = useCategoriesAndFilters(customerId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Transactions</CardTitle>
      </CardHeader>
      <div className="flex justify-end pr-4 md:pr-6">
        <TransactionsFilters />
      </div>

      <CardContent className="px-0">
        <Table
          className={cn(
            "hidden md:inline-table",
            isFetching &&
              "animate-pulse opacity-5 pointer-events-none cursor-progress",
          )}
        >
          <TableHeader>
            <TableRow>
              <TableHead className="flex-1 pl-4 md:pl-6 py-3">
                Transaction
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right pr-4 md:pr-6">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerTransactions?.transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="w-full text-muted-foreground"
              >
                <TableCell className="flex flex-row gap-2 flex-1 pl-4 md:pl-6 py-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${transaction.categoryColor}18`,
                    }}
                  >
                    <CategoryIcon
                      color={transaction.categoryColor}
                      iconName={transaction.icon}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {transaction.merchant}
                    </p>
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
                <TableCell>
                  {format(new Date(transaction.date), "dd MMM yy, HH:mm")}
                </TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell className="text-right font-mono text-sm pr-4 md:pr-6">
                  -{formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          className={cn(
            "md:hidden divide-y divide-border",
            isFetching &&
              "animate-pulse opacity-5 pointer-events-none cursor-progress",
          )}
        >
          {customerTransactions?.transactions.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="flex flex-col gap-2 px-4 py-3 hover:bg-muted/50 w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${transaction.categoryColor}18`,
                    }}
                  >
                    <CategoryIcon
                      color={transaction.categoryColor}
                      iconName={transaction.icon}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {transaction.merchant}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {transaction.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono font-medium">
                      -{formatCurrency(transaction.amount)}
                    </p>
                  </div>
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
                  <span>
                    {format(new Date(transaction.date), "dd MMM, HH:mm")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalEntries={customerTransactions?.pagination.total || 0}
        />
      </CardContent>
    </Card>
  );
};

export default TransactionList;
