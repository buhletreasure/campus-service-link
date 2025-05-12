
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import RoomAvailabilityToggle from "@/components/settings/RoomAvailabilityToggle";
import LecturerManagement from "@/components/settings/LecturerManagement";
import { Building, Users } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("rooms");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img 
          src="/tut-logo.png" 
          alt="Tshwane University of Technology" 
          className="h-16 w-auto" 
        />
        <div>
          <h1 className="text-3xl font-bold">Campus Resource Management</h1>
          <p className="text-muted-foreground">
            Manage lectures, rooms, and campus resources
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <span>Resource Administration Panel</span>
          </CardTitle>
          <CardDescription>
            Configure campus resources and manage lecturers
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b justify-start">
              <TabsTrigger value="rooms" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Building size={18} />
                <span>Room Management</span>
              </TabsTrigger>
              <TabsTrigger value="lecturers" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Users size={18} />
                <span>Lecturer Management</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="rooms">
                <RoomAvailabilityToggle />
              </TabsContent>
              
              <TabsContent value="lecturers">
                <LecturerManagement />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
