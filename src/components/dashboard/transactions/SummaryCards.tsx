import { formatCurrency } from "@/helpers/formatCurrency";
import type { SpendingSummaryType } from "types";
import {
  BarChart3,
  CreditCard,
  Receipt,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ISummaryCardsProps {
  spendingSummary: SpendingSummaryType;
}

const SummaryCards = ({ spendingSummary }: ISummaryCardsProps) => {
  const {
    totalSpent,
    averageTransaction,
    comparedToPrevious,
    transactionCount,
    topCategory,
  } = spendingSummary;
  const cards = [
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      change: comparedToPrevious.spentChange,
      icon: CreditCard,
    },
    {
      label: "Transactions",
      value: transactionCount.toString(),
      change: comparedToPrevious.transactionChange,
      icon: Receipt,
    },
    {
      label: "Avg. Transaction",
      value: formatCurrency(averageTransaction),
      icon: BarChart3,
    },
    {
      label: "Top Category",
      value: topCategory,
      icon: TrendingUp,
    },
  ];
  return (
    <div
      data-test="summary-cards-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => (
        <Card
          key={card.label}
          className="relative overflow-hidden h-full p-3 px-0"
        >
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">
                {card.label}
              </span>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-lg md:text-2xl tracking-tight">{card.value}</p>
            {card.change !== undefined && (
              <div className="flex items-center gap-1 mt-2 text-xs md:text-sm">
                {card.change >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={
                    card.change >= 0 ? "text-success" : "text-destructive"
                  }
                >
                  {Math.abs(card.change)}%
                </span>
                <span className="text-muted-foreground">vs prev</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
