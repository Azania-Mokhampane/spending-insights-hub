import type { SpendingByCategoryType } from "types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatCurrency } from "@/helpers/formatCurrency";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CategoryIcon from "../../common/CategoryIcon";
import { PieChart as PieChartIcon } from "lucide-react";
import { Badge } from "../../ui/badge";

interface ICategoryBreakdownProps {
  spendingByCategory: SpendingByCategoryType;
}

const CategoryBreakdown = ({ spendingByCategory }: ICategoryBreakdownProps) => {
  const { categories, totalAmount } = spendingByCategory;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground">
            <PieChartIcon className="h-10 w-10 opacity-30" />
            <p className="text-sm">No spending by category data available</p>
          </div>
        ) : (
          <>
            <div className="w-40 h-50 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="amount"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="var(--card)"
                  >
                    {categories.map((cat) => (
                      <Cell key={cat.name} fill={cat.color} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          const formattedAmount = formatCurrency(totalAmount);
                          const isLong = formattedAmount.length > 10;

                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 10}
                                className="fill-muted-foreground text-xs"
                              >
                                Total
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 10}
                                className={`fill-foreground font-bold ${
                                  isLong ? "text-sm" : "text-xl"
                                }`}
                              >
                                {formattedAmount}
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full space-y-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <CategoryIcon iconName={cat.icon} color={cat.color} />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between text-sm gap-1">
                      <div className="flex flex-row gap-1 items-center">
                        <p className="font-medium truncate text-xs sm:text-sm">
                          {cat.name}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {cat.transactionCount} Transactions
                        </Badge>
                      </div>

                      <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        <span className="hidden xl:inline">
                          {formatCurrency(cat.amount)} ·{" "}
                        </span>
                        {cat.percentage}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
