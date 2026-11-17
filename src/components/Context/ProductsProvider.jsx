
import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

const STORAGE_KEY = "evWiseProducts";

const getSavedProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
};

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState(getSavedProducts);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID()
    };

    setProducts((prev) => [...prev, newProduct]);

    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...updatedData }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
