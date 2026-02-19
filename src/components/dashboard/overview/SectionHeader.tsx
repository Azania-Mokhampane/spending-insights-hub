import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ISectionHeaderProps {
  title: string;
  subtitle: string;
  linkTo: string;
  linkLabel?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  linkTo,
  linkLabel,
}: ISectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-xs gap-1 text-muted-foreground hover:text-foreground"
      >
        <Link to={linkTo}>
          {linkLabel || "View Details"} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
};

export default SectionHeader;
