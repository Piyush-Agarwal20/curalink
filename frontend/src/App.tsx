import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { UserType } from "./lib/types";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignupPatient from "./pages/SignupPatient";
import SignupResearcher from "./pages/SignupResearcher";
import PatientDashboard from "./pages/PatientDashboard";
import ResearcherDashboard from "./pages/ResearcherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/patient" element={<SignupPatient />} />
          <Route path="/signup/researcher" element={<SignupResearcher />} />

          {/* Protected Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute requiredUserType={UserType.PATIENT}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Researcher Routes */}
          <Route
            path="/researcher/dashboard"
            element={
              <ProtectedRoute requiredUserType={UserType.RESEARCHER}>
                <ResearcherDashboard />
              </ProtectedRoute>
            }
          />

          {/* Generic Dashboard Redirect */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigate to="/patient/dashboard" replace />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
