import { ICON_PRESETS } from "@/lib/constants";
import { ShoppingCart } from "lucide-react";

/**
 * Props for the CategoryIcon component.
 */
interface ICategoryIconProps {
  /**
   * The name of the icon key inside ICON_PRESETS.
   * If the key does not exist, a fallback icon will be rendered.
   */
  iconName?: string;

  /**
   * Tailwind or custom CSS classes applied to the icon.
   * Defaults to "h-4 w-4 ".
   */
  className?: string;

  /**
   * Optional color applied via inline style.
   */
  color?: string;
}

/**
 * CategoryIcon dynamically renders an icon from ICON_PRESETS
 * based on the provided iconName.
 *
 * - If `iconName` is undefined → returns null.
 * - If `iconName` exists but is not found in ICON_PRESETS → renders ShoppingCart as fallback.
 *
 * @example
 * Basic usage
 * ```tsx
 * <CategoryIcon iconName="groceries" />
 * ```
 *
 * @example
 * Custom size
 * ```tsx
 * <CategoryIcon
 *   iconName="travel"
 *   className="h-6 w-6"
 * />
 * ```
 *
 * @example
 * Custom color
 * ```tsx
 * <CategoryIcon
 *   iconName="shopping"
 *   color="#22c55e"
 * />
 * ```
 *
 * @example
 * Fallback behavior
 * ```tsx
 * <CategoryIcon iconName="unknown" />
 * // Renders ShoppingCart icon
 * ```
 */
const CategoryIcon = ({
  iconName,
  className = "h-4 w-4 ",
  color,
}: ICategoryIconProps) => {
  if (!iconName) return null;
  const Icon = ICON_PRESETS[iconName as keyof typeof ICON_PRESETS];

  return Icon ? (
    <Icon className={className} style={{ color }} />
  ) : (
    <ShoppingCart className={className} />
  );
};

export default CategoryIcon;
