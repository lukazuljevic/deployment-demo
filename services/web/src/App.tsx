import { AuthProvider } from "@context/AuthContext";
import { FavoritesProvider } from "@context/FavoritesContext";
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
      <FavoritesProvider>
        <InnerApp />
        <Toaster
          containerStyle={{
            top: 10,
            right: 0,
          }}
          toastOptions={{
            duration: 2500,
            style: {
              border: "2px solid orange",
              borderRadius: "8px",
            },
          }}
        ></Toaster>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
