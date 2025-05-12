
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LecturerManagement from "@/components/settings/LecturerManagement";
import { School } from "lucide-react";

export default function Lecturers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img 
          src="/tut-logo.png" 
          alt="Tshwane University of Technology" 
          className="h-16 w-auto" 
        />
        <div>
          <h1 className="text-3xl font-bold">Lecturer Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage university lecturers
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <School size={20} />
            <span>Lecturer Administration</span>
          </CardTitle>
          <CardDescription>
            Manage academic staff and their assignments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LecturerManagement />
        </CardContent>
      </Card>
    </div>
  );
}
