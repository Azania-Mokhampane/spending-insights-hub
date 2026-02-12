import { BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "@/routes";
import CustomerMenu from "./CustomerMenu";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <Link to={HOME_ROUTE} className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold tracking-tight">
              Capitec
            </span>
            <span className="hidden sm:inline text-sm text-muted-foreground font-medium">
              Spending Insights Hub
            </span>
          </div>
        </Link>
        {pathname === HOME_ROUTE ? (
          <Link to={DASHBOARD_ROUTE}>
            <Button size="sm">Go to Dashboard</Button>
          </Link>
        ) : (
          <CustomerMenu />
        )}
      </div>
    </header>
  );
};

export default Navbar;
