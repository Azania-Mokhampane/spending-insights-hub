import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LogOut,
  Receipt,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getCustomerInitials } from "@/helpers/getCustomerInitials";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { Button } from "../ui/button";
import {
  DASHBOARD_GOALS_ROUTE,
  DASHBOARD_ROUTE,
  DASHBOARD_TRANSACTIONS_ROUTE,
  DASHBOARD_TRENDS_ROUTE,
  HOME_ROUTE,
} from "@/routes";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const navItems = [
  { title: "Overview", url: DASHBOARD_ROUTE, icon: LayoutDashboard, end: true },
  { title: "Trends", url: DASHBOARD_TRENDS_ROUTE, icon: TrendingUp },
  { title: "Transactions", url: DASHBOARD_TRANSACTIONS_ROUTE, icon: Receipt },
  { title: "Goals", url: DASHBOARD_GOALS_ROUTE, icon: Target },
];

interface ISidebarContentProps {
  collapsed: boolean;
  onNavClick?: () => void;
  onToggleCollapse?: () => void;
}
export const SidebarContent = ({
  collapsed,
  onNavClick,
  onToggleCollapse,
}: ISidebarContentProps) => {
  const customerId = "12345";
  const { data } = useCustomerProfile(customerId);
  return (
    <>
      <Link
        to={HOME_ROUTE}
        className="h-14 flex items-center gap-2.5 px-4 border-b shrink-0"
      >
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <BarChart3 className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight">Capitec</span>
        )}
      </Link>

      {onToggleCollapse && (
        <div className="px-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              "w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer",
              collapsed ? "justify-center" : "justify-start px-3",
            )}
          >
            {collapsed ? (
              <ChevronsRight className="h-3.5 w-3.5" />
            ) : (
              <>
                <ChevronsLeft className="h-3.5 w-3.5" />
                <span>Collapse</span>
              </>
            )}
          </Button>
          <Separator className="mt-1" />
        </div>
      )}

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.end}
            onClick={onNavClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>
      {data && (
        <div className="border-t p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg p-2 hover:bg-muted/60 transition-colors text-left",
                  collapsed && "justify-center",
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {getCustomerInitials(data.name)}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{data.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {data.email}
                    </p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{data.name}</p>
                <p className="text-xs text-muted-foreground">{data.email}</p>
                <Badge
                  variant="secondary"
                  className="mt-1 text-[10px] uppercase"
                >
                  {data.accountType}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};
