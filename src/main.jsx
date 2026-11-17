
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { ChargersProvider } from "./components/Context/ChargersProvider";
import { AuthProvider } from "./components/Context/AuthProvider";
import { ThemeProvider } from "./components/Context/ThemeProvider";
import { CarsProvider } from "./components/Context/CarsProvider";
import ProductsProvider from "./components/Context/ProductsProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <CarsProvider>
            <ChargersProvider>
              <ProductsProvider>
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
              </ProductsProvider>
            </ChargersProvider>
          </CarsProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
