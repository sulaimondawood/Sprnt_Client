import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/RegisterPage";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BookRidePage from "./pages/dashboard/BookRidePage";
import TripHistoryPage from "./pages/dashboard/TripHistoryPage";
import WalletPage from "./pages/dashboard/WalletPage";
import SupportPage from "./pages/dashboard/SupportPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import VehiclePage from "./pages/dashboard/VehiclePage";
import DocumentsPage from "./pages/dashboard/DocumentsPage";
import RatingsPage from "./pages/dashboard/RatingsPage";
import CurrentTripPage from "./pages/dashboard/CurrentTripPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";
import NotFound from "./pages/NotFound";
import { TanstackProvider } from "./services/providers/tanstack-provider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TripDetailsPage from "./pages/dashboard/trips/TripDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <TanstackProvider>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="book" element={<BookRidePage />} />
              <Route path="trips" element={<TripHistoryPage />} />
              <Route path="trips/:tripId" element={<TripDetailsPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="earnings" element={<WalletPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="vehicle" element={<VehiclePage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="ratings" element={<RatingsPage />} />
              <Route path="current-trip" element={<CurrentTripPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </TanstackProvider>
);

export default App;
