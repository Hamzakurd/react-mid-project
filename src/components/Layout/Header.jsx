
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Switch,
  Chip
} from "@mui/material";

import {
  Menu as MenuIcon,
  ElectricBolt,
  Home,
  Info,
  LightMode,
  DarkMode,
  ShoppingBag,
  ShoppingCart,
  ReceiptLong,
  RateReview,
  AccountCircle
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";

const CART_KEY = "evWiseCart";

const getCartCount = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return 0;

    return saved.reduce((total, item) => {
      const quantity = Number(item.quantity);

      return total + (
        Number.isInteger(quantity) && quantity > 0
          ? quantity
          : 0
      );
    }, 0);
  } catch {
    return 0;
  }
};

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);

  const isLoggedIn =
    currentUser && Object.keys(currentUser).length > 0;

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener(
      "evWiseCartUpdated",
      updateCartCount
    );

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "evWiseCartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const menuItemStyle = {
    borderRadius: 2,
    mx: 1,
    my: 0.5,
    color: "text.primary",
    "&:hover": {
      backgroundColor: "rgba(22,185,139,0.15)"
    }
  };

  return (
    <>
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
            py: 1,
            gap: 2
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              cursor: "pointer",
              color: "#092b40",
              fontSize: { xs: "1.5rem", md: "2.125rem" }
            }}
            onClick={() => handleNavigate("/")}
          >
            EV Wise
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, md: 2 }
            }}
          >
            {!isLoggedIn ? (
              <>
                <Button
                  onClick={() => handleNavigate("/Login")}
                  sx={{
                    color: "#092b40",
                    fontWeight: "bold",
                    textTransform: "none",
                    minWidth: "auto"
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleNavigate("/Register")}
                  sx={{
                    backgroundColor: "#092b40",
                    color: "white",
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
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
                variant="contained"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#092b40",
                  color: "white",
                  borderRadius: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#16465c"
                  }
                }}
              >
                Logout
              </Button>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5
              }}
            >
              <LightMode
                sx={{
                  color: "#092b40",
                  fontSize: 20
                }}
              />

              <Switch
                checked={theme === "dark"}
                onChange={toggleTheme}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#092b40"
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#092b40",
                    opacity: 0.7
                  }
                }}
              />

              <DarkMode
                sx={{
                  color: "#092b40",
                  fontSize: 20
                }}
              />
            </Box>

            <IconButton
              size="large"
              onClick={() => setOpen(true)}
              sx={{ color: "#092b40" }}
              aria-label="Open menu"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              color: "text.primary"
            }
          }
        }}
      >
        <Box
          sx={{
            width: 270,
            height: "100%",
            bgcolor: "background.paper",
            color: "text.primary"
          }}
        >
          <Box
            sx={{
              p: 3,
              background:
                "linear-gradient(110deg, #119b78 0%, #16b98b 50%, #20c997 100%)"
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#092b40"
              }}
            >
              EV Wise
            </Typography>
          </Box>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/")}
              >
                <Home sx={{ mr: 2 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/Chargers")}
              >
                <ElectricBolt sx={{ mr: 2 }} />
                <ListItemText primary="Chargers" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/Shop")}
              >
                <ShoppingBag sx={{ mr: 2 }} />
                <ListItemText primary="Shop" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/Cart")}
              >
                <ShoppingCart sx={{ mr: 2 }} />

                <ListItemText primary="Shopping Cart" />

                {cartCount > 0 && (
                  <Chip
                    label={cartCount}
                    size="small"
                    sx={{
                      bgcolor: "#10b981",
                      color: "#ffffff",
                      fontWeight: 800,
                      height: 24,
                      minWidth: 28
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>

            {isLoggedIn && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={menuItemStyle}
                    onClick={() => handleNavigate("/MyProfile")}
                  >
                    <AccountCircle sx={{ mr: 2 }} />
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    sx={menuItemStyle}
                    onClick={() => handleNavigate("/MyOrders")}
                  >
                    <ReceiptLong sx={{ mr: 2 }} />
                    <ListItemText primary="My Orders" />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/Feedback")}
              >
                <RateReview sx={{ mr: 2 }} />
                <ListItemText primary="Feedback & Reviews" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => handleNavigate("/About")}
              >
                <Info sx={{ mr: 2 }} />
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
