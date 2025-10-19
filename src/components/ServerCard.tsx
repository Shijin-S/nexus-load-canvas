import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  name: string;
  region: string;
  status: "healthy" | "degraded" | "offline";
  load: number;
  connections: number;
  responseTime: number;
}

export const ServerCard = ({ 
  name, 
  region, 
  status, 
  load, 
  connections, 
  responseTime 
}: ServerCardProps) => {
  const statusConfig = {
    healthy: { color: "bg-success", text: "Healthy", variant: "default" as const },
    degraded: { color: "bg-warning", text: "Degraded", variant: "secondary" as const },
    offline: { color: "bg-destructive", text: "Offline", variant: "destructive" as const }
  };

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            status === "healthy" && "bg-success/10",
            status === "degraded" && "bg-warning/10",
            status === "offline" && "bg-destructive/10"
          )}>
            <Server className={cn(
              "w-5 h-5",
              status === "healthy" && "text-success",
              status === "degraded" && "text-warning",
              status === "offline" && "text-destructive"
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{region}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            statusConfig[status].color,
            status === "healthy" && "animate-pulse"
          )} />
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].text}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">CPU Load</p>
          <p className="text-lg font-semibold text-foreground">{load}%</p>
          <div className="w-full h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                load < 60 ? "bg-success" : load < 80 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${load}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Connections</p>
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-semibold text-foreground">{connections}</p>
            <Activity className="w-3 h-3 text-accent" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Response Time</p>
          <p className="text-lg font-semibold text-foreground">{responseTime}ms</p>
        </div>
      </div>
    </Card>
  );
};
