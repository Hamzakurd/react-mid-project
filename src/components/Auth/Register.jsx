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

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { useAuth } from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const success = await register(userData);

      if (success) {
        navigate("/Login");
      }
    } catch (error) {
      console.error("Register error:", error);
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
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f7fb",
        px: 2,
        py: 3
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
          Create Account
        </Typography>

        <Typography
          sx={{
            color: "#718096",
            mt: 1,
            mb: 4
          }}
        >
          Create your account to get started.
        </Typography>

        {/* REGISTER FORM */}
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
        >
          {fields.map((field) => (
            <Box key={field.name}>
              <Typography
                fontWeight="bold"
                fontSize={14}
                sx={{ mb: 1 }}
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
                    borderRadius: 2
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
            color: "#718096",
            fontSize: 14
          }}
        >
          Already have an account?
        </Typography>

        <Button
          fullWidth
          onClick={() => navigate("/Login")}
          sx={{
            mt: 1,
            color: "#16a879",
            fontWeight: "bold"
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}