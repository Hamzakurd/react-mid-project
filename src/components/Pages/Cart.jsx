
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  Stack,
  Chip,
  Alert
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryIcon from "@mui/icons-material/Inventory2";

import { ProductsContext } from "../Context/ProductsContext";

const CART_KEY = "evWiseCart";

const getSavedCart = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export default function Cart() {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const [cart, setCart] = useState(getSavedCart);

  const saveCart = (updatedCart) => {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedCart)
      );

      setCart(updatedCart);

      window.dispatchEvent(
        new Event("evWiseCartUpdated")
      );

      return true;
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Unable to update your cart!");
      return false;
    }
  };

  const cartItems = cart.map((item) => {
    const product = products.find(
      (product) => product.id === item.id
    );

    const quantity = Number(item.quantity);
    const stock = product ? Number(product.stock) : 0;
    const price = product ? Number(product.price) : 0;

    return {
      ...product,
      id: item.id,
      name: product?.name || "Product unavailable",
      category: product?.category || "Unavailable",
      image: product?.image || "",
      quantity,
      stock,
      price,
      exists: Boolean(product),
      valid:
        Boolean(product) &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        Number.isInteger(stock) &&
        stock >= quantity &&
        Number.isFinite(price) &&
        price > 0
    };
  });

  const hasInvalidItems = cartItems.some(
    (item) => !item.valid
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + (
        Number.isInteger(item.quantity) &&
        item.quantity > 0
          ? item.quantity
          : 0
      ),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => {
      if (
        !Number.isFinite(item.price) ||
        item.price <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return total;
      }

      return total + item.price * item.quantity;
    },
    0
  );

  const changeQuantity = (id, amount) => {
    const product = products.find(
      (product) => product.id === id
    );

    if (!product) {
      toast.error("Product is no longer available!");
      return;
    }

    const currentItem = cart.find(
      (item) => item.id === id
    );

    if (!currentItem) return;

    const currentQuantity =
      Number(currentItem.quantity) || 0;

    const newQuantity = currentQuantity + amount;

    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    if (newQuantity > Number(product.stock)) {
      toast.error("No more stock available!");
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    );

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    if (saveCart(updatedCart)) {
      toast.success("Product removed from cart!");
    }
  };

  const clearCart = () => {
    if (!window.confirm("Clear your shopping cart?")) {
      return;
    }

    if (saveCart([])) {
      toast.success("Cart cleared!");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (hasInvalidItems) {
      toast.error(
        "Please review unavailable products or stock quantities!"
      );
      return;
    }

    navigate("/Checkout");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        py: 5
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/Shop")}
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mb: 3,
            textTransform: "none"
          }}
        >
          Continue Shopping
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1
          }}
        >
          <ShoppingCartIcon
            sx={{
              fontSize: 36,
              color: "#10b981"
            }}
          />

          <Typography
            variant="h4"
            sx={{ fontWeight: 800 }}
          >
            Shopping Cart
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4
          }}
        >
          Review your selected EV products.
        </Typography>

        {cartItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 3,
              textAlign: "center",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 75,
                color: "#10b981",
                mb: 2
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 1
              }}
            >
              Your Cart is Empty
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Start shopping and add your favorite EV products.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/Shop")}
              sx={{
                bgcolor: "#10b981",
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#059669"
                }
              }}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 2fr) minmax(280px, 1fr)"
              },
              gap: 3,
              alignItems: "start"
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              {hasInvalidItems && (
                <Alert
                  severity="warning"
                  sx={{ mb: 2, borderRadius: 2 }}
                >
                  Some products are unavailable or their
                  requested quantity exceeds the current
                  stock. Please update your cart before checkout.
                </Alert>
              )}

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800 }}
                  >
                    Cart Items ({totalItems})
                  </Typography>

                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={clearCart}
                    sx={{ textTransform: "none" }}
                  >
                    Clear
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                  {cartItems.map((item) => (
                    <Box key={item.id}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "column",
                            sm: "row"
                          },
                          gap: 3
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: "100%",
                              sm: 125
                            },
                            height: 125,
                            bgcolor: "rgba(16,185,129,0.08)",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            flexShrink: 0
                          }}
                        >
                          {item.image ? (
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                              }}
                            />
                          ) : (
                            <InventoryIcon
                              sx={{
                                fontSize: 55,
                                color: "#10b981"
                              }}
                            />
                          )}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{
                              color: "#10b981",
                              bgcolor: "rgba(16,185,129,0.12)",
                              mb: 1
                            }}
                          />

                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: 17,
                              mb: 1
                            }}
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            sx={{
                              color: "#10b981",
                              fontWeight: 800,
                              fontSize: 18,
                              mb: 1
                            }}
                          >
                            {Number.isFinite(item.price) &&
                            item.price > 0
                              ? `${item.price.toFixed(2)} JOD`
                              : "Price unavailable"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "text.secondary",
                              mb: 1
                            }}
                          >
                            {item.exists
                              ? `${item.stock} available in stock`
                              : "This product was removed"}
                          </Typography>

                          {!item.valid && (
                            <Typography
                              sx={{
                                color: "error.main",
                                fontWeight: 700,
                                fontSize: 12,
                                mb: 2
                              }}
                            >
                              Please review this product
                              before checkout.
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: 2
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  changeQuantity(item.id, -1)
                                }
                                disabled={
                                  !item.exists ||
                                  item.quantity <= 1
                                }
                                size="small"
                              >
                                <RemoveIcon />
                              </IconButton>

                              <Typography
                                sx={{
                                  px: 2,
                                  fontWeight: 800
                                }}
                              >
                                {item.quantity}
                              </Typography>

                              <IconButton
                                onClick={() =>
                                  changeQuantity(item.id, 1)
                                }
                                disabled={
                                  !item.exists ||
                                  item.quantity >= item.stock
                                }
                                size="small"
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>

                            <IconButton
                              color="error"
                              onClick={() =>
                                removeItem(item.id)
                              }
                              aria-label={`Remove ${item.name}`}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          textAlign: "right",
                          fontWeight: 800,
                          mt: 2,
                          mb: 2
                        }}
                      >
                        Subtotal:{" "}
                        {Number.isFinite(item.price) &&
                        item.price > 0 &&
                        Number.isInteger(item.quantity) &&
                        item.quantity > 0
                          ? (
                              item.price * item.quantity
                            ).toFixed(2)
                          : "0.00"}{" "}
                        JOD
                      </Typography>

                      <Divider />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider"
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mb: 3
                }}
              >
                Order Summary
              </Typography>

              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography color="text.secondary">
                    Items
                  </Typography>

                  <Typography fontWeight={700}>
                    {totalItems}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography color="text.secondary">
                    Subtotal
                  </Typography>

                  <Typography fontWeight={700}>
                    {totalPrice.toFixed(2)} JOD
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography fontWeight={800}>
                    Total
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#10b981",
                      fontSize: 21
                    }}
                  >
                    {totalPrice.toFixed(2)} JOD
                  </Typography>
                </Box>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                disabled={
                  cartItems.length === 0 ||
                  hasInvalidItems ||
                  totalPrice <= 0
                }
                sx={{
                  bgcolor: "#10b981",
                  color: "#fff",
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#059669"
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: 12,
                  mt: 2
                }}
              >
                Stock availability will be checked again
                before placing your order.
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
