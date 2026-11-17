
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const adminTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10b981"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0"
    }
  }
});

export default function AdminThemeProvider({ children }) {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
