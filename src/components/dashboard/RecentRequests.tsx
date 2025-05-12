
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const recentRequests = [
  {
    id: "REQ-001",
    type: "Maintenance",
    description: "Broken projector in Room A101",
    status: "Open",
    requestedBy: "John Smith",
    date: "2025-05-01",
  },
  {
    id: "REQ-002",
    type: "Booking",
    description: "Study room booking for CS group",
    status: "Approved",
    requestedBy: "Alice Johnson",
    date: "2025-05-01",
  },
  {
    id: "REQ-003",
    type: "Maintenance",
    description: "Air conditioning not working in Lab B202",
    status: "In Progress",
    requestedBy: "Michael Brown",
    date: "2025-04-30",
  },
  {
    id: "REQ-004",
    type: "Booking",
    description: "Conference room for department meeting",
    status: "Pending",
    requestedBy: "Sarah Davis",
    date: "2025-04-30",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "In Progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Approved":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Pending":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function RecentRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                  {request.description}
                </TableCell>
                <TableCell>
                  <Badge className={cn(getStatusColor(request.status))}>
                    {request.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
