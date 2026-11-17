
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";
import toast from "react-hot-toast";

import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Button,
  Divider,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryIcon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ORDERS_KEY = "evWiseOrders";

function OrderProductImage({ src, name }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return <InventoryIcon sx={{ color: "#10b981" }} />;
  }

  return (
    <Box
      component="img"
      src={src}
      alt={name || "Product"}
      onError={() => setFailed(true)}
      sx={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}

const statusColors = {
  Pending: "#f59e0b",
  Accepted: "#10b981",
  "On the Way": "#3b82f6",
  Delivered: "#10b981",
  Rejected: "#ef4444"
};

const statusMessages = {
  Pending: "Your order is waiting for admin approval.",
  Accepted: "Your order has been accepted by the admin.",
  "On the Way": "Your order is on the way!",
  Delivered: "You confirmed receiving your order.",
  Rejected: "Your order has been rejected."
};

const readOrders = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const belongsToUser = (order, currentUser) => {
  if (!currentUser || !order) return false;

  const userId = currentUser.id ?? null;
  const userEmail = String(
    currentUser.email || ""
  ).trim().toLowerCase();

  if (userId != null && order.userId != null) {
    return String(order.userId) === String(userId);
  }

  return (
    Boolean(userEmail) &&
    Boolean(order.userEmail) &&
    String(order.userEmail)
      .trim()
      .toLowerCase() === userEmail
  );
};

const getUserOrders = (currentUser) => {
  return readOrders()
    .filter((order) => belongsToUser(order, currentUser))
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );
};

export default function MyOrders() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [orders, setOrders] = useState([]);
  const [confirmOrderId, setConfirmOrderId] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const refreshOrders = () => {
    setOrders(getUserOrders(currentUser));
  };

  useEffect(() => {
    const updateOrders = () => {
      setOrders(getUserOrders(currentUser));
    };

    updateOrders();

    window.addEventListener(
      "evWiseOrdersUpdated",
      updateOrders
    );

    window.addEventListener("storage", updateOrders);
    window.addEventListener("focus", updateOrders);
    window.addEventListener("pageshow", updateOrders);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateOrders();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "evWiseOrdersUpdated",
        updateOrders
      );

      window.removeEventListener("storage", updateOrders);
      window.removeEventListener("focus", updateOrders);
      window.removeEventListener("pageshow", updateOrders);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [currentUser?.id, currentUser?.email]);

  const confirmDelivery = () => {
    if (confirming || !confirmOrderId) return;

    setConfirming(true);

    try {
      const latestOrders = readOrders();

      const targetOrder = latestOrders.find(
        (order) => order.id === confirmOrderId
      );

      if (!belongsToUser(targetOrder, currentUser)) {
        toast.error("You cannot confirm this order!");
        setConfirmOrderId(null);
        refreshOrders();
        return;
      }

      if (targetOrder.status !== "On the Way") {
        toast.error(
          "This order is not currently on the way!"
        );
        setConfirmOrderId(null);
        refreshOrders();
        return;
      }

      const confirmedAt = new Date().toISOString();

      const updatedOrders = latestOrders.map((order) =>
        order.id === confirmOrderId
          ? {
              ...order,
              status: "Delivered",
              deliveryConfirmedBy: "Customer",
              deliveredAt: confirmedAt,
              updatedAt: confirmedAt
            }
          : order
      );

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(updatedOrders)
      );

      setConfirmOrderId(null);
      refreshOrders();

      window.dispatchEvent(
        new Event("evWiseOrdersUpdated")
      );

      toast.success(
        "Delivery confirmed successfully!"
      );
    } catch (error) {
      console.error("Delivery confirmation error:", error);
      toast.error("Unable to confirm delivery!");
    } finally {
      setConfirming(false);
    }
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
            mb: 3,
            textTransform: "none",
            fontWeight: 700
          }}
        >
          Back to Shop
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#10b981",
                fontWeight: 800,
                fontSize: 14,
                mb: 1
              }}
            >
              EV WISE SHOP
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 800 }}
            >
              My Orders
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refreshOrders}
            sx={{
              color: "#10b981",
              borderColor: "#10b981",
              textTransform: "none"
            }}
          >
            Refresh Orders
          </Button>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Track your orders and confirm when they arrive.
        </Typography>

        {orders.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: 70,
                color: "#10b981",
                mb: 2
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontWeight: 800, mb: 1 }}
            >
              No Orders Found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              You have no orders linked to this account.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/Shop")}
              sx={{
                bgcolor: "#10b981",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#059669"
                }
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {orders.map((order) => {
              const status = order.status || "Pending";

              return (
                <Paper
                  key={order.id}
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 17,
                          mb: 1
                        }}
                      >
                        Order #{String(order.id).slice(0, 8)}
                      </Typography>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 12
                        }}
                      >
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleString()
                          : "Date unavailable"}
                      </Typography>
                    </Box>

                    <Chip
                      label={status}
                      sx={{
                        bgcolor: `${
                          statusColors[status] || "#f59e0b"
                        }22`,
                        color:
                          statusColors[status] || "#f59e0b",
                        fontWeight: 800
                      }}
                    />
                  </Box>

                  <Alert
                    severity={
                      status === "Rejected"
                        ? "error"
                        : status === "Pending"
                        ? "warning"
                        : status === "On the Way"
                        ? "info"
                        : "success"
                    }
                    sx={{ mb: 3 }}
                  >
                    {statusMessages[status] ||
                      "Your order is being processed."}
                  </Alert>

                  <Divider sx={{ mb: 3 }} />

                  <Stack spacing={2}>
                    {(order.items || []).map(
                      (item, index) => (
                        <Box
                          key={`${item.id}-${index}`}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 2
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              minWidth: 0
                            }}
                          >
                            <Box
                              sx={{
                                width: 65,
                                height: 65,
                                bgcolor:
                                  "rgba(16,185,129,0.08)",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0
                              }}
                            >
                              <OrderProductImage
                                src={item.image}
                                name={item.name}
                              />
                            </Box>

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
                                color="text.secondary"
                                sx={{ fontSize: 12 }}
                              >
                                Quantity: {item.quantity}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: 14,
                              whiteSpace: "nowrap"
                            }}
                          >
                            {Number(
                              item.subtotal || 0
                            ).toFixed(2)} JOD
                          </Typography>
                        </Box>
                      )
                    )}
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography fontWeight={800}>
                      Total Amount
                    </Typography>

                    <Typography
                      sx={{
                        color: "#10b981",
                        fontSize: 21,
                        fontWeight: 800
                      }}
                    >
                      {Number(
                        order.totalPrice || 0
                      ).toFixed(2)} JOD
                    </Typography>
                  </Box>

                  {status === "On the Way" && (
                    <Box
                      sx={{
                        mt: 3,
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor: "rgba(59,130,246,0.07)",
                        border: "1px solid rgba(59,130,246,0.25)"
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: "center",
                          color: "#3b82f6",
                          mb: 2
                        }}
                      >
                        <LocalShippingIcon />

                        <Typography fontWeight={800}>
                          Your package is on the way!
                        </Typography>
                      </Stack>

                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 13, mb: 2 }}
                      >
                        Once you receive your package,
                        please confirm delivery below.
                      </Typography>

                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<CheckCircleIcon />}
                        onClick={() =>
                          setConfirmOrderId(order.id)
                        }
                        sx={{
                          bgcolor: "#10b981",
                          color: "#ffffff",
                          fontWeight: 800,
                          textTransform: "none",
                          py: 1.3,
                          "&:hover": {
                            bgcolor: "#059669"
                          }
                        }}
                      >
                        Confirm Delivery
                      </Button>
                    </Box>
                  )}

                  {status === "Delivered" && (
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(16,185,129,0.08)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ color: "#10b981" }}
                      />

                      <Box>
                        <Typography
                          sx={{
                            color: "#10b981",
                            fontWeight: 800
                          }}
                        >
                          Delivery Confirmed
                        </Typography>

                        {order.deliveredAt && (
                          <Typography
                            color="text.secondary"
                            sx={{ fontSize: 12 }}
                          >
                            Received on{" "}
                            {new Date(
                              order.deliveredAt
                            ).toLocaleString()}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>

      <Dialog
        open={Boolean(confirmOrderId)}
        onClose={() => {
          if (!confirming) setConfirmOrderId(null);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          Confirm Delivery
        </DialogTitle>

        <DialogContent>
          <Typography>
            Have you received your order?
            Please confirm only after the package
            has actually arrived.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            disabled={confirming}
            onClick={() => setConfirmOrderId(null)}
            sx={{
              textTransform: "none",
              color: "text.secondary"
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={confirming}
            onClick={confirmDelivery}
            sx={{
              bgcolor: "#10b981",
              color: "#fff",
              textTransform: "none",
              fontWeight: 800,
              "&:hover": {
                bgcolor: "#059669"
              }
            }}
          >
            Yes, I Received It
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
