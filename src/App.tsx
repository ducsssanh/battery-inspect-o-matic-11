
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import TesterDashboard from "./pages/TesterDashboard";
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
                    <div className="container px-4 py-6 mx-auto max-w-7xl">
                      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <DashboardLayout>
                    <div className="container px-4 py-6 mx-auto max-w-7xl">
                      <h1 className="text-2xl font-bold">Customer Dashboard</h1>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reception/dashboard"
              element={
                <ProtectedRoute allowedRoles={["reception"]}>
                  <DashboardLayout>
                    <div className="container px-4 py-6 mx-auto max-w-7xl">
                      <h1 className="text-2xl font-bold">Reception Dashboard</h1>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales/dashboard"
              element={
                <ProtectedRoute allowedRoles={["sales"]}>
                  <DashboardLayout>
                    <div className="container px-4 py-6 mx-auto max-w-7xl">
                      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
                    </div>
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
