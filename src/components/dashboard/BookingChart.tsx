
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Mon", bookings: 12 },
  { name: "Tue", bookings: 18 },
  { name: "Wed", bookings: 29 },
  { name: "Thu", bookings: 24 },
  { name: "Fri", bookings: 32 },
  { name: "Sat", bookings: 8 },
  { name: "Sun", bookings: 5 },
];

export function BookingChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Bookings Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <Bar dataKey="bookings" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            <Tooltip
              cursor={{ fill: "rgba(155, 135, 245, 0.1)" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
