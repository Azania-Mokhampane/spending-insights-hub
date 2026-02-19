import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "@/routes";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
            <ShieldAlert className="h-7 w-7 text-destructive" />
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Page not found
        </h1>

        <p className="text-muted-foreground text-sm mb-6">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link to={DASHBOARD_ROUTE}>Go to Dashboard</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to={HOME_ROUTE}>Go Home</Link>
          </Button>
        </div>

        <p className="text-md text-muted-foreground mt-8">Error 404</p>
      </div>
    </div>
  );
};

export default NotFound;
