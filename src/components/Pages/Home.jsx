import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent
} from "@mui/material";

import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

import {
  AttachMoney,
  Bolt,
  BatteryChargingFull
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

// FEATURES DATA
const features = [
  {
    icon: <EnergySavingsLeafIcon />,
    title: "Eco Friendly",
    description: "Reduce emissions and help create a cleaner planet."
  },
  {
    icon: <AttachMoney />,
    title: "Lower Running Costs",
    description: "Save money with lower charging and maintenance costs."
  },
  {
    icon: <Bolt />,
    title: "Advanced Technology",
    description: "Experience innovation, safety and smart features."
  }
];

// CARS DATA
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
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "clip",
        boxSizing: "border-box"
      }}
    >

      {/* HERO SECTION */}

      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",

          minHeight: { xs: 420, md: 410 },

          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(3,28,55,0.85),
              rgba(3,28,55,0.05)
            ),
            url("/id4.jpg")
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          display: "flex",
          alignItems: "center",

          px: { xs: 3, md: 9 }
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 480,
            minWidth: 0,
            color: "white"
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 36, md: 54 },
              fontWeight: 800,
              lineHeight: 1.15,
              mb: 2
            }}
          >
            Drive a Cleaner

            <Box
              component="span"
              sx={{
                color: "#20dcb0",
                display: "block"
              }}
            >
              Tomorrow
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.5,
              mb: 2.5
            }}
          >
            Explore electric vehicles, compare models,
            find charging stations, and make informed
            decisions for a sustainable future.
          </Typography>
        </Box>
      </Box>

      {/* FEATURES SECTION */}

      <Box
        id="features"
        sx={{
          backgroundColor: "#ffffff",
          py: 3,
          scrollMarginTop: 2
        }}
      >
        <Container maxWidth="xl">

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))"
              },

              gap: 3,
              alignItems: "stretch",
              minWidth: 0
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={feature.title}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  minWidth: 0
                }}
              >

                {/* FEATURE ICON */}

                <Box
                  sx={{
                    minWidth: 68,
                    width: 68,
                    height: 68,
                    flexShrink: 0,
                    borderRadius: 3,

                    backgroundColor:
                      index === 1
                        ? "#e1f3ff"
                        : index === 2
                        ? "#eeeaff"
                        : "#dcf9ee",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color:
                      index === 1
                        ? "#168cf0"
                        : index === 2
                        ? "#7655ff"
                        : "#10b981",

                    "& .MuiSvgIcon-root": {
                      fontSize: 38
                    }
                  }}
                >
                  {feature.icon}
                </Box>

                {/* FEATURE TEXT */}

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#092b40",
                      mb: 0.5
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#164b91",
                      lineHeight: 1.5,
                      overflowWrap: "break-word"
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>

              </Box>
            ))}
          </Box>

        </Container>
      </Box>

      {/* POPULAR ELECTRIC CARS */}

      <Box
        id="cars"
        sx={{
          backgroundColor: "#eff7fd",
          py: 3,
          scrollMarginTop: 2
        }}
      >
        <Container maxWidth="xl">

          {/* SECTION LABEL */}

          <Typography
            sx={{
              color: "#10b981",
              fontWeight: 700,
              fontSize: 14,
              mb: 1
            }}
          >
            FEATURED EVs
          </Typography>

          {/* SECTION HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
              minWidth: 0
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#092b40",
                fontSize: { xs: 24, sm: 29 }
              }}
            >
              Popular Electric Cars
            </Typography>

            <Button
              onClick={() => navigate("/AllCars")}
              sx={{
                color: "#168cf0",
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              View All EVs ›
            </Button>
          </Box>

          {/* CARS GRID */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(5, minmax(0, 1fr))"
              },

              gap: 2.5,
              alignItems: "stretch",
              minWidth: 0
            }}
          >
            {cars.map((car) => (
              <Card
                key={car.brand}
                sx={{
                  height: "100%",
                  minWidth: 0,
                  minHeight: 310,

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
                    maxWidth: "100%",
                    height: 115,
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
                    minWidth: 0,

                    display: "flex",
                    flexDirection: "column",

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
                      mb: 1.5,
                      minHeight: 44,
                      fontSize: 15,
                      overflowWrap: "break-word"
                    }}
                  >
                    {car.name}
                  </Typography>

                  {/* DRIVING RANGE */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.7,
                      minWidth: 0
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
                        color: "#164b91",
                        overflowWrap: "break-word"
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
                      mb: 2,
                      minWidth: 0
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

                  {/* VIEW DETAILS BUTTON */}

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() =>
                        navigate(`/car-details/${car.brand}`)
                      }
                      sx={{
                        borderColor: "#10c997",
                        color: "#10b981",
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: 12,

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

    </Box>
  );
}