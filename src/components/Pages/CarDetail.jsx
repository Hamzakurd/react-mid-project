
import { useContext } from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Paper
} from "@mui/material";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  BatteryChargingFull,
  Bolt,
  ElectricCar,
  Speed,
  ArrowBack
} from "@mui/icons-material";

import { CarsContext } from "../Context/CarsContext";

const carDetailsData = {
  tesla: {
    performance: "Electric dual or single motor options",
    description:
      "Tesla Model 3 is a modern electric sedan with advanced technology, impressive performance and a comfortable interior.",
    features: [
      "Autopilot",
      "Large touchscreen",
      "Minimalist interior",
      "Advanced safety systems"
    ]
  },
  hyundai: {
    performance: "Single or dual motor options",
    description:
      "Hyundai IONIQ 5 is a modern electric SUV with a spacious interior, futuristic design and ultra-fast charging.",
    features: [
      "Ultra-fast charging",
      "Spacious interior",
      "Vehicle-to-Load",
      "Digital displays"
    ]
  },
  bmw: {
    performance: "Electric performance sedan",
    description:
      "BMW i4 combines luxury, sporty driving and advanced electric technology in a premium sedan.",
    features: [
      "Luxury interior",
      "Sporty performance",
      "Curved display",
      "Driver assistance"
    ]
  },
  nissan: {
    performance: "Front-wheel drive electric motor",
    description:
      "Nissan Leaf is a practical electric car designed for comfortable daily driving and energy efficiency.",
    features: [
      "e-Pedal",
      "ProPILOT Assist (selected versions)",
      "Compact design",
      "Easy city driving"
    ]
  },
  kia: {
    performance: "Rear-wheel or all-wheel drive options",
    description:
      "Kia EV6 is a stylish electric crossover offering fast charging, modern technology and impressive performance.",
    features: [
      "Ultra-fast charging",
      "Vehicle-to-Load",
      "Modern interior",
      "Advanced driver assistance"
    ]
  },
  "ioniq 6": {
    performance: "Aerodynamic electric sedan",
    description:
      "Hyundai IONIQ 6 combines aerodynamic design, advanced technology and efficient electric driving in a modern sedan.",
    features: [
      "Aerodynamic design",
      "Fast charging",
      "Smart technology",
      "Driver assistance"
    ]
  },
  "tesla-s": {
    performance: "High-performance electric sedan",
    description:
      "Tesla Model S combines luxury, impressive acceleration and advanced electric technology in a premium sedan.",
    features: [
      "Luxury interior",
      "Autopilot technology",
      "Premium display",
      "Fast acceleration"
    ]
  },
  "tesla-y": {
    performance: "Electric SUV",
    description:
      "Tesla Model Y offers modern electric performance, advanced technology and a spacious interior for everyday driving.",
    features: [
      "Spacious interior",
      "Autopilot technology",
      "Fast charging",
      "Smart connectivity"
    ]
  },
  Honda_eNS1: {
    performance: "Electric compact SUV",
    description:
      "Honda eNS1 combines modern SUV styling, smooth electric driving and advanced technology for a comfortable journey.",
    features: [
      "Modern SUV design",
      "Comfortable interior",
      "Smart technology",
      "Safety features"
    ]
  },
  "AVATR 12": {
    performance: "Luxury electric sedan",
    description:
      "AVATR 12 combines futuristic design, premium comfort and advanced electric technology in a luxury sedan.",
    features: [
      "Futuristic design",
      "Luxury interior",
      "Advanced technology",
      "Driver assistance"
    ]
  }
};

export default function CarDetails() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const { cars } = useContext(CarsContext);

  const brandAliases = {
    "ioniq-6": "ioniq 6",
    "honda-ens1": "Honda_eNS1",
    "avatr-12": "AVATR 12"
  };

  const selectedBrand = brandAliases[brand] || brand;

  const car = cars.find(
    (item) => item.brand === selectedBrand
  );

  if (!car) {
    return (
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "background.default"
              : "#eff7fd",
          minHeight: "80vh",
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              mb: 3
            }}
          >
            Car Not Found
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/AllCars")}
            sx={{
              bgcolor: "#10b981",
              color: "#ffffff",
              "&:hover": {
                bgcolor: "#059669"
              }
            }}
          >
            Back to Cars
          </Button>
        </Container>
      </Box>
    );
  }

  const extraDetails = carDetailsData[car.brand] || {};

  const description =
    car.description ||
    extraDetails.description ||
    `Explore the ${car.name}, its electric driving range, battery capacity and charging capabilities.`;

  const performance =
    car.performance ||
    extraDetails.performance ||
    "Electric vehicle";

  const features = Array.isArray(car.features)
    ? car.features
    : extraDetails.features || [];

  const specifications = [
    {
      title: "Driving Range",
      value: car.range || "Not available",
      icon: <BatteryChargingFull />,
      color: "#10b981",
      background: "#effaf5"
    },
    {
      title: "Charging Time",
      value: car.charging || "Not available",
      icon: <Bolt />,
      color: "#168cf0",
      background: "#eff7ff"
    },
    {
      title: "Battery",
      value: car.battery || "Not available",
      icon: <ElectricCar />,
      color: "#7655ff",
      background: "#f4f0ff"
    },
    {
      title: "Performance",
      value: performance,
      icon: <Speed />,
      color: "#f59e0b",
      background: "#fff7ed"
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.default"
            : "#eff7fd",
        minHeight: "100vh",
        py: 5
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/AllCars")}
          sx={{
            mb: 3,
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "text.secondary"
                : "#164b91",
            fontWeight: 700
          }}
        >
          Back to Cars
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            bgcolor: "background.paper"
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))"
              },
              gap: 4,
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                width: "100%",
                minWidth: 0
              }}
            >
              <Box
                component="img"
                src={car.image}
                alt={car.name}
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 350 },
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 700,
                  mb: 1
                }}
              >
                ELECTRIC VEHICLE DETAILS
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: 30, md: 44 }
                }}
              >
                {car.name}
              </Typography>

              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "#164b91",
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                {description}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 2,
                  alignItems: "stretch"
                }}
              >
                {specifications.map((spec) => (
                  <Paper
                    key={spec.title}
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#292d33"
                          : spec.background,
                      borderRadius: 3,
                      minWidth: 0,
                      minHeight: 115,
                      height: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    <Box
                      sx={{
                        color: spec.color,
                        mb: 1,
                        display: "flex"
                      }}
                    >
                      {spec.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: { xs: 12, sm: 14 },
                        mb: 0.5
                      }}
                    >
                      {spec.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.secondary"
                            : "#164b91",
                        fontSize: 13,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {spec.value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>

          {features.length > 0 && (
            <Box sx={{ mt: 5 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  mb: 2
                }}
              >
                Main Features
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(4, minmax(0, 1fr))"
                  },
                  gap: 2,
                  alignItems: "stretch"
                }}
              >
                {features.map((feature, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      borderRadius: 3,
                      color: "text.secondary",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 0,
                      minHeight: 65,
                      boxSizing: "border-box"
                    }}
                  >
                    <Bolt
                      sx={{
                        color: "#10b981",
                        flexShrink: 0
                      }}
                    />

                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "text.secondary"
                            : "#164b91",
                        fontWeight: 600,
                        fontSize: 14,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {feature}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
