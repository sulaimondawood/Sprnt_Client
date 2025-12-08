import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import { MainLayout } from "./layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);
