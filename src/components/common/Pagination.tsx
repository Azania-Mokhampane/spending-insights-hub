import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

/**
 * Props for the Pagination component.
 */
interface PaginationProps {
  /**
   * Current active page (1-based index).
   */
  page: number;

  /**
   * Function to update the current page.
   */
  setPage: (page: number) => void;

  /**
   * Total number of entries across all pages.
   */
  totalEntries: number;

  /**
   * Function to update the number of rows per page.
   */
  setPerPage: (perPage: number) => void;

  /**
   * Number of rows displayed per page.
   */
  perPage: number;
}

/**
 * Pagination component for navigating paginated data tables.
 *
 * Features:
 * - First / Previous / Next / Last navigation
 * - Rows per page selector
 * - Page counter display
 * - Automatically disables invalid navigation
 *
 * @example
 * Basic usage
 * ```tsx
 * const [page, setPage] = useState(1);
 * const [perPage, setPerPage] = useState(20);
 *
 * <Pagination
 *   page={page}
 *   setPage={setPage}
 *   perPage={perPage}
 *   setPerPage={setPerPage}
 *   totalEntries={transactions.length}
 * />
 * ```
 *
 * @example
 * With server-side pagination
 * ```tsx
 * <Pagination
 *   page={page}
 *   setPage={(newPage) => {
 *     setPage(newPage);
 *     refetch();
 *   }}
 *   perPage={perPage}
 *   setPerPage={setPerPage}
 *   totalEntries={data?.totalCount ?? 0}
 * />
 * ```
 */

const Pagination = ({
  setPerPage,
  perPage,
  page,
  setPage,
  totalEntries,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalEntries / perPage);
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  if (totalPages == 0) return null;

  return (
    <div
      data-test="transactions-pagination"
      className="flex items-center justify-between px-4 md:px-6 pt-4"
    >
      <div className="flex items-center space-x-2">
        <p className="text-xs md:text-sm font-medium">Rows per page</p>
        <Select
          onValueChange={(val) => {
            setPerPage(Number(val));
            setPage(1);
          }}
          value={String(perPage)}
        >
          <SelectTrigger
            size="sm"
            className="h-8 w-20"
            aria-label="Pagination per page select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-25 items-center justify-center text-xs md:text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => canGoPrev && setPage(1)}
          disabled={!canGoPrev}
        >
          <ChevronsLeft aria-label="Go to first page" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => canGoPrev && setPage(page - 1)}
          disabled={!canGoPrev}
        >
          <ChevronLeft aria-label="Go to previous page" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => canGoNext && setPage(page + 1)}
          disabled={!canGoNext}
        >
          <ChevronRight aria-label="Go to next page" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => canGoNext && setPage(totalPages)}
          disabled={!canGoNext}
        >
          <ChevronsRight aria-label="Go to last page" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
