
import React from "react";
import RequestsTable from "@/components/requests/RequestsTable";

export default function Requests() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">All Requests</h1>
      <p className="text-muted-foreground">
        Manage and view all booking and maintenance requests across campus.
      </p>
      <RequestsTable />
    </div>
  );
}
