
import React from "react";
import { BarChart2, MessageSquare, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { BookingChart } from "@/components/dashboard/BookingChart";
import { AdminProfile } from "@/components/dashboard/AdminProfile";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard. Here's an overview of campus activity.
        </p>
      </div>

      <AdminProfile 
        name="John Doe"
        email="john.doe@tut.ac.za"
        role="Campus Administrator"
        department="Facility Management"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value="1,284"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Maintenance Tickets"
          value="23"
          icon={MessageSquare}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Avg. Response Time"
          value="1.2 hours"
          icon={BarChart2}
          trend={{ value: 18, isPositive: true }}
        />
        <StatCard
          title="Room Utilization"
          value="76%"
          icon={BarChart2}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid gap-4">
        <BookingChart />
      </div>
    </div>
  );
}
