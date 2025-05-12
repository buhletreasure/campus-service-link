
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import MaintenanceChat from "./pages/admin/MaintenanceChat";
import Requests from "./pages/admin/Requests";
import Settings from "./pages/admin/Settings";
import MaintenanceStats from "./pages/admin/MaintenanceStats";
import Lecturers from "./pages/admin/Lecturers";
import AdminLayout from "./components/AdminLayout";

const queryClient = new QueryClient();

const AdminRoute = ({ component: Component }: { component: React.FC }) => (
  <AdminLayout>
    <Component />
  </AdminLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminRoute component={Dashboard} />} />
          <Route path="/admin/maintenance-chat" element={<AdminRoute component={MaintenanceChat} />} />
          <Route path="/admin/requests" element={<AdminRoute component={Requests} />} />
          <Route path="/admin/maintenance-stats" element={<AdminRoute component={MaintenanceStats} />} />
          <Route path="/admin/settings" element={<AdminRoute component={Settings} />} />
          <Route path="/admin/lecturers" element={<AdminRoute component={Lecturers} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
