
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomAvailabilityToggle from "@/components/settings/RoomAvailabilityToggle";
import LecturerManagement from "@/components/settings/LecturerManagement";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("rooms");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage system settings and configurations
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="rooms">Room Availability</TabsTrigger>
          <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms">
          <RoomAvailabilityToggle />
        </TabsContent>
        
        <TabsContent value="lecturers">
          <LecturerManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
