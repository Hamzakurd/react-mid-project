import { useState } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "../Hooks/UseAuth";

const emptyUser = {
  name: "",
  email: "",
  password: "",
  role: "user"
};

export default function DisplayUsers() {
  const {
    users,
    setUsers,
    currentUser
  } = useAuth();

  const [openForm, setOpenForm] = useState(false);

  const [formData, setFormData] = useState(emptyUser);

  const [editingId, setEditingId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const [deleteTarget, setDeleteTarget] = useState(null);

  const userList = Array.isArray(users) ? users : [];

  // SAVE USERS

  const saveUsers = (updatedUsers) => {
    try {
      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      setUsers(updatedUsers);

      return true;
    } catch (error) {
      console.error("Error saving users:", error);
      toast.error("Failed to save users!");
      return false;
    }
  };

  // OPEN ADD FORM

  const handleOpenForm = () => {
    setFormData(emptyUser);
    setOpenForm(true);
  };

  // CLOSE ADD FORM

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData(emptyUser);
  };

  // HANDLE INPUTS

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ADD USER

  const handleAddUser = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const role = formData.role;

    if (!name || !email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    if (name.length < 3) {
      toast.error("Name must contain at least 3 characters!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    const existingUser = userList.find(
      (user) => user.email?.toLowerCase() === email
    );

    if (existingUser) {
      toast.error("Email already exists!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain 8 characters, uppercase, lowercase, number and symbol!"
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role
    };

    const updatedUsers = [...userList, newUser];

    if (saveUsers(updatedUsers)) {
      toast.success("User added successfully!");
      handleCloseForm();
    }
  };

  // START EDITING ROLE

  const handleEditRole = (user) => {
    setEditingId(user.id);
    setSelectedRole(user.role || "user");
  };

  // CANCEL EDITING

  const handleCancelEdit = () => {
    setEditingId(null);
    setSelectedRole("user");
  };

  // SAVE ROLE

  const handleSaveRole = (user) => {
    if (
      currentUser?.id === user.id &&
      selectedRole !== "admin"
    ) {
      toast.error("You cannot remove your own admin role!");
      return;
    }

    const updatedUsers = userList.map((item) =>
      item.id === user.id
        ? { ...item, role: selectedRole }
        : item
    );

    if (saveUsers(updatedUsers)) {
      if (currentUser?.id === user.id) {
        const updatedCurrentUser = {
          ...currentUser,
          role: selectedRole
        };

        localStorage.setItem(
          "currentUser",
          JSON.stringify(updatedCurrentUser)
        );
      }

      toast.success("User role updated successfully!");
      handleCancelEdit();
    }
  };

  // OPEN DELETE CONFIRMATION

  const handleDeleteClick = (user) => {
    if (currentUser?.id === user.id) {
      toast.error("You cannot delete your own account!");
      return;
    }

    setDeleteTarget(user);
  };

  // DELETE USER

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (currentUser?.id === deleteTarget.id) {
      toast.error("You cannot delete your own account!");
      setDeleteTarget(null);
      return;
    }

    const updatedUsers = userList.filter(
      (user) => user.id !== deleteTarget.id
    );

    if (saveUsers(updatedUsers)) {
      toast.success("User deleted successfully!");
      setDeleteTarget(null);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#eff7fd",
        p: { xs: 2, md: 4 }
      }}
    >
      {/* PAGE HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4
        }}
      >
        <Box>
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
              fontSize: { xs: 25, md: 34 }
            }}
          >
            Manage Users
          </Typography>

          <Typography
            sx={{
              color: "#164b91",
              fontSize: 14,
              mt: 1
            }}
          >
            Add users, update roles and manage accounts.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
          sx={{
            backgroundColor: "#10b981",
            color: "white",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1.3,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#059669"
            }
          }}
        >
          Add User
        </Button>
      </Box>

      {/* USERS TABLE */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #e2edf5",
          overflow: "hidden",
          backgroundColor: "white"
        }}
      >
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#e8fff7"
                }}
              >
                {["#", "Name", "Email", "Role", "Actions"].map(
                  (heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: "#092b40",
                        fontWeight: 800
                      }}
                    >
                      {heading}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      py: 6,
                      color: "#718096"
                    }}
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((user, index) => {
                  const isCurrentUser =
                    currentUser?.id === user.id;

                  const isEditing =
                    editingId === user.id;

                  return (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        {index + 1}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: "#092b40",
                          fontWeight: 700
                        }}
                      >
                        {user.name}
                        {isCurrentUser && " (You)"}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: "#164b91"
                        }}
                      >
                        {user.email}
                      </TableCell>

                      <TableCell>
                        {isEditing ? (
                          <FormControl
                            size="small"
                            sx={{ minWidth: 120 }}
                          >
                            <InputLabel>Role</InputLabel>

                            <Select
                              value={selectedRole}
                              label="Role"
                              onChange={(e) =>
                                setSelectedRole(e.target.value)
                              }
                            >
                              <MenuItem value="user">
                                User
                              </MenuItem>

                              <MenuItem value="admin">
                                Admin
                              </MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Chip
                            label={
                              user.role === "admin"
                                ? "Admin"
                                : "User"
                            }
                            size="small"
                            sx={{
                              fontWeight: 700,
                              color:
                                user.role === "admin"
                                  ? "#065f46"
                                  : "#164b91",
                              backgroundColor:
                                user.role === "admin"
                                  ? "#d1fae5"
                                  : "#e1f3ff"
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center"
                          }}
                        >
                          {isEditing ? (
                            <>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() =>
                                  handleSaveRole(user)
                                }
                                sx={{
                                  backgroundColor: "#10b981",
                                  "&:hover": {
                                    backgroundColor: "#059669"
                                  }
                                }}
                              >
                                Save
                              </Button>

                              <Button
                                size="small"
                                onClick={handleCancelEdit}
                                sx={{
                                  color: "#164b91"
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <IconButton
                              aria-label={`Edit ${user.name}`}
                              onClick={() =>
                                handleEditRole(user)
                              }
                              sx={{
                                color: "#168cf0",
                                backgroundColor: "#e1f3ff"
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          )}

                          <IconButton
                            aria-label={`Delete ${user.name}`}
                            disabled={isCurrentUser}
                            onClick={() =>
                              handleDeleteClick(user)
                            }
                            sx={{
                              color: "#ef4444",
                              backgroundColor: "#fee2e2",
                              "&.Mui-disabled": {
                                backgroundColor: "#f1f5f9",
                                color: "#94a3b8"
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ADD USER DIALOG */}

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
      >
        <Box
          component="form"
          onSubmit={handleAddUser}
          noValidate
        >
          <DialogTitle
            sx={{
              color: "#092b40",
              fontWeight: 800
            }}
          >
            Add New User
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />

            <FormControl
              fullWidth
              margin="normal"
            >
              <InputLabel>Role</InputLabel>

              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="user">
                  User
                </MenuItem>

                <MenuItem value="admin">
                  Admin
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseForm}
              sx={{
                color: "#164b91"
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#10b981",
                "&:hover": {
                  backgroundColor: "#059669"
                }
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            color: "#092b40",
            fontWeight: 800
          }}
        >
          Delete User
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "#164b91" }}>
            Are you sure you want to delete{" "}
            <strong>{deleteTarget?.name}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{
              color: "#164b91"
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}