import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Rating,
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useMessages } from "../Hooks/useMessages";
import { useAuth } from "../Hooks/UseAuth";

export default function Contact() {
  const { createMessage, approvedMessages } = useMessages();
  const { currentUser } = useAuth();

  const [newMessage, setNewMessage] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewMessage((prev) => ({
      ...prev,
      name: currentUser?.name || "",
      email: currentUser?.email || ""
    }));
  }, [currentUser?.id, currentUser?.email, currentUser?.name]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewMessage((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (
      !newMessage.name.trim() ||
      !newMessage.message.trim() ||
      newMessage.rating < 1
    ) {
      return;
    }

    setLoading(true);

    try {
      const success = await createMessage(newMessage);

      if (success) {
        setNewMessage((prev) => ({
          ...prev,
          message: "",
          rating: 0
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const reviews = Array.isArray(approvedMessages)
    ? [...approvedMessages].reverse()
    : [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) =>
            total + (Number(review.userRating) || 0),
          0
        ) / reviews.length
      : 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 4, md: 7 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip
            icon={
              <ElectricBoltIcon
                sx={{ color: "#10b981 !important" }}
              />
            }
            label="EV WISE COMMUNITY"
            sx={{
              bgcolor: "rgba(16,185,129,0.1)",
              color: "#10b981",
              fontWeight: 800,
              letterSpacing: 1,
              mb: 2
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 30, md: 46 },
              mb: 2
            }}
          >
            Feedback & Reviews
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 650,
              mx: "auto",
              lineHeight: 1.8
            }}
          >
            Share your experience with EV Wise.
            Your feedback helps us improve our
            electric vehicle platform and services.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 7fr) minmax(0, 5fr)" }, gap: 4, alignItems: "stretch", width: "100%" }}>
          <Box sx={{ minWidth: 0 }}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider"
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mb: 2, alignItems: "center" }}
              >
                <RateReviewIcon
                  sx={{
                    fontSize: 30,
                    color: "#10b981"
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                >
                  Share Your Feedback
                </Typography>
              </Stack>

              <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Tell us what you think about EV Wise.
                Your review will be published after
                admin approval.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSendMessage}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={newMessage.name}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email"
                    value={newMessage.email}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <TextField
                    fullWidth
                    required
                    label="Your Feedback"
                    name="message"
                    placeholder="Share your thoughts about EV Wise..."
                    value={newMessage.message}
                    onChange={handleChange}
                    multiline
                    minRows={5}
                    disabled={loading}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        mb: 1.5
                      }}
                    >
                      Rate Your Experience
                    </Typography>

                    <Rating
                      name="ev-wise-rating"
                      value={newMessage.rating}
                      size="large"
                      disabled={loading}
                      onChange={(event, newValue) =>
                        setNewMessage((prev) => ({
                          ...prev,
                          rating: newValue ?? 0
                        }))
                      }
                      sx={{
                        color: "#f59e0b",
                        fontSize: 35
                      }}
                    />

                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: 12,
                        mt: 1
                      }}
                    >
                      Select a rating from 1 to 5 stars.
                    </Typography>
                  </Box>

                  <Divider />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={<SendIcon />}
                    sx={{
                      py: 1.6,
                      borderRadius: 2,
                      bgcolor: "#10b981",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: 800,
                      fontSize: 16,
                      "&:hover": {
                        bgcolor: "#059669"
                      }
                    }}
                  >
                    {loading
                      ? "Submitting..."
                      : "Submit Feedback"}
                  </Button>

                  <Typography
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      fontSize: 12
                    }}
                  >
                    Your feedback will be reviewed
                    before appearing publicly.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Avatar
                sx={{
                  width: 85,
                  height: 85,
                  bgcolor: "rgba(16,185,129,0.12)",
                  color: "#10b981",
                  mb: 3
                }}
              >
                <StarIcon sx={{ fontSize: 45 }} />
              </Avatar>

              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 2 }}
              >
                Community Rating
              </Typography>

              <Typography
                sx={{
                  fontSize: 55,
                  fontWeight: 800,
                  color: "#10b981",
                  lineHeight: 1.2,
                  mb: 2
                }}
              >
                {averageRating.toFixed(1)}
              </Typography>

              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                size="large"
                sx={{
                  color: "#f59e0b",
                  mb: 2
                }}
              />

              <Typography color="text.secondary">
                Based on {reviews.length} approved reviews
              </Typography>

              <Divider flexItem sx={{ my: 4 }} />

              <Stack spacing={2} sx={{ width: "100%" }}>
                {[
                  "Reviews are moderated by admins",
                  "Share your EV Wise experience",
                  "Help improve our platform"
                ].map((text) => (
                  <Box
                    key={text}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: "#10b981" }}
                    />

                    <Typography
                      sx={{
                        textAlign: "left",
                        fontWeight: 600
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1
              }}
            >
              Customer Reviews
            </Typography>

            <Typography color="text.secondary">
              Discover what our community says about EV Wise.
            </Typography>
          </Box>

          {reviews.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center"
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
                sx={{
                  fontWeight: 800,
                  mb: 1
                }}
              >
                No Reviews Yet
              </Typography>

              <Typography color="text.secondary">
                Approved customer reviews will appear here.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }, gap: 3, width: "100%" }}>
              {reviews.map((msg) => (
                <Box key={msg.id} sx={{ minWidth: 0 }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      bgcolor: "background.paper",
                      color: "text.primary",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      transition: "transform 0.25s",
                      "&:hover": {
                        transform: "translateY(-4px)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "rgba(16,185,129,0.12)",
                            color: "#10b981",
                            fontWeight: 800
                          }}
                        >
                          {msg.username?.charAt(0).toUpperCase() ||
                            <PersonIcon />}
                        </Avatar>

                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: 15
                            }}
                          >
                            {msg.username || "Anonymous"}
                          </Typography>

                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: 12
                            }}
                          >
                            EV Wise Community
                          </Typography>
                        </Box>
                      </Box>

                      <Rating
                        value={Number(msg.userRating) || 0}
                        readOnly
                        size="small"
                        sx={{
                          color: "#f59e0b",
                          mb: 2
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: 1.8,
                          overflowWrap: "anywhere",
                          whiteSpace: "pre-wrap"
                        }}
                      >
                        {msg.userMessage}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
