
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
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { CarsContext } from "../Context/CarsContext";

const emptyCar = {
  name: "",
  brand: "",
  image: "",
  range: "",
  battery: "",
  charging: ""
};

export default function ManageCars() {
  const { cars, addCar, updateCar, deleteCar } =
    useContext(CarsContext);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyCar);

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCar });
    setOpen(true);
  };

  const handleEdit = (car) => {
    setEditingId(car.id);

    setForm({
      name: car.name || "",
      brand: car.brand || "",
      image: car.image || "",
      range: car.range || "",
      battery: car.battery || "",
      charging: car.charging || ""
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyCar });
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
      brand: form.brand.trim(),
      image: form.image.trim(),
      range: form.range.trim(),
      battery: form.battery.trim(),
      charging: form.charging.trim()
    };

    if (Object.values(data).some((value) => !value)) {
      toast.error("Please fill all fields!");
      return;
    }

    const duplicateBrand = cars.some(
      (car) =>
        car.brand?.toLowerCase() ===
          data.brand.toLowerCase() &&
        car.id !== editingId
    );

    if (duplicateBrand) {
      toast.error("This car brand ID already exists!");
      return;
    }

    if (editingId !== null) {
      updateCar(editingId, data);
      toast.success("Car updated successfully!");
    } else {
      addCar(data);
      toast.success("Car added successfully!");
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmed) return;

    deleteCar(id);
    toast.success("Car deleted successfully!");
  };

  const fields = [
    {
      name: "name",
      label: "Car Name",
      placeholder: "Tesla Model 3"
    },
    {
      name: "brand",
      label: "Brand ID",
      placeholder: "tesla"
    },
    {
      name: "image",
      label: "Car Image Path",
      placeholder: "/tesla.jpg"
    },
    {
      name: "range",
      label: "Driving Range",
      placeholder: "520 km"
    },
    {
      name: "battery",
      label: "Battery Capacity",
      placeholder: "60 kWh"
    },
    {
      name: "charging",
      label: "Charging Time",
      placeholder: "15 min"
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
            Manage Cars
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1
            }}
          >
            Add, edit and delete electric cars.
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
          Add Car
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
                  "Image",
                  "Car Name",
                  "Range",
                  "Battery",
                  "Charging Time",
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
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    No cars found.
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((car, index) => (
                  <TableRow key={car.id} hover>
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      {car.image ? (
                        <Box
                          component="img"
                          src={car.image}
                          alt={car.name}
                          sx={{
                            width: 80,
                            height: 55,
                            objectFit: "contain"
                          }}
                        />
                      ) : (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          No image
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "text.primary"
                      }}
                    >
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
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
            {editingId !== null ? "Edit Car" : "Add Car"}
          </DialogTitle>

          <DialogContent>
            {fields.map((field) => (
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2
                  }
                }}
              />
            ))}

            {form.image && (
              <Box
                component="img"
                src={form.image}
                alt="Car preview"
                sx={{
                  width: "100%",
                  height: 150,
                  objectFit: "contain",
                  mt: 2
                }}
              />
            )}
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
                : "Add Car"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
