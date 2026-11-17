
import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { useMessages } from "../Hooks/useMessages";

const statusColors = {
  pending: "#f59e0b",
  approved: "#10b981",
  rejected: "#ef4444"
};

export default function ManageMessages() {
  const { messages, updatedStatus } = useMessages();

  const [statusFilter, setStatusFilter] = useState("all");

  const safeMessages = Array.isArray(messages)
    ? messages
    : [];

  const countByStatus = (status) =>
    safeMessages.filter(
      (msg) =>
        (msg.status || "pending").toLowerCase() === status
    ).length;

  const summaryCards = [
    {
      title: "Total Feedback",
      value: safeMessages.length,
      icon: <RateReviewIcon />,
      color: "#10b981"
    },
    {
      title: "Pending",
      value: countByStatus("pending"),
      icon: <PendingActionsIcon />,
      color: "#f59e0b"
    },
    {
      title: "Approved",
      value: countByStatus("approved"),
      icon: <CheckCircleIcon />,
      color: "#10b981"
    },
    {
      title: "Rejected",
      value: countByStatus("rejected"),
      icon: <CancelIcon />,
      color: "#ef4444"
    }
  ];

  const filteredMessages = safeMessages.filter((msg) => {
    const status = (msg.status || "pending").toLowerCase();

    return statusFilter === "all" || status === statusFilter;
  });

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
        Manage Feedback
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 14,
          mb: 4
        }}
      >
        Review customer feedback and manage which reviews
        are visible on EV Wise.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))"
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
            <Box
              sx={{
                color: card.color,
                mb: 1
              }}
            >
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
          mb: 3
        }}
      >
        <FormControl
          size="small"
          sx={{ minWidth: 200 }}
        >
          <InputLabel>Filter by Status</InputLabel>

          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <MenuItem value="all">All Feedback</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {filteredMessages.length === 0 ? (
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
          <RateReviewIcon
            sx={{
              fontSize: 65,
              color: "#10b981",
              mb: 2
            }}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: 800, mb: 1 }}
          >
            No Feedback Found
          </Typography>

          <Typography color="text.secondary">
            Customer feedback will appear here.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))"
            },
            gap: 3
          }}
        >
          {filteredMessages.map((msg) => {
            const status = (
              msg.status || "pending"
            ).toLowerCase();

            return (
              <Card
                key={msg.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      mb: 3
                    }}
                  >
                    <RateReviewIcon
                      sx={{ color: "#10b981" }}
                    />

                    <Chip
                      label={
                        status.charAt(0).toUpperCase() +
                        status.slice(1)
                      }
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

                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <PersonIcon
                        sx={{
                          color: "#10b981",
                          fontSize: 19
                        }}
                      />

                      <Typography fontWeight={800}>
                        {msg.username || "Anonymous"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <EmailIcon
                        sx={{
                          color: "text.secondary",
                          fontSize: 18
                        }}
                      />

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 13,
                          overflowWrap: "anywhere"
                        }}
                      >
                        {msg.userEmail || "No Email"}
                      </Typography>
                    </Box>

                    <Rating
                      value={Number(msg.userRating) || 0}
                      readOnly
                      precision={0.5}
                      sx={{ color: "#f59e0b" }}
                    />

                    <Divider />

                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.8,
                        overflowWrap: "anywhere",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {msg.userMessage || "No message provided."}
                    </Typography>
                  </Stack>
                </CardContent>

                <Divider />

                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1
                  }}
                >
                  {status !== "approved" && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      onClick={() =>
                        updatedStatus(msg.id, "approved")
                      }
                      sx={{
                        bgcolor: "#10b981",
                        color: "#fff",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#059669"
                        }
                      }}
                    >
                      Approve
                    </Button>
                  )}

                  {status !== "rejected" && (
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() =>
                        updatedStatus(msg.id, "rejected")
                      }
                      sx={{
                        fontWeight: 700,
                        textTransform: "none"
                      }}
                    >
                      Reject
                    </Button>
                  )}

                  {status !== "pending" && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PendingActionsIcon />}
                      onClick={() =>
                        updatedStatus(msg.id, "pending")
                      }
                      sx={{
                        color: "#f59e0b",
                        borderColor: "#f59e0b",
                        fontWeight: 700,
                        textTransform: "none"
                      }}
                    >
                      Pending
                    </Button>
                  )}
                </Box>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
