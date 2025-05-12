
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReportsDownload from "@/components/reports/ReportsDownload";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img 
          src="/tut-logo.png" 
          alt="Tshwane University of Technology" 
          className="h-16 w-auto" 
        />
        <div>
          <h1 className="text-3xl font-bold">Reports Management</h1>
          <p className="text-muted-foreground">
            Generate and download system reports
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            <span>Available Reports</span>
          </CardTitle>
          <CardDescription>
            Download reports for user activity, lecturer allocations, and building usage
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReportsDownload />
        </CardContent>
      </Card>
    </div>
  );
}
