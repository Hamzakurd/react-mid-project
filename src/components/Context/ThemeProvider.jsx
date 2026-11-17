
import { useState, useEffect, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

export const ThemeProvider = ({ children }) => {

  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  // Toggle Light / Dark Mode
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  // Save Theme and Update CSS
  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  // Material UI Theme
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,

          primary: {
            main: "#16b98b"
          },

          background: {
            default:
              theme === "dark" ? "#121212" : "#ffffff",

            paper:
              theme === "dark" ? "#1e1e1e" : "#ffffff"
          },

          text: {
            primary:
              theme === "dark" ? "#ffffff" : "#092b40",

            secondary:
              theme === "dark" ? "#b0b0b0" : "#555555"
          }
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor:
                  theme === "dark" ? "#121212" : "#ffffff",

                color:
                  theme === "dark" ? "#ffffff" : "#092b40",

                transition:
                  "background-color 0.3s, color 0.3s"
              },

              "#root": {
                minHeight: "100vh",
                backgroundColor:
                  theme === "dark" ? "#121212" : "#ffffff",

                color:
                  theme === "dark" ? "#ffffff" : "#092b40"
              }
            }
          }
        }
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
