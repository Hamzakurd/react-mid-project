
import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  Alert
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAuth } from "../Hooks/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requestedPath = location.state?.from;

  const redirectPath =
    typeof requestedPath === "string" &&
    ["/Checkout", "/MyOrders"].includes(requestedPath)
      ? requestedPath
      : "/";

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const name = userData.name.trim();
    const email = userData.email.trim().toLowerCase();

    if (
      !name ||
      !email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const success = await register({
        ...userData,
        name,
        email
      });

      if (success) {
        navigate("/Login", {
          replace: true,
          state: {
            from: redirectPath
          }
        });
      }
    } catch (error) {
      console.error("Register error:", error);
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "name",
      placeholder: "Enter your name",
      type: "text",
      icon: <PersonIcon sx={{ color: "#16b981" }} />
    },
    {
      label: "Email Address",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      icon: <EmailIcon sx={{ color: "#16b981" }} />
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: "password",
      icon: <LockIcon sx={{ color: "#16b981" }} />
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
      icon: <LockIcon sx={{ color: "#16b981" }} />
    }
  ];

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
        py: 3,
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
              Create an account to continue your checkout.
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
          Create Account
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mt: 1,
            mb: 4
          }}
        >
          Create your account to get started.
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2
            }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleRegister}
        >
          {fields.map((field) => (
            <Box key={field.name}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "text.primary",
                  mb: 1
                }}
              >
                {field.label}
              </Typography>

              <TextField
                fullWidth
                placeholder={field.placeholder}
                type={field.type}
                required
                disabled={loading}
                autoComplete={
                  field.name === "name"
                    ? "name"
                    : field.name === "email"
                    ? "email"
                    : "new-password"
                }
                value={userData[field.name]}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value
                  }))
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
                        {field.icon}
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Box>
          ))}

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
            {loading ? "Registering..." : "Register"}
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
          Already have an account?
        </Typography>

        <Button
          fullWidth
          onClick={() =>
            navigate("/Login", {
              state: { from: redirectPath }
            })
          }
          sx={{
            mt: 1,
            color: "#16a879",
            fontWeight: "bold"
          }}
        >
          Login
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
