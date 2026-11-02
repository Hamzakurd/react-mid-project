
import { Box, Typography, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(110deg, #119b78 0%, #16b98b 50%, #20c997 100%)",
        color: "#092b40",
        textAlign: "center",
        py: 3,
        px: 2
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          mb: 1
        }}
      >
        EV Wise
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#16465c"
        }}
      >
        Your Smart Guide to Electric Vehicles.
      </Typography>

      <Divider
        sx={{
          borderColor: "rgba(9,43,64,0.2)",
          mb: 2
        }}
      />

      <Typography
        variant="body2"
        sx={{
          fontWeight: 500
        }}
      >
        © 2026 EV Wise. All rights reserved.
      </Typography>
    </Box>
  );
}
