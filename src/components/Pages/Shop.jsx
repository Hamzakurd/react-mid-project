
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import { ProductsContext } from "../Context/ProductsContext";

const categories = [
  "All",
  "Chargers",
  "Batteries",
  "Motors",
  "Spare Parts",
  "Accessories"
];

const CART_KEY = "evWiseCart";

const normalizeText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/\bvw\b/g, "volkswagen")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);

  const stock = Number(product.stock);
  const available = Number.isInteger(stock) && stock > 0;
  const price = Number(product.price);

  const validPrice =
    product.price !== undefined &&
    product.price !== null &&
    product.price !== "" &&
    Number.isFinite(price) &&
    price > 0;

  const compatibleModels = Array.isArray(product.compatibleModels)
    ? product.compatibleModels.join(", ")
    : product.compatibleModels || "";

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 10px 25px rgba(0,0,0,0.35)"
              : "0 10px 25px rgba(0,0,0,0.1)"
        }
      }}
    >
      <Box
        sx={{
          height: 190,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(16,185,129,0.08)"
              : "#e8f7f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {product.image && !imageError ? (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 2,
              boxSizing: "border-box"
            }}
          />
        ) : (
          <InventoryIcon
            sx={{
              fontSize: 75,
              color: "#10b981"
            }}
          />
        )}

        <Chip
          label={available ? "In Stock" : "Out of Stock"}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: available ? "#10b981" : "#ef4444",
            color: "#ffffff",
            fontWeight: 700
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Chip
          label={product.category || "Spare Parts"}
          size="small"
          sx={{
            mb: 2,
            bgcolor: "rgba(16,185,129,0.12)",
            color: "#10b981",
            fontWeight: 700
          }}
        />

        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: 17,
            mb: 1,
            minHeight: 48
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
            lineHeight: 1.7,
            mb: 2,
            minHeight: 65,
            overflowWrap: "anywhere"
          }}
        >
          {product.description}
        </Typography>

        {compatibleModels && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              mb: 2
            }}
          >
            <DirectionsCarIcon
              sx={{
                color: "#10b981",
                fontSize: 19,
                mt: 0.2
              }}
            />

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 12,
                overflowWrap: "anywhere"
              }}
            >
              Compatible with: {compatibleModels}
            </Typography>
          </Box>
        )}

        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 800,
            fontSize: 23,
            mt: 2
          }}
        >
          {validPrice
            ? `${price.toFixed(2)} JOD`
            : "Price unavailable"}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 12,
            mt: 0.5
          }}
        >
          {available
            ? `${stock} units available`
            : "Currently unavailable"}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          disabled={!available || !validPrice}
          onClick={() => onAddToCart(product)}
          sx={{
            bgcolor: "#10b981",
            color: "#ffffff",
            fontWeight: 800,
            textTransform: "none",
            borderRadius: 2,
            py: 1.2,
            "&:hover": {
              bgcolor: "#059669"
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
              color: "text.disabled"
            }
          }}
        >
          {available && validPrice
            ? "Add to Cart"
            : "Unavailable"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchWords = normalizeText(search)
    .split(" ")
    .filter(Boolean);

  const filteredProducts = products.filter((product) => {
    const compatibleModels = Array.isArray(product.compatibleModels)
      ? product.compatibleModels
      : [product.compatibleModels || ""];

    const productText = normalizeText(
      [
        product.name,
        product.description,
        product.category,
        ...compatibleModels
      ].join(" ")
    );

    const matchesSearch = searchWords.every((word) =>
      productText.includes(word)
    );

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      const cart = Array.isArray(saved) ? saved : [];

      const existingItem = cart.find(
        (item) => item.id === product.id
      );

      const currentQuantity = existingItem
        ? Number(existingItem.quantity) || 0
        : 0;

      const stock = Number(product.stock);
      const price = Number(product.price);

      if (
        !Number.isInteger(stock) ||
        stock <= 0 ||
        currentQuantity >= stock
      ) {
        toast.error("No more stock available!");
        return;
      }

      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {
        toast.error("Product price is unavailable!");
        return;
      }

      const updatedCart = existingItem
        ? cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: currentQuantity + 1
                }
              : item
          )
        : [
            ...cart,
            {
              id: product.id,
              quantity: 1
            }
          ];

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("evWiseCartUpdated"));

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Unable to add product to cart!");
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCategory("All");
  };

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
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mb: 3
          }}
        >
          Back
        </Button>

        <Typography
          sx={{
            color: "#10b981",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 1,
            mb: 1
          }}
        >
          EV WISE STORE
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            fontWeight: 800,
            mb: 2
          }}
        >
          EV Parts & Accessories
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.8,
            maxWidth: 750,
            mb: 4
          }}
        >
          Explore electric vehicle chargers, batteries,
          motors and spare parts for your EV.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center"
            },
            gap: 3,
            mb: 4
          }}
        >
          <TextField
            placeholder="Search for EV products..."
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{
              width: {
                xs: "100%",
                md: 340
              },
              bgcolor: "background.paper",
              borderRadius: 2
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: "text.secondary" }}
                    />
                  </InputAdornment>
                )
              }
            }}
          />

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 13
            }}
          >
            Showing {filteredProducts.length} products
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 4
          }}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Button
                key={category}
                variant={active ? "contained" : "outlined"}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  bgcolor: active
                    ? "#10b981"
                    : "transparent",
                  borderColor: "#10b981",
                  color: active
                    ? "#ffffff"
                    : "#10b981",
                  "&:hover": {
                    bgcolor: active
                      ? "#059669"
                      : "rgba(16,185,129,0.1)",
                    borderColor: "#10b981"
                  }
                }}
              >
                {category}
              </Button>
            );
          })}
        </Box>

        {filteredProducts.length === 0 ? (
          <Box
            sx={{
              py: 9,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 3
            }}
          >
            <InventoryIcon
              sx={{
                fontSize: 65,
                color: "#10b981",
                mb: 2
              }}
            />

            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                mb: 1
              }}
            >
              No Products Found
            </Typography>

            <Typography color="text.secondary">
              Try a different search or category.
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
                lg: "repeat(4, minmax(0, 1fr))"
              },
              gap: 3,
              alignItems: "stretch"
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
