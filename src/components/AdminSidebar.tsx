
import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart2,
  MessageSquare,
  Table,
  Settings,
  Menu,
  LogOut,
  PieChart,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-campus-purple text-white"
                : "text-gray-600 hover:bg-campus-light-purple hover:text-campus-dark-purple"
            )}
            onClick={onClick}
          >
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-campus-dark-purple text-white border-none">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type AdminSidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  toggleSidebar,
  currentRoute,
  setCurrentRoute,
}) => {
  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <img
              src="/tut-logo.png"
              alt="Tshwane University of Technology"
              className="h-8 w-auto mr-2"
            />
            <span className="font-bold text-campus-dark text-xl">SCSP</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "rounded-full",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="flex flex-col flex-1 py-4 px-2 space-y-1">
        <NavLink
          to="/admin/dashboard"
          icon={<BarChart2 size={20} />}
          label="Dashboard"
          isActive={currentRoute === "/admin/dashboard"}
          onClick={() => setCurrentRoute("/admin/dashboard")}
        />
        <NavLink
          to="/admin/maintenance-stats"
          icon={<PieChart size={20} />}
          label="Maintenance Stats"
          isActive={currentRoute === "/admin/maintenance-stats"}
          onClick={() => setCurrentRoute("/admin/maintenance-stats")}
        />
        <NavLink
          to="/admin/maintenance-chat"
          icon={<MessageSquare size={20} />}
          label="Maintenance Chat"
          isActive={currentRoute === "/admin/maintenance-chat"}
          onClick={() => setCurrentRoute("/admin/maintenance-chat")}
        />
        <NavLink
          to="/admin/requests"
          icon={<Table size={20} />}
          label="All Requests"
          isActive={currentRoute === "/admin/requests"}
          onClick={() => setCurrentRoute("/admin/requests")}
        />
        <NavLink
          to="/admin/settings"
          icon={<Building size={20} />}
          label="Campus Resources"
          isActive={currentRoute === "/admin/settings"}
          onClick={() => setCurrentRoute("/admin/settings")}
        />
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-600 hover:bg-campus-light-purple hover:text-campus-dark-purple",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut size={20} className="mr-2" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
