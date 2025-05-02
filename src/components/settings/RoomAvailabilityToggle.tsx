
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building, CheckSquare, SquareOff, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  features: string[];
  isAvailable: boolean;
}

// Mock data for rooms
const initialRooms: Room[] = [
  {
    id: "A101",
    name: "Lecture Hall A101",
    building: "Building A",
    floor: 1,
    capacity: 120,
    features: ["Projector", "Whiteboard", "Computer"],
    isAvailable: true,
  },
  {
    id: "A102",
    name: "Study Room A102",
    building: "Building A",
    floor: 1,
    capacity: 10,
    features: ["Whiteboard"],
    isAvailable: true,
  },
  {
    id: "B201",
    name: "Computer Lab B201",
    building: "Building B",
    floor: 2,
    capacity: 30,
    features: ["Computers", "Projector", "Whiteboard"],
    isAvailable: true,
  },
  {
    id: "B202",
    name: "Lab B202",
    building: "Building B",
    floor: 2,
    capacity: 25,
    features: ["Lab Equipment", "Whiteboard"],
    isAvailable: false,
  },
  {
    id: "C301",
    name: "Conference Room C301",
    building: "Building C",
    floor: 3,
    capacity: 20,
    features: ["Video Conferencing", "Whiteboard", "Smart TV"],
    isAvailable: true,
  },
  {
    id: "C305",
    name: "Lecture Hall C305",
    building: "Building C",
    floor: 3,
    capacity: 100,
    features: ["Projector", "Audio System", "Whiteboard"],
    isAvailable: true,
  },
  {
    id: "D404",
    name: "Study Room D404",
    building: "Building D",
    floor: 4,
    capacity: 8,
    features: ["Whiteboard"],
    isAvailable: false,
  },
  {
    id: "E505",
    name: "Laboratory E505",
    building: "Building E",
    floor: 5,
    capacity: 40,
    features: ["Lab Equipment", "Chemical Storage", "Safety Shower"],
    isAvailable: true,
  },
];

// Group by building
const groupRoomsByBuilding = (rooms: Room[]) => {
  const groupedRooms: Record<string, Room[]> = {};
  
  rooms.forEach((room) => {
    if (!groupedRooms[room.building]) {
      groupedRooms[room.building] = [];
    }
    groupedRooms[room.building].push(room);
  });
  
  return groupedRooms;
};

export default function RoomAvailabilityToggle() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"enable" | "disable">("enable");
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const groupedRooms = groupRoomsByBuilding(rooms);
  const buildings = Object.keys(groupedRooms);
  
  const handleRoomToggle = (roomId: string, isAvailable: boolean) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, isAvailable } : room
    );
    
    setRooms(updatedRooms);
    toast({
      title: `Room ${roomId} is now ${isAvailable ? "available" : "unavailable"}`,
      description: `The room status has been updated successfully.`,
    });
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRooms(
      selectedRooms.includes(roomId)
        ? selectedRooms.filter((id) => id !== roomId)
        : [...selectedRooms, roomId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(rooms.map((room) => room.id));
    }
  };

  const handleBulkAction = (action: "enable" | "disable") => {
    setDialogAction(action);
    setIsDialogOpen(true);
  };

  const confirmBulkAction = () => {
    setIsBulkUpdating(true);
    
    setTimeout(() => {
      const updatedRooms = rooms.map((room) =>
        selectedRooms.includes(room.id)
          ? { ...room, isAvailable: dialogAction === "enable" }
          : room
      );
      
      setRooms(updatedRooms);
      setIsDialogOpen(false);
      setSelectedRooms([]);
      setIsBulkUpdating(false);
      
      toast({
        title: `Bulk update complete`,
        description: `${selectedRooms.length} rooms have been ${
          dialogAction === "enable" ? "enabled" : "disabled"
        } for booking.`,
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Room Availability Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Toggle room availability for bookings across campus buildings.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bulk Actions</span>
            <Badge variant="outline" className="ml-2">
              {selectedRooms.length} rooms selected
            </Badge>
          </CardTitle>
          <CardDescription>
            Select multiple rooms to update their availability status at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={isBulkUpdating}
              className="flex-1"
            >
              {selectedRooms.length === rooms.length ? (
                <>
                  <SquareOff className="h-4 w-4 mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Select All
                </>
              )}
            </Button>
            <Button
              variant="default"
              onClick={() => handleBulkAction("enable")}
              disabled={selectedRooms.length === 0 || isBulkUpdating}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Make Available
            </Button>
            <Button
              variant="default"
              onClick={() => handleBulkAction("disable")}
              disabled={selectedRooms.length === 0 || isBulkUpdating}
              className="flex-1 bg-amber-600 hover:bg-amber-700"
            >
              Make Unavailable
            </Button>
          </div>
        </CardContent>
      </Card>

      {buildings.map((building) => (
        <Card key={building} className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              {building}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="hidden md:table-cell">Floor</TableHead>
                  <TableHead className="hidden md:table-cell">Capacity</TableHead>
                  <TableHead className="hidden md:table-cell">Features</TableHead>
                  <TableHead className="text-right">Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedRooms[building].map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes(room.id)}
                        onChange={() => handleRoomSelect(room.id)}
                        disabled={isBulkUpdating}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-campus-purple"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{room.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {room.id}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {room.floor}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {room.capacity} seats
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {room.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs py-0"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Label
                          htmlFor={`room-${room.id}`}
                          className={cn(room.isAvailable ? "text-green-600" : "text-amber-600")}
                        >
                          {room.isAvailable ? "Available" : "Unavailable"}
                        </Label>
                        <Switch
                          id={`room-${room.id}`}
                          checked={room.isAvailable}
                          onCheckedChange={(isChecked) => handleRoomToggle(room.id, isChecked)}
                          disabled={isBulkUpdating}
                          className={cn(
                            room.isAvailable ? "bg-green-600" : "bg-amber-600",
                            "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-amber-600"
                          )}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Bulk Action Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "enable" ? "Make Rooms Available" : "Make Rooms Unavailable"}
            </DialogTitle>
            <DialogDescription>
              You are about to {dialogAction === "enable" ? "enable" : "disable"} {selectedRooms.length}{" "}
              {selectedRooms.length === 1 ? "room" : "rooms"} for booking. This action will immediately
              affect any pending booking requests for these rooms.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">Selected Rooms:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedRooms.map((roomId) => (
                <Badge key={roomId} variant="outline">
                  {roomId}
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isBulkUpdating}>
              Cancel
            </Button>
            <Button
              onClick={confirmBulkAction}
              disabled={isBulkUpdating}
              className={cn(
                "relative",
                dialogAction === "enable" ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"
              )}
            >
              {isBulkUpdating && (
                <RefreshCw className="animate-spin h-4 w-4 mr-2 inline-block" />
              )}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
