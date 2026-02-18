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
import { State } from "../ui/state";
import { useEffect } from "react";

interface ITransactionListProps {
  customerId: string;
}

const TransactionList = ({ customerId }: ITransactionListProps) => {
  const [perPage, setPerPage] = usePerPageFilter();
  const [page, setPage] = usePageFilter();
  const [category, setCategory] = useCategoryFilter();
  const [startDate, setStartDate] = useStartDateFilter();
  const [endDate, setEndDate] = useEndDateFilter();
  const [sortBy, setSortby] = useSortByFilter();

  const { data: categoriesAndFilters } = useCategoriesAndFilters(customerId);

  const {
    data: customerTransactions,
    isFetching,
    isPending: customerTransactionsLoading,
    isError,
    error: customerTransactionsError,
  } = useTransactions({
    customerId,
    page,
    perPage,
    category: category === "all" ? null : category,
    endDate,
    sortBy,
    startDate,
  });

  useEffect(() => {
    setPage(1);
  }, [category, startDate, endDate, sortBy, setPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Transactions</CardTitle>
      </CardHeader>

      <div className="flex  px-4 md:px-6">
        <TransactionsFilters
          categories={categoriesAndFilters?.categories || []}
          sortBy={sortBy}
          setSortBy={setSortby}
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setStartDate={setStartDate}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <CardContent className="px-0">
        <State
          isLoading={customerTransactionsLoading}
          isError={isError}
          isEmpty={customerTransactions?.transactions.length === 0}
          errorComponent={customerTransactionsError?.message}
        >
          <Table
            data-test="transactions-table"
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
                <TableHead className="text-right pr-4 md:pr-6">
                  Amount
                </TableHead>
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
                  <TableCell className="text-right font-mono text-sm pr-4 md:pr-6 text-destructive">
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
                      <p className="text-sm font-mono font-medium text-destructive">
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
        </State>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
