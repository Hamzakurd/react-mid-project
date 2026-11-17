
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  Avatar
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationIcon from "@mui/icons-material/EvStation";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useAuth } from "../Hooks/UseAuth";
import { CarsContext } from "../Context/CarsContext";
import { ChargersContext } from "../Context/ChargersContext";

const readSavedArray = (key) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return null;

    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, users } = useAuth();

  const { cars } = useContext(CarsContext);
  const { chargers } = useContext(ChargersContext);

  const [products] = useState(
    () => readSavedArray("evWiseProducts") || []
  );

  const [savedUsers] = useState(
    () => readSavedArray("users")
  );

  const totalUsers = Array.isArray(users)
    ? users.length
    : Array.isArray(savedUsers)
    ? savedUsers.length
    : null;

  const totalCars = cars.length;
  const totalChargers = chargers.length;
  const totalProducts = products.length;

  const recentProducts = [...products]
    .reverse()
    .slice(0, 4);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers ?? "—",
      icon: <GroupIcon sx={{ fontSize: 28 }} />,
      color: "#10b981",
      background: "rgba(16,185,129,0.12)"
    },
    {
      title: "Total Cars",
      value: totalCars,
      icon: <DirectionsCarIcon sx={{ fontSize: 28 }} />,
      color: "#60a5fa",
      background: "rgba(96,165,250,0.12)"
    },
    {
      title: "Total Chargers",
      value: totalChargers,
      icon: <EvStationIcon sx={{ fontSize: 28 }} />,
      color: "#a78bfa",
      background: "rgba(167,139,250,0.12)"
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Inventory2Icon sx={{ fontSize: 28 }} />,
      color: "#fbbf24",
      background: "rgba(251,191,36,0.12)"
    }
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View registered users",
      icon: <GroupIcon />,
      path: "/admin/manage-users",
      color: "#10b981"
    },
    {
      title: "Manage Cars",
      description: "Add or update cars",
      icon: <DirectionsCarIcon />,
      path: "/admin/manage-cars",
      color: "#60a5fa"
    },
    {
      title: "Manage Chargers",
      description: "Update AC and DC chargers",
      icon: <EvStationIcon />,
      path: "/admin/manage-chargers",
      color: "#a78bfa"
    },
    {
      title: "Manage Products",
      description: "Manage shop inventory",
      icon: <Inventory2Icon />,
      path: "/admin/manage-products",
      color: "#fbbf24"
    }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: { xs: 2, md: 4 },
        boxSizing: "border-box"
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1
          }}
        >
          <DashboardIcon sx={{ color: "#10b981" }} />

          <Typography
            sx={{
              color: "#10b981",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: 1
            }}
          >
            ADMIN DASHBOARD
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            fontSize: { xs: 26, md: 36 },
            mb: 1
          }}
        >
          Welcome, {currentUser?.name || "Admin"}!
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.8
          }}
        >
          Here's an overview of your EV Wise platform.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2
        }}
      >
        <TrendingUpIcon sx={{ color: "#10b981" }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "text.primary"
          }}
        >
          Platform Overview
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))"
          },
          gap: 3,
          mb: 5
        }}
      >
        {stats.map((stat) => (
          <Paper
            key={stat.title}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              minWidth: 0,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: stat.color
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {stat.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    fontSize: 34
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: 3,
                  bgcolor: stat.background,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {stat.icon}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1.5fr) minmax(0, 1fr)"
          },
          gap: 3,
          mb: 5
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            minWidth: 0
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 3,
              flexWrap: "wrap"
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "text.primary",
                  fontWeight: 800
                }}
              >
                Recent Products
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  mt: 0.5
                }}
              >
                Latest products added to your catalog
              </Typography>
            </Box>

            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() =>
                navigate("/admin/manage-products")
              }
              sx={{
                color: "#10b981",
                fontWeight: 700,
                textTransform: "none"
              }}
            >
              View All
            </Button>
          </Box>

          {recentProducts.length === 0 ? (
            <Box
              sx={{
                py: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 2
              }}
            >
              <Inventory2Icon
                sx={{
                  fontSize: 48,
                  color: "text.secondary"
                }}
              />

              <Typography color="text.secondary">
                No products added yet.
              </Typography>

              <Button
  variant="contained"
  startIcon={<AddIcon />}
  onClick={() => navigate("/admin/manage-products")}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#059669"
                  }
                }}
              >
                Add Your First Product
              </Button>
            </Box>
          ) : (
            <Box>
              {recentProducts.map((product, index) => (
                <Box key={product.id || index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 2
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={product.image || undefined}
                      alt={product.name}
                      sx={{
                        width: 58,
                        height: 58,
                        bgcolor: "rgba(16,185,129,0.12)",
                        color: "#10b981",
                        borderRadius: 2
                      }}
                    >
                      <Inventory2Icon />
                    </Avatar>

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontSize: 14,
                          overflowWrap: "anywhere"
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 12,
                          mt: 0.5
                        }}
                      >
                        {product.category || "Uncategorized"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        textAlign: "right",
                        flexShrink: 0
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#10b981",
                          fontWeight: 800,
                          fontSize: 13
                        }}
                      >
                        {product.price !== undefined &&
                        product.price !== "" &&
                        Number.isFinite(Number(product.price))
                          ? `${Number(product.price).toFixed(2)} JOD`
                          : "—"}
                      </Typography>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 11,
                          mt: 0.5
                        }}
                      >
                        Stock: {product.stock ?? "—"}
                      </Typography>
                    </Box>
                  </Box>

                  {index < recentProducts.length - 1 && (
                    <Divider />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            minWidth: 0
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2
            }}
          >
            <ShoppingBagIcon
              sx={{ color: "#fbbf24" }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "text.primary"
              }}
            >
              Recent Orders
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              minHeight: 230,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 75,
                height: 75,
                borderRadius: "50%",
                bgcolor: "rgba(251,191,36,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ShoppingBagIcon
                sx={{
                  color: "#fbbf24",
                  fontSize: 36
                }}
              />
            </Box>

            <Chip
              label="Coming Soon"
              size="small"
              sx={{
                bgcolor: "rgba(251,191,36,0.12)",
                color: "#fbbf24",
                fontWeight: 700
              }}
            />

            <Typography
              sx={{
                color: "text.primary",
                fontWeight: 700
              }}
            >
              EV Wise Shop Orders
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
                lineHeight: 1.8,
                maxWidth: 290
              }}
            >
              Customer orders will appear here once the
              shopping cart and checkout system are ready.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 0.5
          }}
        >
          Quick Actions
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13
          }}
        >
          Quickly access platform management sections.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))"
          },
          gap: 2
        }}
      >
        {quickActions.map((action) => (
          <Paper
            key={action.title}
            elevation={0}
            onClick={() => navigate(action.path)}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: 0,
              transition: "0.2s",
              "&:hover": {
                borderColor: action.color,
                transform: "translateY(-3px)"
              }
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                color: action.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              {action.icon}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: 13
                }}
              >
                {action.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "text.secondary",
                  mt: 0.5
                }}
              >
                {action.description}
              </Typography>
            </Box>

            <ArrowForwardIcon
              sx={{
                color: action.color,
                fontSize: 18,
                flexShrink: 0
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
