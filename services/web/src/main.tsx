import indexRoute from "@routes/indexRoute";
import registerRoute from "@routes/register";
import rootRoute from "@routes/root";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const routeTree = rootRoute.addChildren([indexRoute, registerRoute]);
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
