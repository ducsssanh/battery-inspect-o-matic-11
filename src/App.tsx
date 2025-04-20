
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* TEMPORARY: Authentication is bypassed for development */}
            <Route
              path="/tester/dashboard"
              element={
                <ProtectedRoute allowedRoles={["tester"]}>
                  <TesterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/dashboard"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <div>Manager Dashboard (Placeholder)</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <div>Customer Dashboard (Placeholder)</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reception/dashboard"
              element={
                <ProtectedRoute allowedRoles={["reception"]}>
                  <div>Reception Dashboard (Placeholder)</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales/dashboard"
              element={
                <ProtectedRoute allowedRoles={["sales"]}>
                  <div>Sales Dashboard (Placeholder)</div>
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
