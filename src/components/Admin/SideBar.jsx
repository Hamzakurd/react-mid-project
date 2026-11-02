import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";

import { useAuth } from "../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ExtensionIcon from "@mui/icons-material/Extension";
import LogoutIcon from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import EvStationIcon from "@mui/icons-material/EvStation";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard"
  },
  {
    title: "Manage Users",
    icon: <GroupIcon />,
    path: "/admin/manage-users"
  },
  {
    title: "Manage Cars",
    icon: <ElectricCarIcon />,
    path: "/admin/manage-cars"
  },
  {
    title: "Manage Chargers",
    icon: <EvStationIcon />,
    path: "/admin/manage-chargers"
  },
  {
    title: "Manage Products",
    icon: <ExtensionIcon />,
    path: "/admin/manage-products"
  }
];

export default function Sidebar({ open = true, onclick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box
      component="aside"
      sx={{
        width: open ? 270 : 72,
        flex: open ? "0 0 270px" : "0 0 72px",
        height: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "hidden",
        background:
          "linear-gradient(110deg, #119b78 0%, #16b98b 50%, #20c997 100%)",
        color: "#092b40",
        transition: "width 0.3s ease, flex 0.3s ease",
        borderRight: "1px solid rgba(9,43,64,0.12)"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: open ? 2.5 : 1,
          py: 2
        }}
      >
        {open && (
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 800,
              color: "#092b40",
              whiteSpace: "nowrap"
            }}
          >
            EV Wise Admin
          </Typography>
        )}

        <IconButton
          onClick={onclick}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          sx={{
            color: "#092b40",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)"
            }
          }}
        >
          <ReorderIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Tooltip
              key={item.path}
              title={open ? "" : item.title}
              placement="right"
            >
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 50,
                  mb: 1,
                  borderRadius: 2,
                  justifyContent: open ? "initial" : "center",
                  px: open ? 2 : 1,
                  color: "#092b40",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.22)"
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.35)",
                    fontWeight: 800
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(255,255,255,0.45)"
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: open ? 40 : 0,
                    color: "#092b40",
                    justifyContent: "center"
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isActive ? 800 : 600,
                          fontSize: 14,
                          whiteSpace: "nowrap"
                        }
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}

        <Tooltip title={open ? "" : "Logout"} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 50,
              mt: 3,
              borderRadius: 2,
              justifyContent: open ? "initial" : "center",
              px: open ? 2 : 1,
              color: "#092b40",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.22)"
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: open ? 40 : 0,
                color: "#092b40",
                justifyContent: "center"
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {open && (
              <ListItemText
                primary="Logout"
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: 700,
                      fontSize: 14,
                      whiteSpace: "nowrap"
                    }
                  }
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );
}