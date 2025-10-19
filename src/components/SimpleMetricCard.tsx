import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SimpleMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

export const SimpleMetricCard = ({ 
  title, 
  value, 
  icon: Icon,
  iconColor = "text-muted-foreground"
}: SimpleMetricCardProps) => {
  return (
    <Card className="p-5 bg-card border-border">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </Card>
  );
};
