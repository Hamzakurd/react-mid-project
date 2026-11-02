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

// ========================================
// CARS DATA
// ========================================

const cars = [
  {
    name: "Tesla Model 3",
    brand: "tesla",
    image: "/tesla.jpg",
    range: "520 km",
    charging: "15 min (10–80%)",
    battery: "60–82 kWh (depending on version)",
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
  {
    name: "Hyundai IONIQ 5",
    brand: "hyundai",
    image: "/ioniq5.jpg",
    range: "620 km",
    charging: "18 min (10–80%)",
    battery: "58–84 kWh (depending on version)",
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
  {
    name: "BMW i4",
    brand: "bmw",
    image: "/bmw.jpg",
    range: "590 km",
    charging: "31 min (10–80%)",
    battery: "70.2–83.9 kWh (depending on version)",
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
  {
    name: "Nissan Leaf",
    brand: "nissan",
    image: "/nissan.jpg",
    range: "300 km",
    charging: "60 min (10–80%)",
    battery: "40–62 kWh (depending on version)",
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
  {
    name: "Kia EV6",
    brand: "kia",
    image: "/EV6.jpg",
    range: "620 km",
    charging: "24 min (10–80%)",
    battery: "58–84 kWh (depending on version)",
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
  {
    name: "Hyundai IONIQ 6",
    brand: "ioniq 6",
    image: "/ioniq6.png",
    range: "614 km",
    charging: "24 min (10–80%)",
    battery: "Varies by version",
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
  {
    name: "Tesla Model S",
    brand: "tesla-s",
    image: "/TESLA-MODEL-S.webp",
    range: "550 km",
    charging: "30 min (10–80%)",
    battery: "Varies by version",
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
  {
    name: "Tesla Model Y",
    brand: "tesla-y",
    image: "/getImage.webp",
    range: "530 km",
    charging: "25 min (10–80%)",
    battery: "Varies by version",
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
  {
    name: "Honda eNS1",
    brand: "Honda_eNS1",
    image: "/White Honda-Style Crossover with FUDENG Plate.png",
    range: "510 km",
    charging: "45 min (10–80%)",
    battery: "Varies by version",
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
  {
    name: "AVATR 12",
    brand: "AVATR 12",
    image: "/AVATR12_1300x730.png",
    range: "580 km",
    charging: "31 min (10–80%)",
    battery: "Varies by version",
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
];

// ========================================
// CAR DETAILS COMPONENT
// ========================================

export default function CarDetails() {
  const { brand } = useParams();
  const navigate = useNavigate();

  const brandAliases = {
    "ioniq-6": "ioniq 6",
    "honda-ens1": "Honda_eNS1",
    "avatr-12": "AVATR 12"
  };

  const selectedBrand = brandAliases[brand] || brand;

  const car = cars.find(
    (item) => item.brand === selectedBrand
  );

  // CAR NOT FOUND

  if (!car) {
    return (
      <Box
        sx={{
          backgroundColor: "#eff7fd",
          minHeight: "80vh",
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              color: "#092b40",
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
              backgroundColor: "#10b981"
            }}
          >
            Back to Cars
          </Button>
        </Container>
      </Box>
    );
  }

  // ========================================
  // CAR SPECIFICATIONS
  // ========================================

  const specifications = [
    {
      title: "Driving Range",
      value: car.range,
      icon: <BatteryChargingFull />,
      color: "#10b981",
      background: "#effaf5"
    },
    {
      title: "Charging Time",
      value: car.charging,
      icon: <Bolt />,
      color: "#168cf0",
      background: "#eff7ff"
    },
    {
      title: "Battery",
      value: car.battery,
      icon: <ElectricCar />,
      color: "#7655ff",
      background: "#f4f0ff"
    },
    {
      title: "Performance",
      value: car.performance,
      icon: <Speed />,
      color: "#f59e0b",
      background: "#fff7ed"
    }
  ];

  // ========================================
  // PAGE DESIGN
  // ========================================

  return (
    <Box
      sx={{
        backgroundColor: "#eff7fd",
        minHeight: "100vh",
        py: 5
      }}
    >
      <Container maxWidth="lg">

        {/* BACK BUTTON */}

        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/AllCars")}
          sx={{
            mb: 3,
            color: "#164b91",
            fontWeight: 700
          }}
        >
          Back to Cars
        </Button>

        {/* MAIN DETAILS CARD */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white"
          }}
        >

          {/* IMAGE AND INFORMATION */}

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

            {/* CAR IMAGE */}

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

            {/* CAR INFORMATION */}

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
                  color: "#092b40",
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: 30, md: 44 }
                }}
              >
                {car.name}
              </Typography>

              <Typography
                sx={{
                  color: "#164b91",
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                {car.description}
              </Typography>

              {/* SPECIFICATIONS GRID */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))"
                  },
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
                      backgroundColor: spec.background,
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
                        color: "#092b40",
                        fontSize: { xs: 12, sm: 14 },
                        mb: 0.5
                      }}
                    >
                      {spec.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#164b91",
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

          {/* ========================================
              MAIN FEATURES
          ======================================== */}

          <Box sx={{ mt: 5 }}>

            <Typography
              variant="h5"
              sx={{
                color: "#092b40",
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

              {car.features.map((feature, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid #e2edf5",
                    borderRadius: 3,
                    color: "#164b91",
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
                      color: "#164b91",
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

        </Paper>

      </Container>
    </Box>
  );
}