import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ControlPanel } from "@/components/ControlPanel";
import { SimpleMetricCard } from "@/components/SimpleMetricCard";
import { ServerCluster, ServerData } from "@/components/ServerCluster";
import { RequestQueue, RequestData } from "@/components/RequestQueue";
import { ActivityLogs, LogEntry } from "@/components/ActivityLogs";
import { Server, ListOrdered, Gauge, Clock } from "lucide-react";

const Index = () => {
  const [servers, setServers] = useState<ServerData[]>([
    { id: 1, name: "Server 1", status: "healthy", cpuLoad: 10, requests: 3 },
    { id: 2, name: "Server 2", status: "healthy", cpuLoad: 67, requests: 5 },
  ]);
  const [queue, setQueue] = useState<RequestData[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      type: "allocation",
      timestamp: "10:43:23 PM",
      message: "Request req-121 allocated to Server 2"
    },
    {
      id: 2,
      type: "request",
      timestamp: "10:39:15 PM",
      message: "New request req-121 added to queue [size: 0]"
    },
    {
      id: 3,
      type: "allocation",
      timestamp: "10:33:27 PM",
      message: "Request req-120 allocated to Server 2"
    },
    {
      id: 4,
      type: "request",
      timestamp: "10:30:15 PM",
      message: "New request req-120 added to queue [size: 1]"
    },
  ]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [requestCounter, setRequestCounter] = useState(122);
  const [serverCounter, setServerCounter] = useState(3);

  const addLog = (type: "allocation" | "request", message: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{
      id: Date.now(),
      type,
      timestamp,
      message
    }, ...prev]);
  };

  const handleAddRequest = () => {
    const newRequest = { id: requestCounter, name: `req-${requestCounter}` };
    setQueue(prev => [...prev, newRequest]);
    addLog("request", `New request req-${requestCounter} added to queue [size: ${queue.length + 1}]`);
    setRequestCounter(prev => prev + 1);
  };

  const handleProcessNext = () => {
    if (queue.length === 0) return;
    
    const request = queue[0];
    setQueue(prev => prev.slice(1));
    
    // Find server with lowest load (min heap algorithm)
    const minLoadServer = servers.reduce((min, server) => 
      server.cpuLoad < min.cpuLoad ? server : min
    );
    
    setServers(prev => prev.map(s => 
      s.id === minLoadServer.id 
        ? { ...s, requests: s.requests + 1, cpuLoad: Math.min(100, s.cpuLoad + 10) }
        : s
    ));
    
    addLog("allocation", `Request ${request.name} allocated to ${minLoadServer.name}`);
  };

  const handleAddServer = () => {
    const newServer: ServerData = {
      id: serverCounter,
      name: `Server ${serverCounter}`,
      status: "healthy",
      cpuLoad: 0,
      requests: 0
    };
    setServers(prev => [...prev, newServer]);
    addLog("allocation", `New ${newServer.name} added to cluster`);
    setServerCounter(prev => prev + 1);
  };

  const handleRemoveServer = () => {
    if (servers.length <= 1) return;
    const removedServer = servers[servers.length - 1];
    setServers(prev => prev.slice(0, -1));
    addLog("allocation", `${removedServer.name} removed from cluster`);
  };

  const handleStartAutoMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  useEffect(() => {
    if (!isAutoMode) return;

    const interval = setInterval(() => {
      // Auto add requests
      if (Math.random() > 0.5) {
        handleAddRequest();
      }
      
      // Auto process requests
      if (queue.length > 0) {
        handleProcessNext();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoMode, queue]);

  const utilization = servers.length > 0 
    ? (servers.reduce((sum, s) => sum + s.cpuLoad, 0) / servers.length).toFixed(1)
    : "0.0";

  const avgResponse = 55;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      
      <div className="relative">
        <Header />
        
        <main className="container mx-auto px-6 pb-8 max-w-7xl">
          {/* Control Panel */}
          <div className="mb-6">
            <ControlPanel
              onStartAutoMode={handleStartAutoMode}
              onAddRequest={handleAddRequest}
              onProcessNext={handleProcessNext}
              onAddServer={handleAddServer}
              onRemoveServer={handleRemoveServer}
              isAutoMode={isAutoMode}
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <SimpleMetricCard
              title="Active Servers"
              value={servers.length}
              icon={Server}
              iconColor="text-primary"
            />
            <SimpleMetricCard
              title="Queue Length"
              value={queue.length}
              icon={ListOrdered}
              iconColor="text-success"
            />
            <SimpleMetricCard
              title="Utilization"
              value={`${utilization}%`}
              icon={Gauge}
              iconColor="text-warning"
            />
            <SimpleMetricCard
              title="Avg Response"
              value={`${avgResponse}ms`}
              icon={Clock}
              iconColor="text-accent"
            />
          </div>

          {/* Server Cluster and Request Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ServerCluster servers={servers} />
            <RequestQueue requests={queue} />
          </div>

          {/* Activity Logs */}
          <ActivityLogs logs={logs} />
        </main>
      </div>
    </div>
  );
};

export default Index;
