import { Card } from "@/components/ui/card";
import { Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ServerData {
  id: number;
  name: string;
  status: "healthy" | "busy";
  cpuLoad: number;
  requests: number;
}

interface ServerClusterProps {
  servers: ServerData[];
}

export const ServerCluster = ({ servers }: ServerClusterProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Server className="w-5 h-5 text-primary" />
        Server Cluster ({servers.length})
      </h2>
      <div className="space-y-4">
        {servers.map((server) => (
          <div key={server.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-success" />
                <span className="font-semibold text-foreground">{server.name}</span>
                <Badge 
                  variant={server.status === "healthy" ? "default" : "secondary"}
                  className={server.status === "healthy" ? "bg-success hover:bg-success/90" : ""}
                >
                  {server.status}
                </Badge>
              </div>
              <div className="text-right">
                <span className="text-success font-semibold">{server.cpuLoad}/100</span>
                <p className="text-xs text-muted-foreground">48ms</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">{server.requests} requests</span>
              <span className="text-sm text-muted-foreground">{server.cpuLoad}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
