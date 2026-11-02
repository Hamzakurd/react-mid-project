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

import { useAuth } from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const success = await login(
        userData.email,
        userData.password
      );

      if (success) {
        const savedUser = JSON.parse(
          localStorage.getItem("currentUser") || "null"
        );

        if (savedUser?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f7fb",
        px: 2,
        py: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          backgroundColor: "white",
          boxShadow: "0 8px 35px rgba(0,0,0,0.08)"
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            color: "#092b40"
          }}
        >
          Login
        </Typography>

        <Typography sx={{ color: "#718096", mt: 1, mb: 4 }}>
          Enter your account details to continue.
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate>
          <Typography fontWeight="bold" fontSize={14} sx={{ mb: 1 }}>
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
                borderRadius: 2
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

          <Typography fontWeight="bold" fontSize={14} sx={{ mb: 1 }}>
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
                borderRadius: 2
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
            color: "#718096",
            fontSize: 14
          }}
        >
          Don't have an account?
        </Typography>

        <Button
          fullWidth
          onClick={() => navigate("/Register")}
          sx={{
            mt: 1,
            color: "#16a879",
            fontWeight: "bold"
          }}
        >
          Create Account
        </Button>
       
      </Paper>
    </Box>
  );
}