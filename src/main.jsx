import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./components/Context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "#10b981",
                color: "#fff"
              }
            },
            error: {
              style: {
                background: "#ef4444",
                color: "#fff"
              }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);