import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { ServerCard } from "@/components/ServerCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Activity, Zap, Users, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      
      <div className="relative">
        <Header />
        
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Requests/sec"
              value="8,432"
              change="+12.5%"
              changeType="positive"
              icon={Activity}
              trend="up"
            />
            <MetricCard
              title="Avg Response Time"
              value="45ms"
              change="-8.3%"
              changeType="positive"
              icon={Zap}
              trend="down"
            />
            <MetricCard
              title="Active Connections"
              value="1,247"
              change="+3.2%"
              changeType="neutral"
              icon={Users}
              trend="up"
            />
            <MetricCard
              title="Uptime"
              value="99.98%"
              change="30 days"
              changeType="positive"
              icon={Clock}
              trend="stable"
            />
          </div>

          {/* Performance Chart */}
          <div className="mb-8">
            <PerformanceChart />
          </div>

          {/* Server Pool */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-2">Server Pool</h2>
            <p className="text-muted-foreground mb-6">Real-time status of all load-balanced servers</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <ServerCard
              name="lb-prod-01"
              region="US-East-1"
              status="healthy"
              load={42}
              connections={312}
              responseTime={38}
            />
            <ServerCard
              name="lb-prod-02"
              region="US-West-2"
              status="healthy"
              load={58}
              connections={421}
              responseTime={42}
            />
            <ServerCard
              name="lb-prod-03"
              region="EU-Central-1"
              status="healthy"
              load={35}
              connections={267}
              responseTime={36}
            />
            <ServerCard
              name="lb-prod-04"
              region="AP-Southeast-1"
              status="degraded"
              load={78}
              connections={189}
              responseTime={68}
            />
            <ServerCard
              name="lb-prod-05"
              region="EU-West-1"
              status="healthy"
              load={51}
              connections={334}
              responseTime={41}
            />
            <ServerCard
              name="lb-prod-06"
              region="US-East-2"
              status="healthy"
              load={46}
              connections={298}
              responseTime={39}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
