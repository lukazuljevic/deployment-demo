import ProductsHeader from "@components/ProductsHeader";
import { ColorFilterProvider } from "@context/ColorFilterContext";
import { productRoute } from "@routes/productRoute";
import { Outlet, useMatches } from "@tanstack/react-router";
import ProductsContent from "./ProductsContent";

const ProductsPage = () => {
  const matches = useMatches();

  const isProductDetail = matches.some(
    (match) => match.routeId === productRoute.id,
  );

  return (
    <ColorFilterProvider>
      <ProductsHeader />
      {!isProductDetail && <ProductsContent />}
      {isProductDetail && <Outlet />}
    </ColorFilterProvider>
  );
};

export default ProductsPage;
