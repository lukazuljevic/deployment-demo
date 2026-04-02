import ErrorBoundary from "@components/ErrorBoundary";
import "@styles/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
