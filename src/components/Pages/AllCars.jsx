
import { useContext } from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent
} from "@mui/material";

import {
  BatteryChargingFull,
  Bolt,
  ArrowBack
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { CarsContext } from "../Context/CarsContext";

export default function AllCars() {
  const navigate = useNavigate();
  const { cars } = useContext(CarsContext);

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.default"
            : "#eff7fd",
        color: "text.primary",
        minHeight: "80vh",
        py: 5,
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            mb: 3,
            color: "text.primary",
            fontWeight: 700
          }}
        >
          Back to Home
        </Button>

        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 700,
            fontSize: 14,
            mb: 1
          }}
        >
          EXPLORE OUR COLLECTION
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 4
          }}
        >
          All Electric Cars
        </Typography>

        {cars.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No electric cars available.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(0, 1fr))",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(5, minmax(0, 1fr))"
              },
              gap: 3,
              alignItems: "stretch"
            }}
          >
            {cars.map((car) => (
              <Card
                key={car.id}
                sx={{
                  height: 340,
                  minWidth: 0,
                  borderRadius: 3,
                  boxShadow: "none",
                  bgcolor: "background.paper",
                  color: "text.primary",
                  p: 1.5,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 24px rgba(0,0,0,0.35)"
                        : "0 8px 24px rgba(0,0,0,0.08)"
                  }
                }}
              >
                <Box
                  component="img"
                  src={car.image}
                  alt={car.name}
                  sx={{
                    width: "100%",
                    height: 145,
                    objectFit: "contain",
                    display: "block",
                    flexShrink: 0
                  }}
                />

                <CardContent
                  sx={{
                    px: 1,
                    pb: 1,
                    pt: 2,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    "&:last-child": {
                      pb: 1
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      fontSize: 15,
                      mb: 1.5,
                      minHeight: 44,
                      overflowWrap: "anywhere"
                    }}
                  >
                    {car.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.7
                    }}
                  >
                    <BatteryChargingFull
                      sx={{
                        color: "#10b981",
                        fontSize: 19,
                        flexShrink: 0
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.secondary"
                            : "#164b91"
                      }}
                    >
                      Range: {car.range}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2
                    }}
                  >
                    <Bolt
                      sx={{
                        color: "#10b981",
                        fontSize: 19,
                        flexShrink: 0
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.secondary"
                            : "#164b91",
                        overflowWrap: "anywhere"
                      }}
                    >
                      Charging Time: {car.charging}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() =>
                        navigate(
                          `/car-details/${encodeURIComponent(car.brand)}`
                        )
                      }
                      sx={{
                        borderColor: "#10c997",
                        color: "#10b981",
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: 12,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(16,185,129,0.12)"
                              : "#e8fff7",
                          borderColor: "#10b981"
                        }
                      }}
                    >
                      View Details →
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
