import { AlertCircle, Inbox } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Props for the `State` component.
 */
type StateWrapperProps = {
  /**
   * The content to render when not loading, error, or empty.
   */
  children: ReactNode;

  /**
   * Whether the component is currently loading.
   * When true, the loading UI is rendered.
   */
  isLoading?: boolean;

  /**
   * Whether an error state should be shown.
   * When true, the error UI is rendered.
   */
  isError?: boolean;

  /**
   * Whether the empty state should be shown.
   * When true, the empty UI is rendered.
   */
  isEmpty?: boolean;

  /**
   * Custom loading component to override the default loading UI.
   */
  loadingComponent?: ReactNode;

  /**
   * Custom text displayed under the default loading spinner/logo.
   */
  loadingText?: string;

  /**
   * Custom error component to override the default error UI.
   */
  errorComponent?: ReactNode;

  /**
   * Custom empty component to override the default empty UI.
   */
  emptyComponent?: ReactNode;
};

/**
 * `State` is a utility wrapper component for handling
 * loading, error, and empty UI states in a clean and reusable way.
 *
 * It prioritizes states in the following order:
 * 1. Loading
 * 2. Error
 * 3. Empty
 * 4. Children (default content)
 *
 * @example
 * Basic usage
 * ```tsx
 * <State isLoading={isFetching}>
 *   <UserList users={users} />
 * </State>
 * ```
 *
 * @example
 * With empty + error handling
 * ```tsx
 * <State
 *   isLoading={isLoading}
 *   isError={!!error}
 *   isEmpty={!isLoading && users.length === 0}
 * >
 *   <UserTable users={users} />
 * </State>
 * ```
 *
 * @example
 * With custom loading component
 * ```tsx
 * <State
 *   isLoading={isLoading}
 *   loadingComponent={<Spinner size="lg" />}
 * >
 *   <Dashboard />
 * </State>
 * ```
 */

export const State = ({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  loadingText,
  loadingComponent,
  errorComponent,
  emptyComponent,
}: StateWrapperProps) => {
  if (isLoading) {
    return (
      <>
        {loadingComponent || (
          <div className="flex flex-col items-center justify-center animate-pulse">
            <div className="">
              <img src="/logo-dark.svg" alt="Loading" className="h-36 w-36" />
            </div>
            <p className="text-sm text-muted-foreground">
              {loadingText ?? "Loading..."}
            </p>
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
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};
