import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DriverProvider } from "./contexts/DriverContext";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DocumentsPage from "./pages/dashboard/document/DocumentsPage";
import ProfilePage from "./pages/dashboard/profile/ProfilePage";
import RatingsPage from "./pages/dashboard/rating/RatingsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import SupportPage from "./pages/dashboard/SupportPage";
import BookRidePage from "./pages/dashboard/trips/BookRidePage";
import CurrentTripPage from "./pages/dashboard/trips/CurrentTripPage";
import TripDetailsPage from "./pages/dashboard/trips/TripDetailsPage";
import TripHistoryPage from "./pages/dashboard/trips/TripHistoryPage";
import AddVehiclePage from "./pages/dashboard/vehicle/AddVehiclePage";
import VehiclePage from "./pages/dashboard/vehicle/VehiclePage";
import WalletPage from "./pages/dashboard/WalletPage";
import DashboardLayout from "./pages/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { StompProvider } from "./services/providers/stomp-provider";
import { TanstackProvider } from "./services/providers/tanstack-provider";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { GuestRoute } from "./pages/GuestRoutes";

const App = () => (
  <TanstackProvider>
    <StompProvider>
      <AuthProvider>
        <DriverProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<GuestRoute />}>
                  <Route path="/auth/register" element={<RegisterPage />} />
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route
                    path="/auth/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/auth/verify-email"
                    element={<EmailVerificationPage />}
                  />
                  <Route
                    path="/auth/reset-password"
                    element={<ResetPasswordPage />}
                  />
                </Route>

                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="book-ride" element={<BookRidePage />} />
                  <Route path="current-trip" element={<CurrentTripPage />} />
                  <Route path="trips" element={<TripHistoryPage />} />
                  <Route path="trips/:tripId" element={<TripDetailsPage />} />
                  <Route path="wallet" element={<WalletPage />} />
                  <Route path="earnings" element={<WalletPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="vehicle" element={<VehiclePage />} />
                  <Route path="vehicle/add" element={<AddVehiclePage />} />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route path="ratings" element={<RatingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DriverProvider>
      </AuthProvider>
    </StompProvider>
  </TanstackProvider>
);

export default App;
