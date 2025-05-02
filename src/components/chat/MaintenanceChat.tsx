
import React, { useState } from "react";
import { Send, PaperclipIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: number;
  content: string;
  sender: "admin" | "user";
  timestamp: Date;
  attachmentUrl?: string;
};

type Ticket = {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  status: "Open" | "In Progress" | "Resolved";
  title: string;
  location: string;
  priority: "Low" | "Medium" | "High";
  createdAt: Date;
  messages: Message[];
  unread: boolean;
};

// Dummy data for tickets
const initialTickets: Ticket[] = [
  {
    id: 1,
    userId: "STD12345",
    userName: "John Smith",
    status: "Open",
    title: "Broken projector in Room A101",
    location: "Building A, Room 101",
    priority: "High",
    createdAt: new Date("2025-05-02T09:30:00"),
    unread: true,
    messages: [
      {
        id: 1,
        content: "The projector in Room A101 is not working. The screen stays blue when connected.",
        sender: "user",
        timestamp: new Date("2025-05-02T09:30:00"),
      },
      {
        id: 2,
        content: "Thank you for reporting. I'll assign a technician to check it today.",
        sender: "admin",
        timestamp: new Date("2025-05-02T09:45:00"),
      },
    ],
  },
  {
    id: 2,
    userId: "STD67890",
    userName: "Alice Johnson",
    status: "In Progress",
    title: "Air conditioning not working in Lab B202",
    location: "Building B, Room 202",
    priority: "Medium",
    createdAt: new Date("2025-05-01T14:15:00"),
    unread: false,
    messages: [
      {
        id: 1,
        content: "The AC in Lab B202 isn't cooling properly. It's very uncomfortable to work in there.",
        sender: "user",
        timestamp: new Date("2025-05-01T14:15:00"),
      },
      {
        id: 2,
        content: "We've logged your request. Our HVAC team will investigate this issue.",
        sender: "admin",
        timestamp: new Date("2025-05-01T14:35:00"),
      },
      {
        id: 3,
        content: "An HVAC technician has been dispatched. They should arrive within the hour.",
        sender: "admin",
        timestamp: new Date("2025-05-01T15:20:00"),
      },
    ],
  },
  {
    id: 3,
    userId: "STD54321",
    userName: "Robert Wilson",
    status: "Resolved",
    title: "Leaking water fountain near library",
    location: "Main Library, Ground Floor",
    priority: "Low",
    createdAt: new Date("2025-04-29T11:05:00"),
    unread: false,
    messages: [
      {
        id: 1,
        content: "The water fountain near the library entrance is leaking and creating a puddle on the floor.",
        sender: "user",
        timestamp: new Date("2025-04-29T11:05:00"),
      },
      {
        id: 2,
        content: "Thanks for reporting. We'll send someone to fix it.",
        sender: "admin",
        timestamp: new Date("2025-04-29T11:15:00"),
      },
      {
        id: 3,
        content: "The plumber has fixed the leak and dried the floor. Please let us know if it starts leaking again.",
        sender: "admin",
        timestamp: new Date("2025-04-29T14:30:00"),
        attachmentUrl: "https://placehold.co/200x150",
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "In Progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-amber-100 text-amber-800";
    case "Low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function MaintenanceChat() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"Open" | "In Progress" | "Resolved">("Open");

  const filteredTickets = tickets.filter((ticket) => ticket.status === activeTab);

  const handleSelectTicket = (ticket: Ticket) => {
    // Mark as read when opening
    if (ticket.unread) {
      const updatedTickets = tickets.map((t) =>
        t.id === ticket.id ? { ...t, unread: false } : t
      );
      setTickets(updatedTickets);
    }
    setActiveTicket(ticket);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;

    const newMsg: Message = {
      id: activeTicket.messages.length + 1,
      content: newMessage,
      sender: "admin",
      timestamp: new Date(),
    };

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === activeTicket.id
        ? {
            ...ticket,
            messages: [...ticket.messages, newMsg],
          }
        : ticket
    );

    setTickets(updatedTickets);
    setActiveTicket({
      ...activeTicket,
      messages: [...activeTicket.messages, newMsg],
    });
    setNewMessage("");
  };

  const handleUpdateStatus = (newStatus: "Open" | "In Progress" | "Resolved") => {
    if (!activeTicket) return;

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === activeTicket.id ? { ...ticket, status: newStatus } : ticket
    );

    const updatedTicket = { ...activeTicket, status: newStatus };
    setTickets(updatedTickets);
    setActiveTicket(updatedTicket);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-6rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Maintenance Chat</h1>
      
      <div className="grid gap-6 h-full grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>Maintenance Tickets</CardTitle>
            <Tabs
              defaultValue="Open"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "Open" | "In Progress" | "Resolved")}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="Open" className="flex-1">
                  Open
                  <Badge variant="outline" className="ml-1">
                    {tickets.filter((t) => t.status === "Open").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="In Progress" className="flex-1">
                  In Progress
                  <Badge variant="outline" className="ml-1">
                    {tickets.filter((t) => t.status === "In Progress").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="Resolved" className="flex-1">
                  Resolved
                  <Badge variant="outline" className="ml-1">
                    {tickets.filter((t) => t.status === "Resolved").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-2 pr-4">
                {filteredTickets.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No tickets in this status
                  </p>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={cn(
                        "p-3 rounded-md cursor-pointer transition-all",
                        activeTicket?.id === ticket.id
                          ? "bg-campus-purple text-white"
                          : "hover:bg-gray-100"
                      )}
                      onClick={() => handleSelectTicket(ticket)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium">{ticket.title}</div>
                        {ticket.unread && (
                          <span className="w-2 h-2 bg-campus-purple rounded-full" />
                        )}
                      </div>
                      <div className="text-sm opacity-80 mt-1">{ticket.location}</div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge
                          className={cn(
                            "text-xs",
                            getPriorityColor(ticket.priority),
                            activeTicket?.id === ticket.id && "bg-white/20 text-white"
                          )}
                        >
                          {ticket.priority}
                        </Badge>
                        <span className="text-xs opacity-70">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {activeTicket ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage
                        src={activeTicket.userAvatar}
                        alt={activeTicket.userName}
                      />
                      <AvatarFallback className="bg-campus-purple text-white">
                        {activeTicket.userName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>
                        {activeTicket.title}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        {activeTicket.userName} - {activeTicket.userId}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={cn(getStatusColor(activeTicket.status))}>
                      {activeTicket.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={activeTicket.status === "Open" ? "default" : "outline"}
                        onClick={() => handleUpdateStatus("Open")}
                        className="h-7"
                      >
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant={activeTicket.status === "In Progress" ? "default" : "outline"}
                        onClick={() => handleUpdateStatus("In Progress")}
                        className="h-7"
                      >
                        In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant={activeTicket.status === "Resolved" ? "default" : "outline"}
                        onClick={() => handleUpdateStatus("Resolved")}
                        className="h-7"
                      >
                        Resolved
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="space-y-4">
                    {activeTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "admin" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.sender === "admin"
                              ? "bg-campus-purple text-white"
                              : "bg-gray-100"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.attachmentUrl && (
                            <img
                              src={message.attachmentUrl}
                              alt="Attachment"
                              className="mt-2 rounded-md max-w-full"
                            />
                          )}
                          <div
                            className={cn(
                              "text-xs mt-1 text-right",
                              message.sender === "admin" ? "text-white/70" : "text-gray-500"
                            )}
                          >
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="pt-3">
                <div className="flex w-full gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0"
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    className="bg-campus-purple hover:bg-campus-dark-purple"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <User className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No ticket selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select a ticket from the list to view the conversation
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
