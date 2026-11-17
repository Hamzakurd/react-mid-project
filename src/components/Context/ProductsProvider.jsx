import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import defaultProducts from "../Data/products.json";

const STORAGE_KEY = "evWiseProducts";
const INITIALIZED_KEY = "evWiseProductsInitialized";

const getInitialProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed; // Keep existing products, prices and images.
      }
      if (Array.isArray(parsed) && localStorage.getItem(INITIALIZED_KEY) === "true") {
        return parsed; // Allow an intentionally empty shop after deleting all products.
      }
    }
  } catch (error) {
    console.error("Failed to load saved products:", error);
  }

  // Seed the original 25 products once on a new browser or old empty storage.
  return defaultProducts;
};

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState(getInitialProducts);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      localStorage.setItem(INITIALIZED_KEY, "true");
    } catch (error) {
      console.error("Failed to save products:", error);
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: crypto.randomUUID() };
    setProducts((previous) => [...previous, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((previous) =>
      previous.map((product) =>
        String(product.id) === String(id)
          ? { ...product, ...updatedData, id: product.id }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((previous) =>
      previous.filter((product) => String(product.id) !== String(id))
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
