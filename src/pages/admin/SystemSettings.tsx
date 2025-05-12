
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Bell, Shield, Globe } from "lucide-react";
import { toast } from "sonner";

export default function SystemSettings() {
  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img 
          src="/tut-logo.png" 
          alt="Tshwane University of Technology" 
          className="h-16 w-auto" 
        />
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and settings
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            <span>System Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure application settings, notifications, and security
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full rounded-none border-b justify-start">
              <TabsTrigger value="general" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Settings size={18} />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Bell size={18} />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2 data-[state=active]:bg-campus-light-purple">
                <Shield size={18} />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="general">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">System Name</Label>
                      <Input id="system-name" defaultValue="Smart Campus Space Planning" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@tut.ac.za" />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Takes the system offline for maintenance
                        </p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode for the admin interface
                        </p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveGeneral}
                    className="bg-campus-purple hover:bg-campus-dark-purple"
                  >
                    Save General Settings
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications for important events
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send SMS notifications for critical alerts
                        </p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send alerts when maintenance is scheduled
                        </p>
                      </div>
                      <Switch id="maintenance-alerts" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notification-email">Notification Email Address</Label>
                      <Input id="notification-email" type="email" defaultValue="notifications@tut.ac.za" />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveNotifications}
                    className="bg-campus-purple hover:bg-campus-dark-purple"
                  >
                    Save Notification Settings
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all admin accounts
                        </p>
                      </div>
                      <Switch id="two-factor-auth" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log users out after inactivity
                        </p>
                      </div>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password-policy">Password Policy</Label>
                      <select 
                        id="password-policy"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue="strong"
                      >
                        <option value="basic">Basic (8+ characters)</option>
                        <option value="medium">Medium (8+ chars, numbers & letters)</option>
                        <option value="strong">Strong (8+ chars, numbers, symbols & mixed case)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                      <Input id="login-attempts" type="number" defaultValue="5" />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveSecurity}
                    className="bg-campus-purple hover:bg-campus-dark-purple"
                  >
                    Save Security Settings
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
