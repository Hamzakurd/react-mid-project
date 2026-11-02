import {
  Box,
  Typography,
  Container,
  Paper,
  Button
} from "@mui/material";

import {
  ElectricCar,
  BatteryChargingFull,
  Bolt,
  DirectionsCar,
  ArrowForward,
  CheckCircle
} from "@mui/icons-material";

import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

import { useNavigate } from "react-router-dom";

// ========================================
// FEATURES
// ========================================

const features = [
  {
    title: "Electric Vehicles",
    description:
      "Explore a variety of modern electric cars, compare their specifications, and discover the latest EV technologies.",
    icon: <ElectricCar sx={{ fontSize: 38 }} />
  },
  {
    title: "Charging Solutions",
    description:
      "Learn about AC and DC charging systems, charging speeds, power levels, and different charging technologies.",
    icon: <BatteryChargingFull sx={{ fontSize: 38 }} />
  },
  {
    title: "Smart Information",
    description:
      "Find useful information about electric vehicle range, battery capacity, performance, and charging options.",
    icon: <Bolt sx={{ fontSize: 38 }} />
  }
];

// ========================================
// BENEFITS
// ========================================

const benefits = [
  "Discover electric vehicle technologies",
  "Compare different electric car models",
  "Understand AC and DC charging",
  "Explore modern and sustainable transportation"
];

// ========================================
// ABOUT PAGE
// ========================================

export default function About() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#eff7fd",
        minHeight: "100vh",
        py: { xs: 5, md: 8 }
      }}
    >
      <Container maxWidth="lg">

        {/* ABOUT INTRODUCTION */}

        <Box
          sx={{
            textAlign: "center",
            mb: 7
          }}
        >
          <Typography
            sx={{
              color: "#10b981",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: 2,
              mb: 2
            }}
          >
            ABOUT EV WISE
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#092b40",
              fontWeight: 800,
              fontSize: { xs: 32, md: 46 },
              mb: 3
            }}
          >
            Driving Towards a Greener Future
          </Typography>

          <Typography
            sx={{
              color: "#164b91",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.9,
              maxWidth: 800,
              mx: "auto"
            }}
          >
            EV Wise is an educational platform designed to help
            users explore electric vehicles and understand modern
            charging technologies. Our goal is to make electric
            mobility information simple, accessible, and easy
            to understand.
          </Typography>
        </Box>

        {/* ========================================
            OUR MISSION
        ======================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "white",
            mb: 7
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

            {/* MISSION ICON */}

            <Box
              sx={{
                backgroundColor: "#e8fff7",
                borderRadius: 4,
                height: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <EnergySavingsLeafIcon
                sx={{
                  fontSize: 130,
                  color: "#10b981"
                }}
              />
            </Box>

            {/* MISSION INFORMATION */}

            <Box>
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 800,
                  mb: 1
                }}
              >
                OUR MISSION
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: "#092b40",
                  fontWeight: 800,
                  mb: 3
                }}
              >
                Making Electric Mobility Easier
              </Typography>

              <Typography
                sx={{
                  color: "#164b91",
                  lineHeight: 1.9,
                  mb: 3
                }}
              >
                Our mission is to provide clear and useful
                information about electric vehicles, helping
                people understand EV specifications, charging
                solutions, and the benefits of electric mobility.
              </Typography>

              <Typography
                sx={{
                  color: "#164b91",
                  lineHeight: 1.9
                }}
              >
                Through EV Wise, users can explore different
                electric car models and learn about charging
                technologies in one convenient platform.
              </Typography>
            </Box>

          </Box>
        </Paper>

        {/* ========================================
            OUR FEATURES
        ======================================== */}

        <Box sx={{ mb: 7 }}>

          <Typography
            sx={{
              color: "#10b981",
              fontWeight: 800,
              textAlign: "center",
              mb: 1
            }}
          >
            WHAT WE OFFER
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#092b40",
              fontWeight: 800,
              textAlign: "center",
              mb: 4
            }}
          >
            Explore Our Features
          </Typography>

          {/* FEATURES CARDS */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))"
              },

              gap: 3,
              alignItems: "stretch"
            }}
          >
            {features.map((feature, index) => (

              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: "white",
                  border: "1px solid #e2edf5",

                  height: "100%",
                  boxSizing: "border-box",

                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.08)"
                  }
                }}
              >

                {/* FEATURE ICON */}

                <Box
                  sx={{
                    width: 75,
                    height: 75,
                    backgroundColor: "#e8fff7",
                    color: "#10b981",
                    borderRadius: 3,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    mb: 3
                  }}
                >
                  {feature.icon}
                </Box>

                {/* FEATURE TITLE */}

                <Typography
                  variant="h6"
                  sx={{
                    color: "#092b40",
                    fontWeight: 800,
                    mb: 2
                  }}
                >
                  {feature.title}
                </Typography>

                {/* FEATURE DESCRIPTION */}

                <Typography
                  sx={{
                    color: "#164b91",
                    fontSize: 14,
                    lineHeight: 1.8
                  }}
                >
                  {feature.description}
                </Typography>

              </Paper>

            ))}
          </Box>

        </Box>

        {/* ========================================
            WHY EV WISE
        ======================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "white",
            mb: 7
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

            {/* BENEFITS INFORMATION */}

            <Box>
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 800,
                  mb: 1
                }}
              >
                WHY EV WISE?
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: "#092b40",
                  fontWeight: 800,
                  mb: 3
                }}
              >
                Your Guide to Electric Vehicles
              </Typography>

              {benefits.map((benefit, index) => (

                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2
                  }}
                >

                  <CheckCircle
                    sx={{
                      color: "#10b981",
                      flexShrink: 0
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#164b91",
                      fontSize: 15
                    }}
                  >
                    {benefit}
                  </Typography>

                </Box>

              ))}
            </Box>

            {/* CAR ICON */}

            <Box
              sx={{
                backgroundColor: "#eff7fd",
                borderRadius: 4,
                height: 280,

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <DirectionsCar
                sx={{
                  fontSize: 140,
                  color: "#10b981"
                }}
              />
            </Box>

          </Box>

        </Paper>

        {/* ========================================
            CALL TO ACTION
        ======================================== */}

        <Box
          sx={{
            textAlign: "center",
            p: { xs: 3, md: 5 },
            backgroundColor: "#092b40",
            borderRadius: 4
          }}
        >

          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 800,
              mb: 2
            }}
          >
            Ready to Explore Electric Vehicles?
          </Typography>

          <Typography
            sx={{
              color: "#d1e7f3",
              mb: 3,
              fontSize: 15
            }}
          >
            Discover electric cars and learn more about
            modern charging solutions with EV Wise.
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/AllCars")}
            sx={{
              backgroundColor: "#10b981",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 800,
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#059669"
              }
            }}
          >
            Explore Cars
          </Button>

        </Box>

      </Container>
    </Box>
  );
}