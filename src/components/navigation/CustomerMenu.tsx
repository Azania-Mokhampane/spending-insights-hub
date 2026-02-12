import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { Spinner } from "../ui/spinner";
import { getCustomerInitials } from "./helpers/getCustomerInitials";

const CustomerMenu = () => {
  // the customerId will most likely come from the decoded JWt session token depending on how auth is setup
  const customerId = "12345";

  const { data, isLoading, error } = useCustomerProfile(customerId);

  if (isLoading) return <Spinner className="w-6 h-6 animate-spin" />;

  if (error) return <div>{error.message}</div>;

  const initials = getCustomerInitials(data?.name || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-full p-1 pr-3 hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium leading-tight">
              {data?.name}
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              {data?.email}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="hidden md:inline-flex text-[10px] uppercase tracking-wider font-semibold ml-1"
          >
            {data?.accountType}
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{data?.name}</p>
            <p className="text-xs text-muted-foreground">{data?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerMenu;
