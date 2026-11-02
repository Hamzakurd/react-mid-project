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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Read saved products
const getSavedProducts = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("evWiseProducts") || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const emptyProduct = {
  name: "",
  description: ""
};

export default function DisplayProducts() {
  const [products, setProducts] = useState(getSavedProducts);

  const [openForm, setOpenForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyProduct);

  // SAVE PRODUCTS
  const saveProducts = (updatedProducts) => {
    try {
      localStorage.setItem(
        "evWiseProducts",
        JSON.stringify(updatedProducts)
      );

      setProducts(updatedProducts);
      return true;
    } catch (error) {
      console.error("Failed to save products:", error);
      toast.error("Unable to save products!");
      return false;
    }
  };

  // OPEN ADD FORM
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyProduct);
    setOpenForm(true);
  };

  // OPEN EDIT FORM
  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      description: product.description
    });

    setOpenForm(true);
  };

  // CLOSE FORM
  const handleClose = () => {
    setOpenForm(false);
    setEditingId(null);
    setFormData(emptyProduct);
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ADD OR UPDATE PRODUCT
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name || !description) {
      toast.error("Please fill all fields!");
      return;
    }

    if (editingId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? {
              ...product,
              name,
              description
            }
          : product
      );

      if (saveProducts(updatedProducts)) {
        toast.success("Product updated successfully!");
        handleClose();
      }

      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description
    };

    const updatedProducts = [...products, newProduct];

    if (saveProducts(updatedProducts)) {
      toast.success("Product added successfully!");
      handleClose();
    }
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    if (saveProducts(updatedProducts)) {
      toast.success("Product deleted successfully!");
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
            Manage Products
          </Typography>

          <Typography
            sx={{
              color: "#164b91",
              mt: 1,
              fontSize: 14
            }}
          >
            Add, edit and delete your products.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
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
          Add Product
        </Button>
      </Box>

      {/* PRODUCTS TABLE */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e2edf5",
          backgroundColor: "white"
        }}
      >
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto"
          }}
        >
          <Table sx={{ minWidth: 550 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#e8fff7"
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 800,
                    color: "#092b40"
                  }}
                >
                  #
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    color: "#092b40"
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    color: "#092b40"
                  }}
                >
                  Description
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 800,
                    color: "#092b40"
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      py: 6,
                      color: "#718096"
                    }}
                  >
                    No products found. Add your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, index) => (
                  <TableRow
                    key={product.id}
                    hover
                  >
                    <TableCell
                      sx={{
                        color: "#164b91"
                      }}
                    >
                      {index + 1}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "#092b40"
                      }}
                    >
                      {product.name}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "#164b91",
                        maxWidth: 400,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {product.description}
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1
                        }}
                      >
                        <IconButton
                          aria-label={`Edit ${product.name}`}
                          onClick={() => handleEdit(product)}
                          sx={{
                            color: "#168cf0",
                            backgroundColor: "#e1f3ff",

                            "&:hover": {
                              backgroundColor: "#cce8ff"
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          aria-label={`Delete ${product.name}`}
                          onClick={() => deleteProduct(product.id)}
                          sx={{
                            color: "#ef4444",
                            backgroundColor: "#fee2e2",

                            "&:hover": {
                              backgroundColor: "#fecaca"
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

      {/* ADD / EDIT PRODUCT DIALOG */}

      <Dialog
        open={openForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              p: { xs: 1, sm: 2 }
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
              color: "#092b40",
              fontWeight: 800,
              fontSize: 24
            }}
          >
            {editingId !== null
              ? "Edit Product"
              : "Add Product"}
          </DialogTitle>

          <DialogContent>
            <Typography
              sx={{
                color: "#164b91",
                fontSize: 14,
                mb: 3
              }}
            >
              Enter the product information below.
            </Typography>

            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 2,
              gap: 1
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                color: "#164b91",
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
                backgroundColor: "#10b981",
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "#059669"
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