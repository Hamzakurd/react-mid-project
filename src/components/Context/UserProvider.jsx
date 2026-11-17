
import { useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "evWiseProducts";

// DEFAULT PRODUCTS
const defaultProducts = [
  {
    id: "ev-1",
    name: "EV Charging Cable Holder",
    description: "Wall-mounted holder for EV charging cables.",
  },
  {
    id: "ev-2",
    name: "Nissan Leaf Electric Drive Motor",
    description: "Electric drive motor for Nissan Leaf vehicles.",
  },
  {
    id: "ev-3",
    name: "Tire Pressure Sensor (TPMS)",
    description: "Sensor for monitoring vehicle tire pressure.",
  },
];

// READ PRODUCTS
const readProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProducts)
    );

    return defaultProducts;
  } catch (error) {
    console.error("Error reading products:", error);
    return defaultProducts;
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

    return (
      savedProducts.find(
        (product) => String(product.id) === String(id)
      ) || null
    );
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
      ...data,
      id: crypto.randomUUID(),
      name,
      description,
    };

    const currentProducts = readProducts();

    const updatedProducts = [
      ...currentProducts,
      newProduct,
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
              ...data,
              id: product.id,
              name,
              description,
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
    deleteProduct,
  };
};
