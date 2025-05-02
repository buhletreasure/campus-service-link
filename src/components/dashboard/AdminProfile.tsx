
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AdminProfileProps {
  name: string;
  email: string;
  role: string;
  department: string;
  avatarSrc?: string;
  lastLogin?: string;
}

export function AdminProfile({
  name,
  email,
  role,
  department,
  avatarSrc,
  lastLogin = "Today at 08:45 AM",
}: AdminProfileProps) {
  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Admin Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback className="bg-campus-purple text-white text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Badge variant="outline" className="bg-campus-light-purple text-campus-dark-purple border-campus-purple">
                {role}
              </Badge>
              <Badge variant="outline">{department}</Badge>
            </div>
          </div>
          <div className="ml-auto text-right hidden sm:block">
            <p className="text-sm text-muted-foreground">Last login</p>
            <p className="text-sm font-medium">{lastLogin}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
