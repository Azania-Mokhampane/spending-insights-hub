import type { MonthlySpendingTrendType } from "types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatMonth } from "@/helpers/dateUtils";
import { Button } from "../../ui/button";
import { MONTH_RANGE_OPTIONS } from "@/lib/constants";

interface IMonthlySpendingTrendsProps {
  trends: MonthlySpendingTrendType[];
  monthRange?: number;
  setMonthRange?: (months: number) => void;
}

const MonthlySpendingTrends = ({
  trends,
  monthRange,
  setMonthRange,
}: IMonthlySpendingTrendsProps) => {
  const data = trends.map((trend) => ({
    ...trend,
    monthLabel: formatMonth(trend.month),
  }));
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Monthly Spending Trends
        </CardTitle>
        {monthRange && (
          <div className="flex gap-1">
            {MONTH_RANGE_OPTIONS.map((m) => (
              <Button
                key={m}
                variant={monthRange === m ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs px-2.5"
                onClick={() => setMonthRange?.(m)}
              >
                {m}M
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-70 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 5, right: 30, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="monthLabel"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="amount"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="count"
                orientation="right"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Transactions",
                  angle: 90,
                  position: "insideRight",
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "transactionCount" ? value : formatCurrency(value),
                  name === "totalSpent"
                    ? "Total Spent"
                    : name === "transactionCount"
                      ? "Transactions"
                      : "Average Transaction",
                ]}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                formatter={(value) =>
                  value === "totalSpent"
                    ? "Total Spent"
                    : value === "transactionCount"
                      ? "Transactions"
                      : "Average Transaction"
                }
              />
              <Bar
                dataKey="totalSpent"
                yAxisId="amount"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                dataKey="averageTransaction"
                yAxisId="amount"
                type="natural"
                stroke="var(--chart-4)"
                strokeWidth={2}
                dot={{ r: 3, fill: "var(--chart-4)" }}
              />
              <Line
                dataKey="transactionCount"
                yAxisId="count"
                type="natural"
                stroke="var(--chart-5)"
                strokeWidth={2}
                dot={{ r: 3, fill: "var(--chart-5)" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpendingTrends;
