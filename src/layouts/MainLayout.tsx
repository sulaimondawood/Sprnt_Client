import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
