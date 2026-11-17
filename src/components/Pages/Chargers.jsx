
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Chip,
  Divider
} from "@mui/material";

import {
  Bolt,
  BatteryChargingFull,
  ArrowBack,
  ElectricBolt,
  Power,
  CheckCircle,
  Speed
} from "@mui/icons-material";

import { ChargersContext } from "../Context/ChargersContext";

function ChargerCard({ charger }) {
  const isAC = charger.type === "AC";

  const specs = [
    {
      label: "Power",
      value: charger.power || "Not available",
      icon: <Bolt sx={{ fontSize: 18 }} />
    },
    {
      label: "Current",
      value: charger.current || "Not available",
      icon: <BatteryChargingFull sx={{ fontSize: 18 }} />
    },
    {
      label: "Voltage",
      value: charger.voltage || "Not available",
      icon: <Speed sx={{ fontSize: 18 }} />
    },
    {
      label: "Connection",
      value: charger.phase || "Not available",
      icon: <ElectricBolt sx={{ fontSize: 18 }} />
    }
  ];

  const features = Array.isArray(charger.features)
    ? charger.features
    : [];

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
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
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            height: 100,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? isAC
                  ? "rgba(16,185,129,0.12)"
                  : "rgba(22,140,240,0.12)"
                : isAC
                ? "#effaf5"
                : "#eff7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2
          }}
        >
          {isAC ? (
            <Power
              sx={{
                fontSize: 55,
                color: "#10b981"
              }}
            />
          ) : (
            <ElectricBolt
              sx={{
                fontSize: 55,
                color: "#168cf0"
              }}
            />
          )}
        </Box>

        <Chip
          label={`${charger.type} CHARGER`}
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 1.5,
            fontWeight: 700,
            fontSize: 11,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? isAC
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(22,140,240,0.15)"
                : isAC
                ? "#e8fff7"
                : "#e8f3ff",
            color: isAC ? "#10b981" : "#168cf0"
          }}
        />

        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: 15,
            lineHeight: 1.4,
            minHeight: 44,
            mb: 1
          }}
        >
          {charger.name}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "text.secondary",
            lineHeight: 1.6,
            minHeight: 78,
            mb: 1.5
          }}
        >
          {charger.description || "No description available."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
            mb: 2
          }}
        >
          {specs.map((spec) => (
            <Box
              key={spec.label}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1
              }}
            >
              <Box
                sx={{
                  color: "#10b981",
                  flexShrink: 0,
                  display: "flex"
                }}
              >
                {spec.icon}
              </Box>

              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "#164b91",
                  fontSize: 12,
                  lineHeight: 1.5,
                  overflowWrap: "anywhere"
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 700 }}
                >
                  {spec.label}:
                </Box>{" "}
                {spec.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ mb: 1.5 }} />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: "text.primary",
              mb: 1.5
            }}
          >
            Main Features
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            {features.length > 0 ? (
              features.map((feature, index) => (
                <Box
                  key={`${feature}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1
                  }}
                >
                  <CheckCircle
                    sx={{
                      color: "#10b981",
                      fontSize: 16,
                      flexShrink: 0,
                      mt: "2px"
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "text.secondary"
                          : "#164b91",
                      lineHeight: 1.5
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary"
                }}
              >
                No features available.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default function Chargers() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("AC");

  const { chargers } = useContext(ChargersContext);

  const filteredChargers = chargers.filter(
    (charger) => charger.type === selectedType
  );

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#eff7fd",
        minHeight: "100vh",
        py: 5
      }}
    >
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: "text.primary",
            fontWeight: 700
          }}
        >
          Back
        </Button>

        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 700,
            fontSize: 14,
            mb: 1
          }}
        >
          EV CHARGING SOLUTIONS
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 2
          }}
        >
          Electric Vehicle Chargers
        </Typography>

        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "text.secondary"
                : "#164b91",
            fontSize: 14,
            lineHeight: 1.8,
            mb: 4,
            maxWidth: 800
          }}
        >
          Explore AC and DC electric vehicle charging
          solutions. Compare charging power, current,
          voltage and important features.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 5
          }}
        >
          {["AC", "DC"].map((type) => {
            const active = selectedType === type;

            return (
              <Button
                key={type}
                variant={active ? "contained" : "outlined"}
                onClick={() => setSelectedType(type)}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 700,
                  fontSize: 12,
                  backgroundColor: active
                    ? "#10b981"
                    : "transparent",
                  color: active
                    ? "#ffffff"
                    : "#10b981",
                  borderColor: "#10b981",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      active
                        ? "#059669"
                        : theme.palette.mode === "dark"
                        ? "rgba(16,185,129,0.14)"
                        : "#e8fff7",
                    borderColor: "#10b981"
                  }
                }}
              >
                {`${type} Chargers`}
              </Button>
            );
          })}
        </Box>

        {filteredChargers.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 7
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No {selectedType} chargers available.
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
              columnGap: {
                xs: 2,
                md: 3
              },
              rowGap: {
                xs: 3,
                md: 4
              },
              alignItems: "stretch"
            }}
          >
            {filteredChargers.map((charger) => (
              <ChargerCard
                key={charger.id}
                charger={charger}
              />
            ))}
          </Box>
        )}

        <Box
          sx={{
            mt: 6,
            p: { xs: 3, md: 4 },
            bgcolor: "background.paper",
            borderRadius: 4
          }}
        >
          {selectedType === "AC" ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  mb: 2
                }}
              >
                AC Charging Details
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14
                }}
              >
                AC charging supplies alternating current
                to the vehicle. The vehicle's onboard
                charger converts AC electricity into DC
                power to charge the battery.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14
                }}
              >
                AC charging is commonly used at homes,
                workplaces and parking locations. It is
                suitable for everyday and overnight
                charging.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14,
                  mt: 2
                }}
              >
                AC chargers include fixed 12A and 16A
                models, adjustable portable chargers,
                wallboxes and three-phase charging
                systems.
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  mb: 2
                }}
              >
                DC Charging Details
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14
                }}
              >
                DC charging converts AC electricity
                into DC outside the vehicle and
                delivers DC power to the battery
                through compatible charging hardware.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14
                }}
              >
                DC chargers are commonly used at public
                charging stations, commercial locations
                and highway service areas where faster
                charging is required.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 14,
                  mt: 2
                }}
              >
                DC charging equipment includes 30 kW,
                60 kW, 120 kW and 180 kW chargers.
                Actual charging speed depends on the
                vehicle and battery conditions.
              </Typography>
            </>
          )}

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12,
              mt: 3,
              lineHeight: 1.8
            }}
          >
            Note: Actual charging power depends on
            vehicle compatibility, battery conditions
            and electrical infrastructure. Electrical
            installations must meet the charger's
            safety and current requirements.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
