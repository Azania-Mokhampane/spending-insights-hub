import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategoriesAndFilters";
import SpendingSummaryWithFilter from "./SpendingSummaryWithFilter";
import TransactionsFilters from "./TransactionsFilters";
import { State } from "@/components/common/State";
import Pagination from "@/components/common/Pagination";
import TransactionTableRow from "./TransactionTableRow";
import TransactionMobileCard from "./TransactionMobileCard";
import { useTransactionFilters } from "./useTransactionFilters";

interface ITransactionListProps {
  customerId: string;
}

const TransactionList = ({ customerId }: ITransactionListProps) => {
  const filters = useTransactionFilters();
  const { data: categories } = useCategories(customerId);
  const {
    data: customerTransactions,
    isFetching,
    isPending: customerTransactionsLoading,
    isError,
    error: customerTransactionsError,
  } = useTransactions({
    customerId,
    page: filters.page,
    perPage: filters.perPage,
    category: filters.category === "all" ? null : filters.category,
    endDate: filters.endDate,
    sortBy: filters.sortBy,
    startDate: filters.startDate,
  });

  const fetchingClass = isFetching
    ? "animate-pulse opacity-5 pointer-events-none cursor-progress"
    : "";

  return (
    <>
      <SpendingSummaryWithFilter customerId={customerId} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Transactions
          </CardTitle>
        </CardHeader>

        <div className="flex  px-4 md:px-6">
          <TransactionsFilters
            disabled={customerTransactionsLoading}
            categories={categories || []}
            {...filters}
          />
        </div>

        <CardContent className="px-0">
          <State
            isLoading={customerTransactionsLoading}
            isError={isError}
            isEmpty={customerTransactions?.transactions.length === 0}
            errorComponent={customerTransactionsError?.message}
          >
            {/* desktop view */}
            <Table
              data-test="transactions-table"
              className={cn("hidden md:inline-table", fetchingClass)}
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
                  <TransactionTableRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </TableBody>
            </Table>
            {/* mobile view */}
            <div
              className={cn("md:hidden divide-y divide-border", fetchingClass)}
            >
              {customerTransactions?.transactions.map((transaction) => {
                return (
                  <TransactionMobileCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              })}
            </div>
            <Pagination
              page={filters.page}
              setPage={filters.setPage}
              perPage={filters.perPage}
              setPerPage={filters.setPerPage}
              totalEntries={customerTransactions?.pagination.total || 0}
            />
          </State>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionList;
