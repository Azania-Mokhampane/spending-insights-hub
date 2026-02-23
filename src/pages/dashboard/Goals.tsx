import PageHeader from "@/components/common/PageHeader";
import { State } from "@/components/common/State";
import BudgetGoals from "@/components/dashboard/goals/BudgetGoals";
import { useBudgetGoals } from "@/hooks/useBudgetGoals";
import { usePageTitle } from "@/hooks/usePageTitle";
import { MOCK_CUSTOMER_ID } from "@/mocks/data/customers";

const GoalsPage = () => {
  usePageTitle();
  const customerId = MOCK_CUSTOMER_ID;

  const { data, isPending, isError } = useBudgetGoals(customerId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <PageHeader title="Goals" caption="Track your budget goals" />

      <State
        isLoading={isPending}
        isError={isError}
        isEmpty={data?.goals.length === 0}
      >
        <BudgetGoals goals={data?.goals || []} />
      </State>
    </div>
  );
};

export default GoalsPage;
