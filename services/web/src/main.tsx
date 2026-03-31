import indexRoute from "@routes/indexRoute";
import { registerRoute } from "@routes/register";
import rootRoute from "@routes/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

const routeTree = rootRoute.addChildren([indexRoute, registerRoute]);
const router = createRouter({ routeTree });
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" toastOptions={{ duration: 4000 }}></Toaster>
    </QueryClientProvider>
  </StrictMode>,
);
