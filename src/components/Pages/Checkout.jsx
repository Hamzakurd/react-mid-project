
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Stack,
  Chip
} from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { ProductsContext } from "../Context/ProductsContext";
import { useAuth } from "../Hooks/UseAuth";

const CART_KEY = "evWiseCart";
const ORDERS_KEY = "evWiseOrders";

const readArray = (key) => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export default function Checkout() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { products, updateProduct } =
    useContext(ProductsContext);

  const [cart, setCart] = useState(() =>
    readArray(CART_KEY)
  );

  const [completedOrder, setCompletedOrder] =
    useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: ""
  });

  const submittingRef = useRef(false);

  const cartItems = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      if (!product) return null;

      return {
        ...product,
        quantity: Number(item.quantity) || 0
      };
    })
    .filter(Boolean);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const userId = currentUser?.id ?? null;

    const userEmail = String(
      currentUser?.email || ""
    ).trim().toLowerCase();

    if (userId == null && !userEmail) {
      toast.error(
        "Please login or register before placing an order!"
      );

      navigate("/Login", {
        state: { from: "/Checkout" }
      });

      return;
    }

    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();
    const city = formData.city.trim();
    const address = formData.address.trim();
    const notes = formData.notes.trim();

    if (!fullName || !phone || !city || !address) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!/^\+?[\d\s-]{7,18}$/.test(phone)) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    const latestCart = readArray(CART_KEY);

    if (latestCart.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/Cart");
      return;
    }

    const requestedQuantities = new Map();

    for (const item of latestCart) {
      const quantity = Number(item.quantity);

      if (
        item.id == null ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        toast.error("Invalid cart quantity!");
        navigate("/Cart");
        return;
      }

      requestedQuantities.set(
        item.id,
        (requestedQuantities.get(item.id) || 0) + quantity
      );
    }

    const orderItems = [];

    for (const [id, quantity] of requestedQuantities) {
      const product = products.find(
        (item) => item.id === id
      );

      if (!product) {
        toast.error(
          "A product in your cart is no longer available!"
        );
        navigate("/Cart");
        return;
      }

      const stock = Number(product.stock);
      const price = Number(product.price);

      if (
        !Number.isInteger(stock) ||
        stock < quantity
      ) {
        toast.error(
          `Not enough stock for ${product.name}!`
        );
        navigate("/Cart");
        return;
      }

      if (!Number.isFinite(price) || price <= 0) {
        toast.error(
          `Invalid price for ${product.name}!`
        );
        return;
      }

      orderItems.push({
        id: product.id,
        name: product.name,
        image: product.image || "",
        category: product.category || "",
        price,
        quantity,
        subtotal: price * quantity
      });
    }

    const orderTotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    const newOrder = {
      id: crypto.randomUUID(),
      userId,
      userEmail,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        city,
        address,
        notes
      },
      items: orderItems,
      totalItems: orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      totalPrice: orderTotal,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
      stockDeducted: true
    };

    submittingRef.current = true;

    try {
      const existingOrders = readArray(ORDERS_KEY);

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([...existingOrders, newOrder])
      );

      for (const item of orderItems) {
        const product = products.find(
          (product) => product.id === item.id
        );

        updateProduct(item.id, {
          stock: Number(product.stock) - item.quantity
        });
      }

      localStorage.removeItem(CART_KEY);

      window.dispatchEvent(
        new Event("evWiseCartUpdated")
      );

      window.dispatchEvent(
        new Event("evWiseOrdersUpdated")
      );

      setCart([]);
      setCompletedOrder(newOrder);

      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Unable to complete your order!");
    } finally {
      submittingRef.current = false;
    }
  };

  if (completedOrder) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 8
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "#10b981",
                mb: 2
              }}
            />

            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mb: 2 }}
            >
              Order Submitted!
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Your order has been sent to the admin for review.
            </Typography>

            <Chip
              label="Pending"
              sx={{
                bgcolor: "rgba(245,158,11,0.15)",
                color: "#f59e0b",
                fontWeight: 800,
                mb: 3
              }}
            />

            <Typography color="text.secondary">
              Order ID
            </Typography>

            <Typography
              sx={{
                fontWeight: 700,
                overflowWrap: "anywhere",
                mb: 3
              }}
            >
              {completedOrder.id}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Total Amount
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#10b981",
                mb: 4
              }}
            >
              {completedOrder.totalPrice.toFixed(2)} JOD
            </Typography>

            <Stack spacing={2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingBagIcon />}
                onClick={() => navigate("/MyOrders")}
                sx={{
                  bgcolor: "#10b981",
                  color: "#fff",
                  py: 1.5,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#059669"
                  }
                }}
              >
                View My Orders
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/Shop")}
                sx={{
                  py: 1.5,
                  borderColor: "#10b981",
                  color: "#10b981",
                  fontWeight: 700,
                  textTransform: "none"
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

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
          onClick={() => navigate("/Cart")}
          sx={{
            color: "text.primary",
            mb: 3,
            fontWeight: 700,
            textTransform: "none"
          }}
        >
          Back to Cart
        </Button>

        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: 14,
            mb: 1
          }}
        >
          EV WISE SHOP
        </Typography>

        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 1 }}
        >
          Checkout
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Enter your delivery information and review your order.
        </Typography>

        {cartItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "background.paper"
            }}
          >
            <InventoryIcon
              sx={{ fontSize: 65, color: "#10b981" }}
            />

            <Typography
              variant="h6"
              sx={{ mt: 2, mb: 3 }}
            >
              Your cart is empty.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/Shop")}
              sx={{
                bgcolor: "#10b981",
                "&:hover": { bgcolor: "#059669" }
              }}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box
            component="form"
            onSubmit={handlePlaceOrder}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1.5fr) minmax(280px, 1fr)"
              },
              gap: 3,
              alignItems: "start"
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider"
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <LocalShippingIcon
                  sx={{ color: "#10b981" }}
                />

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800 }}
                >
                  Delivery Information
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                />

                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                />

                <TextField
                  fullWidth
                  required
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Amman"
                />

                <TextField
                  fullWidth
                  required
                  label="Delivery Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  placeholder="Street, building, and area"
                />

                <TextField
                  fullWidth
                  label="Order Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  multiline
                  minRows={3}
                  placeholder="Additional delivery instructions"
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography
                sx={{ fontWeight: 800, mb: 1 }}
              >
                Payment Method
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderColor: "#10b981",
                  bgcolor: "rgba(16,185,129,0.06)",
                  borderRadius: 2
                }}
              >
                <Typography fontWeight={700}>
                  Cash on Delivery
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    mt: 0.5
                  }}
                >
                  Demo checkout. No real payment is processed.
                </Typography>
              </Paper>
            </Paper>

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
                sx={{ fontWeight: 800, mb: 3 }}
              >
                Order Summary
              </Typography>

              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <Box key={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 14
                          }}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "text.secondary"
                          }}
                        >
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {(
                          Number(item.price) * item.quantity
                        ).toFixed(2)} JOD
                      </Typography>
                    </Box>

                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  mb: 1
                }}
              >
                <Typography color="text.secondary">
                  Total Items
                </Typography>

                <Typography fontWeight={700}>
                  {totalItems}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2
                }}
              >
                <Typography fontWeight={800}>
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 21,
                    color: "#10b981"
                  }}
                >
                  {totalPrice.toFixed(2)} JOD
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  mt: 4,
                  py: 1.5,
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 800,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#059669"
                  }
                }}
              >
                Place Order
              </Button>

              <Typography
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  fontSize: 12,
                  mt: 2
                }}
              >
                Your order will be saved as Pending.
                You can track it in My Orders.
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
