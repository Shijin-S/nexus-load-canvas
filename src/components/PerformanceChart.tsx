import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { time: "00:00", requests: 4500, latency: 45 },
  { time: "04:00", requests: 3200, latency: 38 },
  { time: "08:00", requests: 7800, latency: 52 },
  { time: "12:00", requests: 9200, latency: 48 },
  { time: "16:00", requests: 8500, latency: 43 },
  { time: "20:00", requests: 6300, latency: 41 },
  { time: "23:59", requests: 5100, latency: 44 },
];

export const PerformanceChart = () => {
  return (
    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
        <p className="text-sm text-muted-foreground">Last 24 hours</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
          />
          <YAxis 
            yAxisId="left"
            stroke="hsl(var(--primary))" 
            fontSize={12}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--accent))" 
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="requests" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            name="Requests/sec"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="latency" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            name="Latency (ms)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
