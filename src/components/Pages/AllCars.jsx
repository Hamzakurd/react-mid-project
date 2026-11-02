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

const cars = [
  {
    name: "Tesla Model 3",
    image: "/tesla.jpg",
    range: "520 km",
    charging: "15 min (10–80%)",
    brand: "tesla"
  },
  {
    name: "Hyundai IONIQ 5",
    image: "/ioniq5.jpg",
    range: "620 km",
    charging: "18 min (10–80%)",
    brand: "hyundai"
  },
  {
    name: "BMW i4",
    image: "/bmw.jpg",
    range: "590 km",
    charging: "31 min (10–80%)",
    brand: "bmw"
  },
  {
    name: "Nissan Leaf",
    image: "/nissan.jpg",
    range: "300 km",
    charging: "60 min (10–80%)",
    brand: "nissan"
  },
  {
    name: "Kia EV6",
    image: "/EV6.jpg",
    range: "620 km",
    charging: "24 min (10–80%)",
    brand: "kia"
  },
  {
    name: "Hyundai IONIQ 6",
    image: "/ioniq6.png",
    range: "614 km",
    charging: "24 min (10–80%)",
    brand: "ioniq 6"
  },
  {
    name: "Tesla Model S",
    image: "/TESLA-MODEL-S.webp",
    range: "550 km",
    charging: "30 min (10–80%)",
    brand: "tesla-s"
  },
  {
    name: "Tesla Model Y",
    image: "/getImage.webp",
    range: "530 km",
    charging: "25 min (10–80%)",
    brand: "tesla-y"
  },
  {
    name: "Honda_eNS1",
    image: "/White Honda-Style Crossover with FUDENG Plate.png",
    range: "510 km",
    charging: "45 min (10–80%)",
    brand: "Honda_eNS1"
  },
  {
    name: "AVATR 12",
    image: "/AVATR12_1300x730.png",
    range: "580 km",
    charging: "31 min (10–80%)",
    brand: "AVATR 12"
  }
];

export default function AllCars() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#eff7fd",
        minHeight: "80vh",
        py: 5
      }}
    >
      <Container maxWidth="xl">

        {/* BACK TO HOME */}

        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            mb: 3,
            color: "#092b40",
            fontWeight: 700
          }}
        >
          Back to Home
        </Button>

        {/* SECTION TITLE */}

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
            color: "#092b40",
            mb: 4
          }}
        >
          All Electric Cars
        </Typography>

        {/* CARS GRID */}

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
              key={car.brand}
              sx={{
                height: 340,
                minWidth: 0,
                borderRadius: 3,
                boxShadow: "none",
                backgroundColor: "white",
                p: 1.5,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                }
              }}
            >

              {/* CAR IMAGE */}

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

              {/* CAR INFORMATION */}

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

                {/* CAR NAME */}

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#092b40",
                    fontSize: 15,
                    mb: 1.5,
                    minHeight: 44,
                    overflowWrap: "anywhere"
                  }}
                >
                  {car.name}
                </Typography>

                {/* RANGE */}

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
                      color: "#164b91"
                    }}
                  >
                    Range: {car.range}
                  </Typography>
                </Box>

                {/* CHARGING TIME */}

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
                      color: "#164b91",
                      overflowWrap: "anywhere"
                    }}
                  >
                    Charging Time: {car.charging}
                  </Typography>
                </Box>

                {/* VIEW DETAILS */}

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
                        backgroundColor: "#e8fff7",
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

      </Container>
    </Box>
  );
}