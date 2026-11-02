import {
  Box,
  Typography,
  Paper,
  Button
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationIcon from "@mui/icons-material/EvStation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAuth } from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Manage Users",
      description: "View and manage registered users.",
      icon: <GroupIcon sx={{ fontSize: 36 }} />,
      path: "/admin/manage-users",
      color: "#10b981",
      background: "#e8fff7"
    },
    {
      title: "Manage Cars",
      description: "Add, edit and delete electric vehicles.",
      icon: <DirectionsCarIcon sx={{ fontSize: 36 }} />,
      path: "/admin/manage-cars",
      color: "#168cf0",
      background: "#e1f3ff"
    },
    {
      title: "Manage Chargers",
      description: "Manage AC and DC charging information.",
      icon: <EvStationIcon sx={{ fontSize: 36 }} />,
      path: "/admin/manage-chargers",
      color: "#7655ff",
      background: "#eeeaff"
    }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        backgroundColor: "#eff7fd",
        p: { xs: 2, md: 4 },
        boxSizing: "border-box"
      }}
    >
      {/* WELCOME SECTION */}

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 1,
            mb: 1
          }}
        >
          ADMIN PANEL
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#092b40",
            fontWeight: 800,
            fontSize: { xs: 26, md: 36 },
            mb: 1
          }}
        >
          Welcome, {currentUser?.name || "Admin"}!
        </Typography>

        <Typography
          sx={{
            color: "#164b91",
            fontSize: 15
          }}
        >
          Manage your EV Wise platform from one place.
        </Typography>
      </Box>

      {/* DASHBOARD CARDS */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))"
          },
          gap: 3
        }}
      >
        {dashboardCards.map((card) => (
          <Paper
            key={card.title}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "white",
              border: "1px solid #e2edf5",
              display: "flex",
              flexDirection: "column",
              minHeight: 220,
              boxSizing: "border-box",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              }
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: 3,
                backgroundColor: card.background,
                color: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2
              }}
            >
              {card.icon}
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: "#092b40",
                fontWeight: 800,
                mb: 1
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                color: "#164b91",
                fontSize: 14,
                lineHeight: 1.7,
                mb: 3
              }}
            >
              {card.description}
            </Typography>

            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(card.path)}
              sx={{
                mt: "auto",
                alignSelf: "flex-start",
                color: "#119b78",
                fontWeight: 700,
                textTransform: "none"
              }}
            >
              Open Section
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}