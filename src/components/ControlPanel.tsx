import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Plus, ArrowRight, UserPlus, UserMinus } from "lucide-react";

interface ControlPanelProps {
  onStartAutoMode: () => void;
  onAddRequest: () => void;
  onProcessNext: () => void;
  onAddServer: () => void;
  onRemoveServer: () => void;
  isAutoMode: boolean;
}

export const ControlPanel = ({
  onStartAutoMode,
  onAddRequest,
  onProcessNext,
  onAddServer,
  onRemoveServer,
  isAutoMode
}: ControlPanelProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-primary">⚡</span> Control Panel
      </h2>
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={onStartAutoMode}
          className={isAutoMode ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"}
        >
          <Play className="w-4 h-4" />
          {isAutoMode ? "Auto Mode Active" : "Start Auto Mode"}
        </Button>
        <Button onClick={onAddRequest} variant="secondary">
          <Plus className="w-4 h-4" />
          Add Request
        </Button>
        <Button onClick={onProcessNext} variant="secondary">
          <ArrowRight className="w-4 h-4" />
          Process Next Request
        </Button>
        <Button onClick={onAddServer} variant="secondary">
          <UserPlus className="w-4 h-4" />
          Add Server
        </Button>
        <Button onClick={onRemoveServer} variant="secondary">
          <UserMinus className="w-4 h-4" />
          Remove Server
        </Button>
      </div>
    </Card>
  );
};
