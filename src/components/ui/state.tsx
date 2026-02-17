import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type StateWrapperProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
};

export const State = ({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  loadingComponent,
  errorComponent,
  emptyComponent,
}: StateWrapperProps) => {
  if (isLoading) {
    return (
      <>
        {loadingComponent || (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
          </div>
        )}
      </>
    );
  }

  if (isError) {
    return (
      <>
        {errorComponent || (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <p className="mt-4 text-sm font-medium">Something went wrong</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Please try again later
            </p>
          </div>
        )}
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        {emptyComponent || (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium">No data found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};
