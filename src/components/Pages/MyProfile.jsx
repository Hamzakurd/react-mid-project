
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAuth } from "../Hooks/UseAuth";

export default function MyProfile() {
  const navigate = useNavigate();

  const { currentUser, updateProfile } = useAuth();

  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || ""
      });
    }
  }, [currentUser?.name, currentUser?.email]);

  const handleOpenEdit = () => {
    setFormData({
      name: currentUser?.name || "",
      email: currentUser?.email || ""
    });

    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    if (loading) return;

    setOpenEdit(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email) {
      toast.error("Please enter your name and email!");
      return;
    }

    if (typeof updateProfile !== "function") {
      toast.error("Profile update is not available in AuthContext.");
      return;
    }

    setLoading(true);

    try {
      const success = await updateProfile({ name, email });

      if (success) {
        setOpenEdit(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Unable to update your profile!");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  const firstLetter =
    currentUser.name?.charAt(0).toUpperCase() || "U";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 4, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Chip
            icon={<ElectricBoltIcon />}
            label="EV WISE ACCOUNT"
            sx={{
              bgcolor: "rgba(16,185,129,0.12)",
              color: "#10b981",
              fontWeight: 800,
              mb: 2
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 30, md: 42 },
              mb: 1
            }}
          >
            My Profile
          </Typography>

          <Typography color="text.secondary">
            Manage your personal information and
            access your EV Wise account.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Box
            sx={{
              height: 130,
              background:
                "linear-gradient(110deg, #119b78 0%, #16b98b 50%, #20c997 100%)"
            }}
          />

          <Box
            sx={{
              px: { xs: 3, md: 4 },
              pb: 4
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mt: -6,
                mb: 2,
                border: "5px solid",
                borderColor: "background.paper",
                bgcolor: "#092b40",
                color: "#ffffff",
                fontSize: 42,
                fontWeight: 800
              }}
            >
              {firstLetter}
            </Avatar>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                  xs: "flex-start",
                  sm: "center"
                },
                flexDirection: {
                  xs: "column",
                  sm: "row"
                },
                gap: 2
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 24, md: 30 },
                    overflowWrap: "anywhere"
                  }}
                >
                  {currentUser.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    overflowWrap: "anywhere"
                  }}
                >
                  {currentUser.email}
                </Typography>

                <Chip
                  label={
                    currentUser.role === "admin"
                      ? "Administrator"
                      : "User"
                  }
                  size="small"
                  sx={{
                    mt: 2,
                    bgcolor: "rgba(16,185,129,0.12)",
                    color: "#10b981",
                    fontWeight: 800
                  }}
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleOpenEdit}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 800,
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  "&:hover": {
                    bgcolor: "#059669"
                  }
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                boxSizing: "border-box"
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mb: 3, alignItems: "center" }}
              >
                <AccountCircleIcon
                  sx={{
                    color: "#10b981",
                    fontSize: 28
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                >
                  Account Information
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(16,185,129,0.12)",
                      color: "#10b981"
                    }}
                  >
                    <PersonIcon />
                  </Avatar>

                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 13 }}
                    >
                      Full Name
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {currentUser.name}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(16,185,129,0.12)",
                      color: "#10b981"
                    }}
                  >
                    <EmailIcon />
                  </Avatar>

                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 13 }}
                    >
                      Email Address
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {currentUser.email}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(16,185,129,0.12)",
                      color: "#10b981"
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>

                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 13 }}
                    >
                      Account Role
                    </Typography>

                    <Typography
                      sx={{ fontWeight: 700 }}
                    >
                      {currentUser.role === "admin"
                        ? "Administrator"
                        : "User"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, mb: 2 }}
              >
                Quick Actions
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Easily access your account features.
              </Typography>

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditIcon />}
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleOpenEdit}
                  sx={{
                    justifyContent: "space-between",
                    py: 1.8,
                    px: 2,
                    borderRadius: 2,
                    color: "#10b981",
                    borderColor: "#10b981",
                    textTransform: "none",
                    fontWeight: 800
                  }}
                >
                  Edit Profile
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ShoppingBagIcon />}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/MyOrders")}
                  sx={{
                    justifyContent: "space-between",
                    py: 1.8,
                    px: 2,
                    borderRadius: 2,
                    color: "#10b981",
                    borderColor: "#10b981",
                    textTransform: "none",
                    fontWeight: 800
                  }}
                >
                  My Orders
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              color: "text.primary",
              borderRadius: 3
            }
          }
        }}
      >
        <Box
          component="form"
          onSubmit={handleUpdateProfile}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 800
            }}
          >
            <EditIcon sx={{ color: "#10b981" }} />
            Edit Profile
          </DialogTitle>

          <DialogContent dividers>
            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Update your account information below.
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />

              <TextField
                fullWidth
                required
                type="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, gap: 1 }}>
            <Button
              onClick={handleCloseEdit}
              disabled={loading}
              startIcon={<CloseIcon />}
              sx={{
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 700
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: "#10b981",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 800,
                "&:hover": {
                  bgcolor: "#059669"
                }
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
