
import { useState, useContext } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  IconButton,
  Chip,
  MenuItem,
  Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory2";

import { ProductsContext } from "../Context/ProductsContext";

const categories = [
  "Chargers",
  "Batteries",
  "Motors",
  "Spare Parts",
  "Accessories"
];

const emptyProduct = {
  name: "",
  description: "",
  category: "Chargers",
  price: "",
  stock: "",
  image: "",
  compatibleModels: ""
};

const normalizeImageUrl = (value) => {
  const rawImage = value.trim();

  if (!rawImage) return "";

  if (rawImage.startsWith("//")) {
    return `https:${rawImage}`;
  }

  if (/^https?:\/\//i.test(rawImage)) {
    return rawImage;
  }

  if (rawImage.startsWith("/")) {
    return rawImage;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(rawImage)) {
    return null;
  }

  return `https://${rawImage}`;
};

export default function DisplayProducts() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  } = useContext(ProductsContext);

  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ...emptyProduct
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyProduct });
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "Spare Parts",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image || "",
      compatibleModels: Array.isArray(product.compatibleModels)
        ? product.compatibleModels.join(", ")
        : product.compatibleModels || ""
    });

    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setEditingId(null);
    setFormData({ ...emptyProduct });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();
    const category = formData.category;
    const price = Number(formData.price);
    const stock = Number(formData.stock);

    const image = normalizeImageUrl(formData.image);

    const compatibleModels = formData.compatibleModels
      .split(",")
      .map((model) => model.trim())
      .filter(Boolean);

    if (!name || !description || !category) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (
      formData.price === "" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      toast.error("Please enter a valid price!");
      return;
    }

    if (
      formData.stock === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      toast.error("Please enter a valid stock quantity!");
      return;
    }

    if (image === null) {
      toast.error("Please enter a valid image URL!");
      return;
    }

    if (image && !image.startsWith("/")) {
      try {
        const url = new URL(image);

        if (
          !["http:", "https:"].includes(url.protocol) ||
          !url.hostname.includes(".")
        ) {
          throw new Error("Invalid image URL");
        }
      } catch {
        toast.error("Please enter a valid image URL!");
        return;
      }
    }

    const data = {
      name,
      description,
      category,
      price,
      stock,
      image,
      compatibleModels
    };

    if (editingId !== null) {
      updateProduct(editingId, data);
      toast.success("Product updated successfully!");
    } else {
      addProduct(data);
      toast.success("Product added successfully!");
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    deleteProduct(id);
    toast.success("Product deleted successfully!");
  };

  const totalStock = products.reduce(
    (total, product) =>
      total + (Number(product.stock) || 0),
    0
  );

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        boxSizing: "border-box",
        bgcolor: "background.default",
        color: "text.primary",
        p: { xs: 2, md: 4 }
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
              color: "text.primary",
              fontWeight: 800,
              fontSize: { xs: 25, md: 34 }
            }}
          >
            Manage Products
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
              fontSize: 14
            }}
          >
            Manage products for the EV Wise Shop.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            bgcolor: "#10b981",
            color: "#ffffff",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1.3,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#059669"
            }
          }}
        >
          Add Product
        </Button>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            flex: 1,
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              mb: 1,
              fontSize: 13
            }}
          >
            Total Products
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#10b981"
            }}
          >
            {products.length}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            flex: 1,
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              mb: 1,
              fontSize: 13
            }}
          >
            Total Stock
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary"
            }}
          >
            {totalStock}
          </Typography>
        </Paper>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "rgba(16,185,129,0.12)"
                }}
              >
                {[
                  "#",
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Compatible Models",
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
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 7 }}
                  >
                    <InventoryIcon
                      sx={{
                        fontSize: 44,
                        color: "text.secondary",
                        mb: 1
                      }}
                    />

                    <Typography color="text.secondary">
                      No products found. Add your first product.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, index) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          minWidth: 180
                        }}
                      >
                        <Box
                          sx={{
                            width: 58,
                            height: 58,
                            flexShrink: 0,
                            borderRadius: 2,
                            bgcolor: "rgba(16,185,129,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                          }}
                        >
                          {product.image ? (
                            <Box
                              component="img"
                              src={product.image}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }}
                            />
                          ) : (
                            <InventoryIcon
                              sx={{ color: "#10b981" }}
                            />
                          )}
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              color: "text.primary",
                              fontWeight: 700,
                              fontSize: 13
                            }}
                          >
                            {product.name}
                          </Typography>

                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: 12,
                              mt: 0.5,
                              maxWidth: 230,
                              overflowWrap: "anywhere"
                            }}
                          >
                            {product.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          product.category || "Uncategorized"
                        }
                        size="small"
                        sx={{
                          color: "#10b981",
                          bgcolor: "rgba(16,185,129,0.12)",
                          fontWeight: 700
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {product.price !== undefined &&
                      product.price !== "" &&
                      product.price !== null &&
                      Number.isFinite(Number(product.price))
                        ? `${Number(product.price).toFixed(2)} JOD`
                        : "—"}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          product.stock === undefined ||
                          product.stock === null ||
                          product.stock === ""
                            ? "Not set"
                            : Number(product.stock) > 0
                            ? `${product.stock} available`
                            : "Out of Stock"
                        }
                        size="small"
                        color={
                          Number(product.stock) > 0
                            ? "success"
                            : "default"
                        }
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell
                      sx={{
                        maxWidth: 180,
                        overflowWrap: "anywhere",
                        color: "text.secondary",
                        fontSize: 12
                      }}
                    >
                      {Array.isArray(product.compatibleModels)
                        ? product.compatibleModels.join(", ") ||
                          "Universal"
                        : product.compatibleModels || "Universal"}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1
                        }}
                      >
                        <IconButton
                          aria-label={`Edit ${product.name}`}
                          onClick={() => handleEdit(product)}
                          sx={{
                            color: "#60a5fa",
                            bgcolor: "rgba(96,165,250,0.12)",
                            "&:hover": {
                              bgcolor: "rgba(96,165,250,0.2)"
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          aria-label={`Delete ${product.name}`}
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          sx={{
                            color: "#f87171",
                            bgcolor: "rgba(248,113,113,0.12)",
                            "&:hover": {
                              bgcolor: "rgba(248,113,113,0.2)"
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={openForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              bgcolor: "background.paper",
              color: "text.primary"
            }
          }
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <DialogTitle
            sx={{
              fontWeight: 800,
              fontSize: 24,
              color: "text.primary"
            }}
          >
            {editingId !== null
              ? "Edit Product"
              : "Add Product"}
          </DialogTitle>

          <DialogContent dividers>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 14,
                mb: 2
              }}
            >
              Enter the product information below.
            </Typography>

            <TextField
              fullWidth
              required
              margin="normal"
              label="Product Name"
              name="name"
              placeholder="Volkswagen ID.4 Electric Motor"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              required
              select
              margin="normal"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                >
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                required
                type="number"
                label="Price (JOD)"
                name="price"
                placeholder="250"
                value={formData.price}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    min: 0.01,
                    step: 0.01
                  }
                }}
              />

              <TextField
                fullWidth
                required
                type="number"
                label="Stock Quantity"
                name="stock"
                placeholder="10"
                value={formData.stock}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 1
                  }
                }}
              />
            </Stack>

            <TextField
              fullWidth
              margin="normal"
              label="Image URL"
              name="image"
              placeholder="example.com/product.jpg"
              helperText="You can enter a full URL, a URL without https://, or a local path such as /images/motor.jpg."
              value={formData.image}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Compatible Models"
              name="compatibleModels"
              placeholder="ID.4, IONIQ 5, IONIQ 6"
              helperText="Separate vehicle models with commas."
              value={formData.compatibleModels}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              required
              multiline
              minRows={3}
              margin="normal"
              label="Description"
              name="description"
              placeholder="Enter product specifications and details"
              value={formData.description}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={handleClose}
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                textTransform: "none"
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#10b981",
                color: "#ffffff",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#059669"
                }
              }}
            >
              {editingId !== null
                ? "Save Changes"
                : "Add Product"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
