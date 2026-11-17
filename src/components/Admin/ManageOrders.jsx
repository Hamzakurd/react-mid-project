
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InventoryIcon from "@mui/icons-material/Inventory2";
import RefreshIcon from "@mui/icons-material/Refresh";

import { ProductsContext } from "../Context/ProductsContext";

const ORDERS_KEY = "evWiseOrders";

const getSavedOrders = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const statusColors = {
  Pending: "#f59e0b",
  Accepted: "#10b981",
  "On the Way": "#3b82f6",
  Delivered: "#60a5fa",
  Rejected: "#ef4444"
};

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString("en-JO");
};

const allowedTransitions = {
  Pending: ["Accepted", "Rejected"],
  Accepted: ["On the Way", "Rejected"],
  "On the Way": [],
  Delivered: [],
  Rejected: []
};

export default function ManageOrders() {
  const { products, updateProduct } =
    useContext(ProductsContext);

  const [orders, setOrders] = useState(getSavedOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const refreshOrders = () => {
    setOrders(getSavedOrders());
  };

  useEffect(() => {
    window.addEventListener("storage", refreshOrders);
    window.addEventListener(
      "evWiseOrdersUpdated",
      refreshOrders
    );
    window.addEventListener("focus", refreshOrders);

    return () => {
      window.removeEventListener("storage", refreshOrders);
      window.removeEventListener(
        "evWiseOrdersUpdated",
        refreshOrders
      );
      window.removeEventListener("focus", refreshOrders);
    };
  }, []);

  const saveOrders = (updatedOrders) => {
    try {
      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);

      window.dispatchEvent(
        new Event("evWiseOrdersUpdated")
      );

      return true;
    } catch (error) {
      console.error("Failed to save orders:", error);
      toast.error("Unable to update orders!");
      return false;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const latestOrders = getSavedOrders();

    const order = latestOrders.find(
      (item) => item.id === orderId
    );

    if (!order) {
      toast.error("Order not found!");
      return;
    }

    const currentStatus = order.status || "Pending";

    if (currentStatus === newStatus) return;

    const availableTransitions =
      allowedTransitions[currentStatus] || [];

    if (!availableTransitions.includes(newStatus)) {
      toast.error("This status change is not allowed!");
      return;
    }

    if (
      newStatus === "Rejected" &&
      !window.confirm(
        "Are you sure you want to reject this order?"
      )
    ) {
      return;
    }

    const shouldRestoreStock =
      newStatus === "Rejected" &&
      order.stockDeducted === true;

    const restoredQuantities = new Map();

    if (shouldRestoreStock) {
      for (const item of order.items || []) {
        const quantity = Number(item.quantity);

        if (
          !Number.isInteger(quantity) ||
          quantity <= 0
        ) {
          continue;
        }

        restoredQuantities.set(
          item.id,
          (restoredQuantities.get(item.id) || 0) +
            quantity
        );
      }

      const missingProducts = [
        ...restoredQuantities.keys()
      ].filter(
        (id) =>
          !products.some((product) => product.id === id)
      );

      if (missingProducts.length > 0) {
        toast.error(
          "Some products were deleted. Restore them before rejecting this order."
        );
        return;
      }
    }

    const updatedOrder = {
      ...order,
      status: newStatus,
      stockDeducted: shouldRestoreStock
        ? false
        : order.stockDeducted,
      updatedAt: new Date().toISOString()
    };

    const updatedOrders = latestOrders.map((item) =>
      item.id === orderId ? updatedOrder : item
    );

    if (!saveOrders(updatedOrders)) return;

    if (shouldRestoreStock) {
      for (const [id, quantity] of restoredQuantities) {
        const product = products.find(
          (item) => item.id === id
        );

        updateProduct(id, {
          stock: Number(product.stock) + quantity
        });
      }
    }

    if (newStatus === "Accepted") {
      toast.success("Order accepted successfully!");
    }

    if (newStatus === "Rejected") {
      toast.success(
        shouldRestoreStock
          ? "Order rejected and stock restored!"
          : "Order rejected successfully!"
      );
    }

    if (newStatus === "On the Way") {
      toast.success("Order is now on the way!");
    }
  };

  const countByStatus = (status) =>
    orders.filter(
      (order) =>
        (order.status || "Pending") === status
    ).length;

  const summaryCards = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingBagIcon />,
      color: "#10b981"
    },
    {
      title: "Pending",
      value: countByStatus("Pending"),
      icon: <PendingActionsIcon />,
      color: "#f59e0b"
    },
    {
      title: "Accepted",
      value: countByStatus("Accepted"),
      icon: <CheckCircleIcon />,
      color: "#10b981"
    },
    {
      title: "On the Way",
      value: countByStatus("On the Way"),
      icon: <LocalShippingIcon />,
      color: "#3b82f6"
    },
    {
      title: "Delivered",
      value: countByStatus("Delivered"),
      icon: <InventoryIcon />,
      color: "#60a5fa"
    },
    {
      title: "Rejected",
      value: countByStatus("Rejected"),
      icon: <CancelIcon />,
      color: "#ef4444"
    }
  ];

  const filteredOrders = orders
    .filter(
      (order) =>
        statusFilter === "All" ||
        (order.status || "Pending") === statusFilter
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );

  const selectedOrder = orders.find(
    (order) => order.id === selectedOrderId
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        bgcolor: "background.default",
        color: "text.primary",
        p: { xs: 2, md: 4 }
      }}
    >
      <Typography
        sx={{
          color: "#10b981",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 1,
          mb: 1
        }}
      >
        ADMIN PANEL
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          fontSize: { xs: 26, md: 34 }
        }}
      >
        Manage Orders
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 14,
          mb: 4
        }}
      >
        Review orders, approve purchases and monitor customer delivery confirmations.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(6, minmax(0, 1fr))"
          },
          gap: 2,
          mb: 4
        }}
      >
        {summaryCards.map((card) => (
          <Paper
            key={card.title}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <Box sx={{ color: card.color, mb: 1 }}>
              {card.icon}
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                color: "text.secondary",
                mb: 1
              }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: card.color
              }}
            >
              {card.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <FormControl
          size="small"
          sx={{ minWidth: 190 }}
        >
          <InputLabel>Filter by Status</InputLabel>

          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <MenuItem value="All">All Orders</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="On the Way">On the Way</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={refreshOrders}
          sx={{
            color: "#10b981",
            borderColor: "#10b981",
            textTransform: "none",
            fontWeight: 700
          }}
        >
          Refresh Orders
        </Button>
      </Paper>

      {filteredOrders.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <ShoppingBagIcon
            sx={{
              fontSize: 60,
              color: "#10b981",
              mb: 2
            }}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: 800 }}
          >
            No Orders Found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Customer orders will appear here.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filteredOrders.map((order) => {
            const status = order.status || "Pending";

            return (
              <Paper
                key={order.id}
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
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 2
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: 17,
                        mb: 0.5
                      }}
                    >
                      {order.customer?.fullName ||
                        "Unknown Customer"}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 12
                      }}
                    >
                      {formatDate(order.createdAt)}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 12,
                        mt: 1,
                        overflowWrap: "anywhere"
                      }}
                    >
                      Order ID: {order.id}
                    </Typography>
                  </Box>

                  <Chip
                    label={status}
                    sx={{
                      bgcolor: `${
                        statusColors[status] || "#f59e0b"
                      }22`,
                      color:
                        statusColors[status] ||
                        "#f59e0b",
                      fontWeight: 800
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {status === "On the Way" && (
                  <Alert
                    severity="info"
                    sx={{ mb: 2 }}
                  >
                    Waiting for the customer to confirm delivery.
                  </Alert>
                )}

                {status === "Delivered" && (
                  <Alert
                    severity="success"
                    icon={<CheckCircleIcon />}
                    sx={{ mb: 2 }}
                  >
                    <Typography fontWeight={800}>
                      Delivery Confirmed
                    </Typography>

                    <Typography sx={{ fontSize: 13 }}>
                      Confirmed by:{" "}
                      {order.deliveryConfirmedBy ||
                        "Not specified"}
                    </Typography>

                    <Typography sx={{ fontSize: 13 }}>
                      Delivered at:{" "}
                      {formatDate(order.deliveredAt)}
                    </Typography>
                  </Alert>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 2
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 12
                      }}
                    >
                      Items
                    </Typography>

                    <Typography fontWeight={700}>
                      {order.totalItems || 0}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 12
                      }}
                    >
                      Total
                    </Typography>

                    <Typography
                      sx={{
                        color: "#10b981",
                        fontWeight: 800,
                        fontSize: 20
                      }}
                    >
                      {Number(
                        order.totalPrice || 0
                      ).toFixed(2)} JOD
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() =>
                      setSelectedOrderId(order.id)
                    }
                    sx={{
                      textTransform: "none",
                      fontWeight: 700
                    }}
                  >
                    View Details
                  </Button>

                  {status === "Pending" && (
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "Accepted"
                        )
                      }
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
                      Accept
                    </Button>
                  )}

                  {(status === "Pending" ||
                    status === "Accepted") && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "Rejected"
                        )
                      }
                      sx={{
                        textTransform: "none",
                        fontWeight: 700
                      }}
                    >
                      Reject
                    </Button>
                  )}

                  {status === "Accepted" && (
                    <Button
                      variant="contained"
                      startIcon={<LocalShippingIcon />}
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "On the Way"
                        )
                      }
                      sx={{
                        bgcolor: "#2563eb",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: "#1d4ed8"
                        }
                      }}
                    >
                      On the Way
                    </Button>
                  )}
                </Box>
              </Paper>
            );
          })}
        </Stack>
      )}

      <Dialog
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrderId(null)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              color: "text.primary",
              borderRadius: 3
            }
          }
        }}
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>
              Order Details
            </DialogTitle>

            <DialogContent dividers>
              <Stack spacing={2}>
                <Alert
                  severity={
                    selectedOrder.status === "Delivered"
                      ? "success"
                      : "info"
                  }
                >
                  Order Status:{" "}
                  {selectedOrder.status || "Pending"}
                </Alert>

                {selectedOrder.status === "On the Way" && (
                  <Alert severity="warning">
                    Waiting for customer delivery confirmation.
                  </Alert>
                )}

                {selectedOrder.status === "Delivered" && (
                  <Alert severity="success">
                    <Typography fontWeight={800}>
                      Delivery Confirmation
                    </Typography>

                    <Typography>
                      Confirmed by:{" "}
                      {selectedOrder.deliveryConfirmedBy ||
                        "Not specified"}
                    </Typography>

                    <Typography>
                      Confirmed at:{" "}
                      {formatDate(selectedOrder.deliveredAt)}
                    </Typography>
                  </Alert>
                )}

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 16
                  }}
                >
                  Customer Information
                </Typography>

                <Typography>
                  Name:{" "}
                  {selectedOrder.customer?.fullName || "N/A"}
                </Typography>

                <Typography>
                  Email: {selectedOrder.userEmail || "N/A"}
                </Typography>

                <Typography>
                  Phone:{" "}
                  {selectedOrder.customer?.phone || "N/A"}
                </Typography>

                <Typography>
                  City:{" "}
                  {selectedOrder.customer?.city || "N/A"}
                </Typography>

                <Typography>
                  Address:{" "}
                  {selectedOrder.customer?.address || "N/A"}
                </Typography>

                {selectedOrder.customer?.notes && (
                  <Typography>
                    Notes: {selectedOrder.customer.notes}
                  </Typography>
                )}

                <Divider />

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 16
                  }}
                >
                  Ordered Products
                </Typography>

                {(selectedOrder.items || []).map(
                  (item, index) => (
                    <Box
                      key={`${item.id}-${index}`}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2
                      }}
                    >
                      <Box>
                        <Typography fontWeight={700}>
                          {item.name}
                        </Typography>

                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: 12
                          }}
                        >
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>

                      <Typography fontWeight={700}>
                        {Number(
                          item.subtotal || 0
                        ).toFixed(2)} JOD
                      </Typography>
                    </Box>
                  )
                )}

                <Divider />

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#10b981",
                    fontSize: 21
                  }}
                >
                  Total:{" "}
                  {Number(
                    selectedOrder.totalPrice || 0
                  ).toFixed(2)} JOD
                </Typography>

                <Typography color="text.secondary">
                  Payment:{" "}
                  {selectedOrder.paymentMethod ||
                    "Cash on Delivery"}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12
                  }}
                >
                  Last Updated:{" "}
                  {formatDate(
                    selectedOrder.updatedAt ||
                    selectedOrder.createdAt
                  )}
                </Typography>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setSelectedOrderId(null)}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                  fontWeight: 700
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
