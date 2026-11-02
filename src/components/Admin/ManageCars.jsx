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
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const STORAGE_KEY = "evWiseAdminCars";

const initialCars = [
  {
    id: "1",
    name: "Tesla Model 3",
    range: "520 km",
    battery: "60 kWh",
    charging: "15 min"
  },
  {
    id: "2",
    name: "Hyundai IONIQ 5",
    range: "620 km",
    battery: "84 kWh",
    charging: "18 min"
  },
  {
    id: "3",
    name: "BMW i4",
    range: "590 km",
    battery: "83.9 kWh",
    charging: "31 min"
  },
  {
    id: "4",
    name: "Nissan Leaf",
    range: "300 km",
    battery: "40 kWh",
    charging: "60 min"
  },
  {
    id: "5",
    name: "Kia EV6",
    range: "620 km",
    battery: "84 kWh",
    charging: "24 min"
  }
];

const emptyCar = {
  name: "",
  range: "",
  battery: "",
  charging: ""
};

const loadCars = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return initialCars;
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialCars;
  } catch {
    return initialCars;
  }
};

export default function ManageCars() {
  const [cars, setCars] = useState(loadCars);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyCar);

  const saveCars = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCars(updated);
      return true;
    } catch {
      toast.error("Failed to save cars!");
      return false;
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCar });
    setOpen(true);
  };

  const handleEdit = (car) => {
    setEditingId(car.id);
    setForm({
      name: car.name,
      range: car.range,
      battery: car.battery,
      charging: car.charging
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyCar });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      name: form.name.trim(),
      range: form.range.trim(),
      battery: form.battery.trim(),
      charging: form.charging.trim()
    };

    if (Object.values(data).some((value) => !value)) {
      toast.error("Please fill all fields!");
      return;
    }

    if (editingId !== null) {
      const updated = cars.map((car) =>
        car.id === editingId ? { ...car, ...data } : car
      );

      if (saveCars(updated)) {
        toast.success("Car updated successfully!");
        handleClose();
      }
    } else {
      const newCar = {
        id: crypto.randomUUID(),
        ...data
      };

      if (saveCars([...cars, newCar])) {
        toast.success("Car added successfully!");
        handleClose();
      }
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    const updated = cars.filter((car) => car.id !== id);

    if (saveCars(updated)) {
      toast.success("Car deleted successfully!");
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
            Manage Cars
          </Typography>

          <Typography sx={{ color: "#164b91", mt: 1 }}>
            Add, edit and delete electric cars.
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
          Add Car
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
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e8fff7" }}>
                {[
                  "#",
                  "Car Name",
                  "Range",
                  "Battery",
                  "Charging Time",
                  "Actions"
                ].map((heading) => (
                  <TableCell
                    key={heading}
                    sx={{ fontWeight: 800, color: "#092b40" }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    No cars found.
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((car, index) => (
                  <TableRow key={car.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {car.name}
                    </TableCell>
                    <TableCell>{car.range}</TableCell>
                    <TableCell>{car.battery}</TableCell>
                    <TableCell>{car.charging}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(car)}
                        aria-label={`Edit ${car.name}`}
                        sx={{ color: "#168cf0" }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(car.id)}
                        aria-label={`Delete ${car.name}`}
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
            {editingId !== null ? "Edit Car" : "Add Car"}
          </DialogTitle>

          <DialogContent>
            {[
              { name: "name", label: "Car Name" },
              { name: "range", label: "Driving Range" },
              { name: "battery", label: "Battery Capacity" },
              { name: "charging", label: "Charging Time" }
            ].map((field) => (
              <TextField
                key={field.name}
                fullWidth
                margin="normal"
                label={field.label}
                value={form[field.name]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.name]: e.target.value
                  }))
                }
              />
            ))}
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
              {editingId !== null ? "Save Changes" : "Add Car"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}