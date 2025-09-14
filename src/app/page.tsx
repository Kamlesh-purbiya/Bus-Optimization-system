import { KpiCard } from "@/components/dashboard/kpi-card";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { RidershipChart } from "@/components/dashboard/ridership-chart";
import { ComparisonChart } from "@/components/dashboard/comparison-chart";
import { Users, Bus, Clock, Route } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Buses"
          value="120"
          icon={Bus}
          description="Across all active routes"
        />
        <KpiCard
          title="Active Routes"
          value="15"
          icon={Route}
          description="Currently in operation"
        />
        <KpiCard
          title="Avg. On-Time Rate"
          value="92%"
          icon={Clock}
          description="+2% from last week"
        />
        <KpiCard
          title="Total Passengers"
          value="45,823"
          icon={Users}
          description="Today's total ridership"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RidershipChart />
        </div>
        <div className="lg:col-span-2">
          <AlertsPanel />
        </div>
      </div>
      
      <div>
        <ComparisonChart />
      </div>
    </div>
  );
}
