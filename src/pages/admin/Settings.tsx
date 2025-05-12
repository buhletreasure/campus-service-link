
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import RoomAvailabilityToggle from "@/components/settings/RoomAvailabilityToggle";
import { Building } from "lucide-react";

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
          <h1 className="text-3xl font-bold">Manage Buildings</h1>
          <p className="text-muted-foreground">
            Configure campus buildings and facilities
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <span>Building Administration Panel</span>
          </CardTitle>
          <CardDescription>
            Configure campus buildings and related facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b justify-start">
              <TabsTrigger value="rooms" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Building size={18} />
                <span>Room Management</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="rooms">
                <RoomAvailabilityToggle />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
