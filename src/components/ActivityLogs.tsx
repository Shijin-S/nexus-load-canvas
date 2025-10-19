import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";

export interface LogEntry {
  id: number;
  type: "allocation" | "request";
  timestamp: string;
  message: string;
}

interface ActivityLogsProps {
  logs: LogEntry[];
}

export const ActivityLogs = ({ logs }: ActivityLogsProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-accent" />
        Activity Logs
      </h2>
      <ScrollArea className="h-[280px] pr-4">
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="border-l-2 border-primary pl-4 py-2">
              <p className="text-sm font-semibold text-foreground">{log.type}</p>
              <p className="text-xs text-muted-foreground">{log.timestamp}</p>
              <p className="text-sm text-foreground mt-1">{log.message}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
