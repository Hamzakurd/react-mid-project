import { useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "evWiseProducts";

// READ PRODUCTS
const readProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
};

export const useProducts = () => {
  const [products, setProducts] = useState(readProducts);

  // SAVE PRODUCTS
  const saveProducts = (updatedProducts) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProducts)
      );

      setProducts(updatedProducts);

      return true;
    } catch (error) {
      console.error("Error saving products:", error);
      toast.error("Failed to save products!");
      return false;
    }
  };

  // GET ALL PRODUCTS
  const getAllProducts = () => {
    const savedProducts = readProducts();

    setProducts(savedProducts);

    return savedProducts;
  };

  // GET PRODUCT BY ID
  const getProductById = (id) => {
    const savedProducts = readProducts();

    return savedProducts.find(
      (product) => String(product.id) === String(id)
    ) || null;
  };

  // ADD PRODUCT
  const addProduct = (data) => {
    const name = data?.name?.trim();
    const description = data?.description?.trim();

    if (!name || !description) {
      toast.error("Please fill all fields!");
      return false;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description
    };

    const currentProducts = readProducts();

    const updatedProducts = [
      ...currentProducts,
      newProduct
    ];

    if (saveProducts(updatedProducts)) {
      toast.success("Product added successfully!");
      return true;
    }

    return false;
  };

  // UPDATE PRODUCT
  const updateProduct = (id, data) => {
    const name = data?.name?.trim();
    const description = data?.description?.trim();

    if (!name || !description) {
      toast.error("Please fill all fields!");
      return false;
    }

    const currentProducts = readProducts();

    const productExists = currentProducts.some(
      (product) => String(product.id) === String(id)
    );

    if (!productExists) {
      toast.error("Product not found!");
      return false;
    }

    const updatedProducts = currentProducts.map(
      (product) =>
        String(product.id) === String(id)
          ? {
              ...product,
              name,
              description
            }
          : product
    );

    if (saveProducts(updatedProducts)) {
      toast.success("Product updated successfully!");
      return true;
    }

    return false;
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    const currentProducts = readProducts();

    const productExists = currentProducts.some(
      (product) => String(product.id) === String(id)
    );

    if (!productExists) {
      toast.error("Product not found!");
      return false;
    }

    const updatedProducts = currentProducts.filter(
      (product) => String(product.id) !== String(id)
    );

    if (saveProducts(updatedProducts)) {
      toast.success("Product deleted successfully!");
      return true;
    }

    return false;
  };

  return {
    products,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
  };
};