import type { CustomerProfileType } from "types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getCustomerInitials } from "@/helpers/getCustomerInitials";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/helpers/formatCurrency";
import { format } from "date-fns";

interface ICustomerSummaryProps {
  customer: CustomerProfileType;
}

const CustomerSummary = ({ customer }: ICustomerSummaryProps) => {
  const { name, accountType, joinDate, totalSpent } = customer;
  return (
    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
      <Avatar className="h-8 w-8 sm:h-12 sm:w-12 border-2 border-primary/20 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {getCustomerInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight truncate">
            Welcome back, {name.split(" ")[0]}
          </h1>
          <Badge
            variant="secondary"
            className="text-[8px] md:text-[10px] uppercase tracking-wider font-semibold"
          >
            {accountType}
          </Badge>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">
          Member since {format(joinDate, "MMM yy")} · Total spent{" "}
          <span className="font-mono font-medium text-foreground">
            {formatCurrency(totalSpent)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomerSummary;
