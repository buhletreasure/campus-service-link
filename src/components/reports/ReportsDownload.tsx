
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface ReportType {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
}

const reportsList: ReportType[] = [
  {
    id: "user-report",
    name: "User Activity Report",
    description: "Detailed breakdown of user activities and login statistics",
    lastGenerated: "2025-05-10"
  },
  {
    id: "lecturer-report",
    name: "Lecturer Allocation Report",
    description: "Overview of lecturers and their assigned courses",
    lastGenerated: "2025-05-09"
  },
  {
    id: "building-report",
    name: "Building Usage Report",
    description: "Analytics on classroom and building utilization",
    lastGenerated: "2025-05-08"
  },
  {
    id: "student-report",
    name: "Student Engagement Report",
    description: "Statistics on student participation and attendance",
    lastGenerated: "2025-05-11"
  },
];

export default function ReportsDownload() {
  const handleDownload = (reportId: string, reportName: string) => {
    // In a real implementation, this would trigger an API call to generate and download the report
    toast.success(`Downloading ${reportName}...`, {
      description: "Your report will be ready in a moment"
    });
    
    console.log(`Downloading report: ${reportId}`);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${reportName} downloaded successfully!`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {reportsList.map((report) => (
          <Card key={report.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                {report.name}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                {report.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Last generated: {report.lastGenerated}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 bg-campus-light-purple hover:bg-campus-purple hover:text-white"
                  onClick={() => handleDownload(report.id, report.name)}
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
