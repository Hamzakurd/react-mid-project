
import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  InputAdornment
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAuth } from "../Hooks/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requestedPath = location.state?.from;

  const redirectPath =
    typeof requestedPath === "string" &&
    ["/Checkout", "/MyOrders"].includes(requestedPath)
      ? requestedPath
      : "/";

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      !userData.email.trim() ||
      !userData.password.trim()
    ) {
      return;
    }

    setLoading(true);

    try {
      const success = await login(
        userData.email.trim(),
        userData.password
      );

      if (success) {
        let savedUser = null;

        try {
          savedUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
          );
        } catch (error) {
          console.error("Unable to read current user:", error);
        }

        if (savedUser?.role === "admin") {
          navigate("/admin/dashboard", {
            replace: true
          });
        } else {
          navigate(redirectPath, {
            replace: true
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/Register", {
      state: {
        from: redirectPath
      }
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.default"
            : "#f2f7fb",
        color: "text.primary",
        px: 2,
        py: 2,
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 8px 35px rgba(0,0,0,0.35)"
              : "0 8px 35px rgba(0,0,0,0.08)"
        }}
      >
        {redirectPath === "/Checkout" && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)"
            }}
          >
            <Typography
              sx={{
                color: "#10b981",
                fontWeight: 800,
                fontSize: 14,
                mb: 0.5
              }}
            >
              Almost there!
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ fontSize: 13 }}
            >
              Please login or create an account to complete
              your order.
            </Typography>
          </Box>
        )}

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            color: "text.primary"
          }}
        >
          Login
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mt: 1,
            mb: 4
          }}
        >
          Enter your account details to continue.
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 14,
              color: "text.primary",
              mb: 1
            }}
          >
            Email Address
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter your email"
            type="email"
            required
            disabled={loading}
            autoComplete="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value
              })
            }
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper"
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#16b981" }} />
                  </InputAdornment>
                )
              }
            }}
          />

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 14,
              color: "text.primary",
              mb: 1
            }}
          >
            Password
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter your password"
            type="password"
            required
            disabled={loading}
            autoComplete="current-password"
            value={userData.password}
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value
              })
            }
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper"
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#16b981" }} />
                  </InputAdornment>
                )
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              backgroundColor: "#20c997",
              color: "#062b3d",
              fontWeight: "bold",
              fontSize: 16,
              "&:hover": {
                backgroundColor: "#19ad81"
              }
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontSize: 14
          }}
        >
          Don't have an account?
        </Typography>

        <Button
          fullWidth
          onClick={handleRegister}
          sx={{
            mt: 1,
            color: "#16a879",
            fontWeight: "bold"
          }}
        >
          Create Account
        </Button>

        {redirectPath === "/Checkout" && (
          <Button
            fullWidth
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/Cart")}
            sx={{
              mt: 2,
              color: "text.secondary",
              textTransform: "none"
            }}
          >
            Back to Cart
          </Button>
        )}
      </Paper>
    </Box>
  );
}
