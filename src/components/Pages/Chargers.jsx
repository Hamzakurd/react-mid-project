import { useState } from "react";
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

// ========================================
// AC CHARGERS
// ========================================

const acChargers = [
  {
    name: "AC Charger 12A Fixed",
    type: "AC",
    current: "12A",
    power: "2.76 kW",
    voltage: "230V",
    phase: "Single Phase",
    description:
      "A fixed 12A AC charger suitable for compatible home charging installations.",
    features: [
      "Fixed 12A current",
      "Single-phase charging",
      "Overnight charging",
      "Easy operation"
    ]
  },
  {
    name: "AC Charger 16A Fixed",
    type: "AC",
    current: "16A",
    power: "3.68 kW",
    voltage: "230V",
    phase: "Single Phase",
    description:
      "A fixed 16A AC charger designed for reliable everyday charging.",
    features: [
      "Fixed 16A current",
      "Home charging",
      "Single-phase charging",
      "Dedicated rated circuit"
    ]
  },
  {
    name: "AC Adjustable Charger",
    type: "AC",
    current: "6A–16A",
    power: "1.38–3.68 kW",
    voltage: "230V",
    phase: "Single Phase",
    description:
      "An adjustable AC charger allowing flexible charging current settings.",
    features: [
      "Adjustable current",
      "Flexible charging",
      "Multiple settings",
      "Home charging"
    ]
  },
  {
    name: "AC Wallbox 32A",
    type: "AC",
    current: "32A",
    power: "7.36 kW",
    voltage: "230V",
    phase: "Single Phase",
    description:
      "A wall-mounted AC charger for residential and workplace charging.",
    features: [
      "32A charging",
      "Wall-mounted design",
      "Home and workplace",
      "Dedicated circuit"
    ]
  },
  {
    name: "AC Three Phase 22kW",
    type: "AC",
    current: "32A",
    power: "22 kW",
    voltage: "400V",
    phase: "Three Phase",
    description:
      "A high-power AC charger for compatible electric vehicles.",
    features: [
      "Three-phase charging",
      "22kW output",
      "Commercial charging",
      "High charging capacity"
    ]
  }
];

// ========================================
// DC CHARGERS
// ========================================

const dcChargers = [
  {
    name: "DC Fast Charger 30kW",
    type: "DC",
    current: "Vehicle dependent",
    power: "30 kW",
    voltage: "Vehicle dependent",
    phase: "DC Output",
    description:
      "A DC fast charger suitable for compatible public and commercial charging locations.",
    features: [
      "30kW output",
      "Direct DC charging",
      "Commercial use",
      "Compatible EVs"
    ]
  },
  {
    name: "DC Fast Charger 60kW",
    type: "DC",
    current: "Vehicle dependent",
    power: "60 kW",
    voltage: "Vehicle dependent",
    phase: "DC Output",
    description:
      "A 60kW DC charger designed for faster public electric vehicle charging.",
    features: [
      "60kW output",
      "Public charging",
      "Direct DC charging",
      "Charging stations"
    ]
  },
  {
    name: "DC Rapid Charger 120kW",
    type: "DC",
    current: "Vehicle dependent",
    power: "120 kW",
    voltage: "Vehicle dependent",
    phase: "DC Output",
    description:
      "A rapid DC charger designed for highway and commercial charging stations.",
    features: [
      "120kW output",
      "Rapid charging",
      "Highway stations",
      "High-power technology"
    ]
  },
  {
    name: "DC Ultra-Fast 180kW",
    type: "DC",
    current: "Vehicle dependent",
    power: "180 kW",
    voltage: "Vehicle dependent",
    phase: "DC Output",
    description:
      "An ultra-fast DC charger for vehicles supporting high-power charging.",
    features: [
      "180kW output",
      "Ultra-fast charging",
      "Commercial stations",
      "High-power technology"
    ]
  }
];

// ========================================
// CHARGER CARD COMPONENT
// ========================================

function ChargerCard({ charger }) {
  const isAC = charger.type === "AC";

  const specs = [
    {
      label: "Power",
      value: charger.power,
      icon: <Bolt sx={{ fontSize: 18 }} />
    },
    {
      label: "Current",
      value: charger.current,
      icon: <BatteryChargingFull sx={{ fontSize: 18 }} />
    },
    {
      label: "Voltage",
      value: charger.voltage,
      icon: <Speed sx={{ fontSize: 18 }} />
    },
    {
      label: "Connection",
      value: charger.phase,
      icon: <ElectricBolt sx={{ fontSize: 18 }} />
    }
  ];

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: "1px solid #e2edf5",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
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
        {/* CHARGER ICON */}

        <Box
          sx={{
            height: 100,
            borderRadius: 2,
            backgroundColor: isAC ? "#effaf5" : "#eff7ff",
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

        {/* TYPE */}

        <Chip
          label={`${charger.type} CHARGER`}
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 1.5,
            fontWeight: 700,
            fontSize: 11,
            backgroundColor: isAC
              ? "#e8fff7"
              : "#e8f3ff",
            color: isAC
              ? "#10b981"
              : "#168cf0"
          }}
        />

        {/* NAME */}

        <Typography
          sx={{
            color: "#092b40",
            fontWeight: 800,
            fontSize: 15,
            lineHeight: 1.4,
            minHeight: 44,
            mb: 1
          }}
        >
          {charger.name}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          sx={{
            fontSize: 12,
            color: "#64748b",
            lineHeight: 1.6,
            minHeight: 78,
            mb: 1.5
          }}
        >
          {charger.description}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* SPECIFICATIONS */}

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
                  color: "#164b91",
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

        {/* MAIN FEATURES */}

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ mb: 1.5 }} />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: "#092b40",
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
            {charger.features.map((feature) => (
              <Box
                key={feature}
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
                    color: "#164b91",
                    lineHeight: 1.5
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// ========================================
// MAIN CHARGERS PAGE
// ========================================

export default function Chargers() {
  const navigate = useNavigate();

  // Show AC chargers by default
  const [selectedType, setSelectedType] = useState("AC");

  const allChargers = [
    ...acChargers,
    ...dcChargers
  ];

  // Filter chargers based on AC or DC selection
  const filteredChargers = allChargers.filter(
    (charger) => charger.type === selectedType
  );

  return (
    <Box
      sx={{
        backgroundColor: "#eff7fd",
        minHeight: "100vh",
        py: 5
      }}
    >
      <Container maxWidth="xl">

        {/* BACK BUTTON */}

        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: "#092b40",
            fontWeight: 700
          }}
        >
          Back
        </Button>

        {/* PAGE TITLE */}

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
            color: "#092b40",
            mb: 2
          }}
        >
          Electric Vehicle Chargers
        </Typography>

        <Typography
          sx={{
            color: "#164b91",
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

        {/* FILTER BUTTONS - AC AND DC ONLY */}

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
                    backgroundColor: active
                      ? "#059669"
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

        {/* CHARGERS GRID */}

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
              key={charger.name}
              charger={charger}
            />
          ))}
        </Box>

        {/* AC VS DC INFORMATION */}

        <Box
          sx={{
            mt: 6,
            p: { xs: 3, md: 4 },
            backgroundColor: "white",
            borderRadius: 4
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#092b40",
              fontWeight: 800,
              mb: 2
            }}
          >
            AC vs DC Charging
          </Typography>

          <Typography
            sx={{
              color: "#164b91",
              lineHeight: 1.9,
              fontSize: 14
            }}
          >
            AC charging supplies alternating current
            to the vehicle. The vehicle's onboard charger
            converts AC electricity into DC power to
            charge the battery.

            AC charging is commonly used at homes,
            workplaces and parking locations.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography
            sx={{
              color: "#164b91",
              lineHeight: 1.9,
              fontSize: 14
            }}
          >
            DC charging converts AC electricity into
            DC outside the vehicle and delivers DC power
            through compatible charging hardware.

            DC chargers are commonly used at public
            charging stations and highway service areas
            where faster charging is required.
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: 12,
              mt: 3,
              lineHeight: 1.8
            }}
          >
            Note: Actual charging power depends on vehicle
            compatibility, battery conditions and electrical
            infrastructure. Electrical installations must
            meet the charger's safety and current requirements.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}