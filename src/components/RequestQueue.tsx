import { Card } from "@/components/ui/card";
import { ListOrdered } from "lucide-react";

export interface RequestData {
  id: number;
  name: string;
}

interface RequestQueueProps {
  requests: RequestData[];
}

export const RequestQueue = ({ requests }: RequestQueueProps) => {
  return (
    <Card className="p-6 bg-card border-border h-full">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <ListOrdered className="w-5 h-5 text-success" />
        Request Queue ({requests.length})
      </h2>
      {requests.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No requests in queue</p>
      ) : (
        <div className="space-y-2">
          {requests.map((request) => (
            <div key={request.id} className="border border-border rounded p-3">
              <p className="text-sm text-foreground">{request.name}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
