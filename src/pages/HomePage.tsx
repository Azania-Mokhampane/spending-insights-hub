import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/routes";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6 py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Welcome to <span className="text-gradient">Capitec</span>
        </h1>
        <p className="text-3xl font-bold text-muted-foreground">
          Spending Insights Hub
        </p>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your personal spending insights hub. Take charge of your finances,
          monitor spending, and see trends all on one elegantly straightforward
          dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={DASHBOARD_ROUTE}>
            <Button size="lg" className="text-base px-8">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
