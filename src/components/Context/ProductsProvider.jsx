import { ProductsContext } from "./ProductsContext";
import { useProducts } from "../Hooks/useProducts";

export default function ProductsProvider({ children }) {
  const productsData = useProducts();

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  );
}