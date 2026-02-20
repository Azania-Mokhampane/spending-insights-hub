import { ICON_PRESETS } from "@/lib/constants";
import { ShoppingCart } from "lucide-react";

interface ICategoryIconProps {
  iconName?: string;
  className?: string;
  color?: string;
}
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
