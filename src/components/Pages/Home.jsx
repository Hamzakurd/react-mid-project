
import { useContext } from "react";

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
import { useTheme } from "@mui/material/styles";
import { CarsContext } from "../Context/CarsContext";

const features = [
  {
    icon: <EnergySavingsLeafIcon />,
    title: "Eco Friendly",
    description:
      "Reduce emissions and help create a cleaner planet."
  },
  {
    icon: <AttachMoney />,
    title: "Lower Running Costs",
    description:
      "Save money with lower charging and maintenance costs."
  },
  {
    icon: <Bolt />,
    title: "Advanced Technology",
    description:
      "Experience innovation, safety and smart features."
  }
];

export default function Home() {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === "dark";

  const { cars } = useContext(CarsContext);
  const featuredCars = cars.slice(0, 5);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "clip",
        boxSizing: "border-box",
        bgcolor: "background.default",
        color: "text.primary"
      }}
    >
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

      <Box
        id="features"
        sx={{
          backgroundColor: "background.default",
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
                <Box
                  sx={{
                    minWidth: 68,
                    width: 68,
                    height: 68,
                    flexShrink: 0,
                    borderRadius: 3,
                    backgroundColor: isDark
                      ? index === 1
                        ? "#15344b"
                        : index === 2
                        ? "#30294b"
                        : "#163f34"
                      : index === 1
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

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      mb: 0.5
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "text.secondary",
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

      <Box
        id="cars"
        sx={{
          backgroundColor: isDark ? "#172127" : "#eff7fd",
          py: 3,
          scrollMarginTop: 2
        }}
      >
        <Container maxWidth="xl">
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
                color: "text.primary",
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

          {featuredCars.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6
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
              {featuredCars.map((car) => (
                <Card
                  key={car.id}
                  sx={{
                    height: "100%",
                    minWidth: 0,
                    minHeight: 310,
                    borderRadius: 3,
                    boxShadow: "none",
                    backgroundColor: "background.paper",
                    p: 1.5,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDark
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
                      maxWidth: "100%",
                      height: 115,
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
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      "&:last-child": {
                        pb: 1
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "text.primary",
                        mb: 1.5,
                        minHeight: 44,
                        fontSize: 15,
                        overflowWrap: "break-word"
                      }}
                    >
                      {car.name}
                    </Typography>

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
                          color: "text.secondary",
                          overflowWrap: "break-word"
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
                          color: "text.secondary",
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
                          "&:hover": {
                            backgroundColor: isDark
                              ? "#123f34"
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
    </Box>
  );
}
