import { AuthProvider } from "@context/AuthContext";
import useAuth from "@hooks/useAuth";
import { router } from "@routes/router";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "main";
import { Toaster } from "react-hot-toast";

function InnerApp() {
  const auth = useAuth();
  const context = { auth, queryClient };
  return <RouterProvider router={router} context={context} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }}></Toaster>
    </AuthProvider>
  );
}

export default App;
