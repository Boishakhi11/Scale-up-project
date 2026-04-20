import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { RegisterPage } from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "portfolio/:slug", element: <PortfolioPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
