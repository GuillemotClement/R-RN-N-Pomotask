import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Homepage },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
