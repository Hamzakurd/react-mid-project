
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ChargersContext } from "../Context/ChargersContext";

const emptyCharger = {
  name: "",
  type: "AC",
  power: "",
  current: "",
  voltage: "",
  phase: "",
  description: "",
  features: ""
};

export default function ManageChargers() {
  const {
    chargers,
    addCharger,
    updateCharger,
    deleteCharger
  } = useContext(ChargersContext);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyCharger);

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCharger });
    setOpen(true);
  };

  const handleEdit = (charger) => {
    setEditingId(charger.id);

    setForm({
      name: charger.name || "",
      type: charger.type || "AC",
      power: charger.power || "",
      current: charger.current || "",
      voltage: charger.voltage || "",
      phase: charger.phase || "",
      description: charger.description || "",
      features: Array.isArray(charger.features)
        ? charger.features.join("\n")
        : ""
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyCharger });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      name: form.name.trim(),
      type: form.type,
      power: form.power.trim(),
      current: form.current.trim(),
      voltage: form.voltage.trim(),
      phase: form.phase.trim(),
      description: form.description.trim(),
      features: form.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean)
    };

    if (
      !data.name ||
      !["AC", "DC"].includes(data.type) ||
      !data.power ||
      !data.current ||
      !data.voltage ||
      !data.phase ||
      !data.description ||
      data.features.length === 0
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (editingId !== null) {
      updateCharger(editingId, data);
      toast.success("Charger updated successfully!");
    } else {
      addCharger(data);
      toast.success("Charger added successfully!");
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this charger?"
    );

    if (!confirmed) return;

    deleteCharger(id);
    toast.success("Charger deleted successfully!");
  };

  const fields = [
    {
      name: "name",
      label: "Charger Name",
      placeholder: "AC Charger 16A Fixed"
    },
    {
      name: "power",
      label: "Charging Power",
      placeholder: "3.68 kW"
    },
    {
      name: "current",
      label: "Charging Current",
      placeholder: "16A"
    },
    {
      name: "voltage",
      label: "Voltage",
      placeholder: "230V"
    },
    {
      name: "phase",
      label: "Connection",
      placeholder: "Single Phase"
    }
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.default"
            : "#eff7fd",
        color: "text.primary",
        minHeight: "100vh",
        boxSizing: "border-box"
      }}
    >
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
              mb: 1
            }}
          >
            ADMIN PANEL
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800
            }}
          >
            Manage Chargers
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1
            }}
          >
            Add, edit and delete AC and DC chargers.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            bgcolor: "#10b981",
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#059669"
            }
          }}
        >
          Add Charger
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider"
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(16,185,129,0.12)"
                      : "#e8fff7"
                }}
              >
                {[
                  "#",
                  "Charger Name",
                  "Type",
                  "Power",
                  "Current",
                  "Voltage",
                  "Actions"
                ].map((heading) => (
                  <TableCell
                    key={heading}
                    sx={{
                      fontWeight: 800,
                      color: "text.primary"
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {chargers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    No chargers found.
                  </TableCell>
                </TableRow>
              ) : (
                chargers.map((charger, index) => (
                  <TableRow key={charger.id} hover>
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "text.primary"
                      }}
                    >
                      {charger.name}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={charger.type}
                        size="small"
                        sx={{
                          bgcolor:
                            charger.type === "AC"
                              ? "#e8fff7"
                              : "#e1f3ff",
                          color:
                            charger.type === "AC"
                              ? "#059669"
                              : "#168cf0",
                          fontWeight: 800
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {charger.power}
                    </TableCell>

                    <TableCell>
                      {charger.current || "—"}
                    </TableCell>

                    <TableCell>
                      {charger.voltage || "—"}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label={`Edit ${charger.name}`}
                        onClick={() => handleEdit(charger)}
                        sx={{ color: "#168cf0" }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-label={`Delete ${charger.name}`}
                        onClick={() =>
                          handleDelete(charger.id)
                        }
                        sx={{ color: "#ef4444" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
      >
        <Box
          component="form"
          onSubmit={handleSave}
          noValidate
        >
          <DialogTitle
            sx={{
              color: "text.primary",
              fontWeight: 800
            }}
          >
            {editingId !== null
              ? "Edit Charger"
              : "Add Charger"}
          </DialogTitle>

          <DialogContent dividers>
            <TextField
              fullWidth
              required
              margin="normal"
              name="name"
              label="Charger Name"
              placeholder="AC Charger 16A Fixed"
              value={form.name}
              onChange={handleChange}
            />

            <FormControl
              fullWidth
              required
              margin="normal"
            >
              <InputLabel>Charger Type</InputLabel>

              <Select
                name="type"
                value={form.type}
                label="Charger Type"
                onChange={handleChange}
              >
                <MenuItem value="AC">
                  AC Charger
                </MenuItem>

                <MenuItem value="DC">
                  DC Charger
                </MenuItem>
              </Select>
            </FormControl>

            {fields
              .filter((field) => field.name !== "name")
              .map((field) => (
                <TextField
                  key={field.name}
                  fullWidth
                  required
                  margin="normal"
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              ))}

            <TextField
              fullWidth
              required
              multiline
              minRows={3}
              margin="normal"
              name="description"
              label="Description"
              placeholder="Write charger description"
              value={form.description}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              required
              multiline
              minRows={4}
              margin="normal"
              name="features"
              label="Main Features"
              placeholder={
                "Fast charging\nHome charging\nEasy operation"
              }
              helperText="Write each feature on a separate line."
              value={form.features}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleClose}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#10b981",
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "#059669"
                }
              }}
            >
              {editingId !== null
                ? "Save Changes"
                : "Add Charger"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
