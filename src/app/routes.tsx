import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Prototype1 from "./pages/Prototype1";
import Prototype2 from "./pages/Prototype2";
import Prototype3 from "./pages/Prototype3";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/prototype-1",
    Component: Prototype1,
  },
  {
    path: "/prototype-2",
    Component: Prototype2,
  },
  {
    path: "/prototype-3",
    Component: Prototype3,
  },
]);
