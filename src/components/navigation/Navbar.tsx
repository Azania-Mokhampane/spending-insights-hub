import CustomerMenu from "./CustomerMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Brand Logo" className="h-6" />
          <span className="hidden sm:inline text-sm text-muted-foreground font-medium">
            Spending Insights Hub
          </span>
        </div>
        <CustomerMenu />
      </div>
    </header>
  );
};

export default Navbar;
