
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import TesterDashboard from "./pages/dashboards/tester/TesterDashboard";
import ManagerDashboard from "./pages/dashboards/manager/ManagerDashboard";
import CustomerDashboard from "./pages/dashboards/customer/CustomerDashboard";
import ReceptionDashboard from "./pages/dashboards/reception/ReceptionDashboard";
import SalesDashboard from "./pages/dashboards/sales/SalesDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHeader from "./components/DashboardHeader";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <DashboardHeader />
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/tester/dashboard"
              element={
                <ProtectedRoute allowedRoles={["tester"]}>
                  <DashboardLayout>
                    <TesterDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/dashboard"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <DashboardLayout>
                    <ManagerDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <DashboardLayout>
                    <CustomerDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reception/dashboard"
              element={
                <ProtectedRoute allowedRoles={["reception"]}>
                  <DashboardLayout>
                    <ReceptionDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales/dashboard"
              element={
                <ProtectedRoute allowedRoles={["sales"]}>
                  <DashboardLayout>
                    <SalesDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
