import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import Categories from "./pages/categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
]);
