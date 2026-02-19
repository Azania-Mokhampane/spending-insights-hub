import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SidebarContent } from "../navigation/SidebarContent";
import { HOME_ROUTE } from "@/routes";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-card flex items-center justify-between px-4 md:hidden">
        <Link to={HOME_ROUTE} className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Brand Logo" className="h-5 shrink-0" />
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 flex flex-col">
            <SidebarContent
              collapsed={false}
              onNavClick={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 h-screen border-r bg-card flex-col transition-all duration-300 shrink-0 hidden md:flex",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
