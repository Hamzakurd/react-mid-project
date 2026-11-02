import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button
} from "@mui/material";

import { ElectricBolt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isLoggedIn =
    currentUser && Object.keys(currentUser).length > 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background:
          "linear-gradient(110deg, #119b78 0%, #16b98b 50%, #20c997 100%)",
        color: "#092b40"
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 5 },
          py: 1
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            cursor: "pointer",
            color: "#092b40"
          }}
          onClick={() => navigate("/")}
        >
          EV Wise
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap"
          }}
        >
          {/* HOME */}

          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#092b40",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)"
              }
            }}
          >
            Home
          </Button>

          {/* CHARGERS */}

          <Button
            startIcon={<ElectricBolt />}
            onClick={() => navigate("/Chargers")}
            sx={{
              color: "#092b40",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)"
              }
            }}
          >
            Chargers
          </Button>

          {/* ABOUT US */}

          <Button
            onClick={() => navigate("/About")}
            sx={{
              color: "#092b40",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)"
              }
            }}
          >
            About Us
          </Button>

          {/* LOGIN / REGISTER */}

          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate("/Login")}
                sx={{
                  color: "#092b40",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/Register")}
                sx={{
                  backgroundColor: "#092b40",
                  color: "white",
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#16465c"
                  }
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              sx={{
                color: "#092b40",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)"
                }
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}