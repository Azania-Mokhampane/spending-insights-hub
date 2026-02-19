import SpendingSummaryWithFilter from "@/components/dashboard/SpendingSummaryWithFilter";
import TransactionList from "@/components/dashboard/TransactionList";
import PageHeader from "@/components/ui/page-header";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";

const TransactionsPage = () => {
  const customerId = MOCK_CUSTOMER_ID;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <PageHeader
        title="Transactions"
        caption="Browse and filter all your transactions"
      />
      <SpendingSummaryWithFilter customerId={customerId} />
      <TransactionList customerId={customerId} />
    </div>
  );
};

export default TransactionsPage;
