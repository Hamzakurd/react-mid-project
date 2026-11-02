import { useState } from "react";
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

const STORAGE_KEY = "evWiseAdminChargers";

const initialChargers = [
  { id: "1", name: "Portable AC Charger", type: "AC", power: "2.8 kW" },
  { id: "2", name: "Home AC Charger", type: "AC", power: "3.7 kW" },
  { id: "3", name: "Wallbox AC Charger", type: "AC", power: "7.4 kW" },
  { id: "4", name: "Fast DC Charger", type: "DC", power: "30 kW" },
  { id: "5", name: "Rapid DC Charger", type: "DC", power: "60 kW" },
  { id: "6", name: "Ultra-Fast DC Charger", type: "DC", power: "120 kW" },
  { id: "7", name: "High-Power DC Charger", type: "DC", power: "180 kW" }
];

const emptyCharger = {
  name: "",
  type: "AC",
  power: ""
};

const loadChargers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return initialChargers;
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialChargers;
  } catch {
    return initialChargers;
  }
};

export default function ManageChargers() {
  const [chargers, setChargers] = useState(loadChargers);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyCharger);

  const saveChargers = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setChargers(updated);
      return true;
    } catch {
      toast.error("Failed to save chargers!");
      return false;
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCharger });
    setOpen(true);
  };

  const handleEdit = (charger) => {
    setEditingId(charger.id);
    setForm({
      name: charger.name,
      type: charger.type,
      power: charger.power
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyCharger });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      name: form.name.trim(),
      type: form.type,
      power: form.power.trim()
    };

    if (!data.name || !data.type || !data.power) {
      toast.error("Please fill all fields!");
      return;
    }

    if (editingId !== null) {
      const updated = chargers.map((charger) =>
        charger.id === editingId
          ? { ...charger, ...data }
          : charger
      );

      if (saveChargers(updated)) {
        toast.success("Charger updated successfully!");
        handleClose();
      }
    } else {
      const newCharger = {
        id: crypto.randomUUID(),
        ...data
      };

      if (saveChargers([...chargers, newCharger])) {
        toast.success("Charger added successfully!");
        handleClose();
      }
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this charger?")) {
      return;
    }

    const updated = chargers.filter((charger) => charger.id !== id);

    if (saveChargers(updated)) {
      toast.success("Charger deleted successfully!");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#eff7fd",
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
            sx={{ color: "#10b981", fontWeight: 800, mb: 1 }}
          >
            ADMIN PANEL
          </Typography>

          <Typography
            variant="h4"
            sx={{ color: "#092b40", fontWeight: 800 }}
          >
            Manage Chargers
          </Typography>

          <Typography sx={{ color: "#164b91", mt: 1 }}>
            Manage AC and DC charging equipment.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            bgcolor: "#10b981",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#059669" }
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
          border: "1px solid #e2edf5"
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 550 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e8fff7" }}>
                {["#", "Charger Name", "Type", "Power", "Actions"].map(
                  (heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        fontWeight: 800,
                        color: "#092b40"
                      }}
                    >
                      {heading}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {chargers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    No chargers found.
                  </TableCell>
                </TableRow>
              ) : (
                chargers.map((charger, index) => (
                  <TableRow key={charger.id} hover>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
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

                    <TableCell>{charger.power}</TableCell>

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
                        onClick={() => handleDelete(charger.id)}
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleSave} noValidate>
          <DialogTitle sx={{ color: "#092b40", fontWeight: 800 }}>
            {editingId !== null ? "Edit Charger" : "Add Charger"}
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Charger Name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Charger Type</InputLabel>
              <Select
                value={form.type}
                label="Charger Type"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value
                  }))
                }
              >
                <MenuItem value="AC">AC Charger</MenuItem>
                <MenuItem value="DC">DC Charger</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Charging Power"
              placeholder="Example: 60 kW"
              value={form.power}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  power: e.target.value
                }))
              }
            />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#10b981",
                "&:hover": { bgcolor: "#059669" }
              }}
            >
              {editingId !== null ? "Save Changes" : "Add Charger"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}