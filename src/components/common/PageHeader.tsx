/**
 * Props for the PageHeader component.
 */
interface IPageHeaderProps {
  /**
   * Main heading text displayed as the page title.
   */
  title: string;

  /**
   * Optional supporting text displayed below the title.
   */
  caption?: string;
}

/**
 * PageHeader component used to display a consistent
 * page title and optional caption across the application.
 *
 * Designed for dashboards, admin panels, and content pages.
 *
 * @example
 * Basic usage
 * ```tsx
 * <PageHeader title="Transactions" />
 * ```
 *
 * @example
 * With caption
 * ```tsx
 * <PageHeader
 *   title="Users"
 *   caption="Manage and monitor registered users"
 * />
 * ```
 */

const PageHeader = ({ title, caption }: IPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {caption && (
        <p className="text-sm text-muted-foreground mt-1">{caption}</p>
      )}
    </div>
  );
};

export default PageHeader;
