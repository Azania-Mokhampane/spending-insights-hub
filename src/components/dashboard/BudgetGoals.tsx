import type { BudgetGoal } from "types";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Badge } from "../ui/badge";

const statusConfig = {
  on_track: {
    icon: CheckCircle2,
    className: "text-success",
    label: "On track",
  },
  warning: { icon: AlertTriangle, className: "text-warning", label: "Warning" },
  exceeded: { icon: XCircle, className: "text-destructive", label: "Exceeded" },
};

interface IBudgetGoalsProps {
  goals: BudgetGoal[];
}

const BudgetGoals = ({ goals }: IBudgetGoalsProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Budget Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {goals.map((goal) => {
          const config = statusConfig[goal.status];
          const StatusIcon = config.icon;
          const progressColor =
            goal.status === "on_track"
              ? "bg-success"
              : goal.status === "warning"
                ? "bg-warning"
                : "bg-destructive";

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${config.className}`} />
                  <p className="text-sm font-medium">{goal.category}</p>
                  <Badge
                    variant={
                      goal.status === "exceeded" ? "destructive" : "secondary"
                    }
                    className={`text-[10px] ${goal.status === "on_track" ? "bg-success/15 text-success border-transparent" : goal.status === "warning" ? "bg-warning/15 text-warning border-transparent" : ""}`}
                  >
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {goal.percentageUsed}% - {goal.daysRemaining}d left
                </p>
              </div>
              <div className="relative">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                    style={{ width: `${Math.min(goal.percentageUsed, 100)}%` }}
                  />
                </div>
              </div>
              <p className="flex items-center font-mono text-xs text-muted-foreground">
                {formatCurrency(goal.currentSpent)} of{" "}
                {formatCurrency(goal.monthlyBudget)}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default BudgetGoals;
