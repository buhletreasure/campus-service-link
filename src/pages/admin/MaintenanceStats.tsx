
import React from "react";
import { MaintenanceStatusChart } from "@/components/dashboard/MaintenanceStatusChart";
import { RecentRequests } from "@/components/dashboard/RecentRequests";

export default function MaintenanceStats() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Maintenance Statistics</h1>
        <p className="text-muted-foreground mt-2">
          Overview of maintenance requests and their current status.
        </p>
      </div>

      <div className="grid gap-6">
        <MaintenanceStatusChart />
        <RecentRequests />
      </div>
    </div>
  );
}
