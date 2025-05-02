
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Open", value: 15, color: "#f87171" },
  { name: "In Progress", value: 8, color: "#fbbf24" },
  { name: "Resolved", value: 27, color: "#34d399" },
];

const COLORS = ["#f87171", "#fbbf24", "#34d399"];

export function MaintenanceStatusChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Maintenance Requests by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip
              formatter={(value, name) => [`${value} requests`, name]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
