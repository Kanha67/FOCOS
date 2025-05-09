
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </div>
  );
}
