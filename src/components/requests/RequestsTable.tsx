
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Ban, MoreVertical, Eye, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type RequestStatus = "Open" | "In Progress" | "Resolved" | "Pending" | "Approved" | "Cancelled";
type RequestType = "Booking" | "Maintenance";

interface Request {
  id: string;
  type: RequestType;
  description: string;
  status: RequestStatus;
  requestedBy: string;
  userId: string;
  room: string;
  date: string;
  time?: string;
}

// Mock data for requests
const initialRequests: Request[] = [
  {
    id: "REQ-001",
    type: "Maintenance",
    description: "Broken projector in Room A101",
    status: "Open",
    requestedBy: "John Smith",
    userId: "STD12345",
    room: "A101",
    date: "2025-05-01",
  },
  {
    id: "REQ-002",
    type: "Booking",
    description: "Study room booking for CS group",
    status: "Approved",
    requestedBy: "Alice Johnson",
    userId: "STD67890",
    room: "B202",
    date: "2025-05-03",
    time: "14:00-16:00",
  },
  {
    id: "REQ-003",
    type: "Maintenance",
    description: "Air conditioning not working in Lab B202",
    status: "In Progress",
    requestedBy: "Michael Brown",
    userId: "STD54321",
    room: "B202",
    date: "2025-04-30",
  },
  {
    id: "REQ-004",
    type: "Booking",
    description: "Conference room for department meeting",
    status: "Pending",
    requestedBy: "Sarah Davis",
    userId: "STD98765",
    room: "C305",
    date: "2025-05-05",
    time: "10:00-12:00",
  },
  {
    id: "REQ-005",
    type: "Maintenance",
    description: "Leaking water fountain near library",
    status: "Resolved",
    requestedBy: "Robert Wilson",
    userId: "STD13579",
    room: "Library",
    date: "2025-04-29",
  },
  {
    id: "REQ-006",
    type: "Booking",
    description: "Engineering project group meeting",
    status: "Approved",
    requestedBy: "Emily Clark",
    userId: "STD24680",
    room: "D404",
    date: "2025-05-04",
    time: "15:00-17:00",
  },
  {
    id: "REQ-007",
    type: "Booking",
    description: "Physics lab session",
    status: "Cancelled",
    requestedBy: "David Anderson",
    userId: "STD11223",
    room: "E505",
    date: "2025-05-02",
    time: "09:00-11:00",
  },
];

const getStatusColor = (status: RequestStatus) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "In Progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Approved":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Pending":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "Cancelled":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export default function RequestsTable() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<RequestType | "All">("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState<Request | null>(null);

  const handleCancelDialogOpen = (request: Request) => {
    setRequestToCancel(request);
    setIsCancelDialogOpen(true);
  };

  const handleCancelRequest = () => {
    if (!requestToCancel) return;

    const updatedRequests = requests.map((request) =>
      request.id === requestToCancel.id
        ? { ...request, status: "Cancelled" as RequestStatus }
        : request
    );

    setRequests(updatedRequests);
    setIsCancelDialogOpen(false);
  };

  const handleReset = () => {
    setStatusFilter("All");
    setTypeFilter("All");
    setSearchQuery("");
  };

  const filteredRequests = requests.filter((request) => {
    // Apply status filter
    if (statusFilter !== "All" && request.status !== statusFilter) {
      return false;
    }

    // Apply type filter
    if (typeFilter !== "All" && request.type !== typeFilter) {
      return false;
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        request.id.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.requestedBy.toLowerCase().includes(query) ||
        request.userId.toLowerCase().includes(query) ||
        request.room.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          {(statusFilter !== "All" || typeFilter !== "All" || searchQuery) && (
            <Button 
              variant="ghost" 
              onClick={handleReset}
              className="flex-1 sm:flex-none"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-md">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as RequestStatus | "All")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value as RequestType | "All")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Booking">Booking</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Requested By</TableHead>
              <TableHead>Room</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {request.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusColor(request.status))}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{request.requestedBy}</div>
                    <div className="text-xs text-muted-foreground">{request.userId}</div>
                  </TableCell>
                  <TableCell>{request.room}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {request.date}
                    {request.time && <div className="text-xs">{request.time}</div>}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {request.type === "Booking" && request.status !== "Cancelled" && (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleCancelDialogOpen(request)}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Force Cancel
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Force Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {requestToCancel && (
            <div className="py-4">
              <p>
                <span className="font-medium">Booking ID:</span> {requestToCancel.id}
              </p>
              <p>
                <span className="font-medium">Room:</span> {requestToCancel.room}
              </p>
              <p>
                <span className="font-medium">Date:</span> {requestToCancel.date}
                {requestToCancel.time && `, ${requestToCancel.time}`}
              </p>
              <p>
                <span className="font-medium">Requested by:</span>{" "}
                {requestToCancel.requestedBy} ({requestToCancel.userId})
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleCancelRequest}>
              Force Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
