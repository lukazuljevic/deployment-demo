import ColorFilterPopup from "@components/ColorFilterPopup";
import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import ProductCard from "@components/ProductCard";
import useFilterContext from "@hooks/useColorFilter";
import useProductsPage from "@hooks/useProductsPage";
import { useMemo } from "react";
import styles from "./ProductsPage.module.scss";

const ProductsContent = () => {
  const { search, categories, products, ref, isLoading, isError, refetch } =
    useProductsPage();

  const { selectedColors } = useFilterContext();

  const filteredProducts = useMemo(() => {
    if (selectedColors.length === 0) return products;

    return products.filter((product) =>
      product.images.some((img) =>
        img.color ? selectedColors.includes(img.color) : false,
      ),
    );
  }, [products, selectedColors]);

  if (isError)
    return <FetchError message="Error loading products" onRetry={refetch} />;

  const isEmpty = !isLoading && filteredProducts.length === 0;

  return (
    <div className={styles.container}>
      {isLoading && <LoadingState />}

      <p className={styles.activeCategory}>
        {search.categoryId
          ? categories?.find((cat) => cat.id === search.categoryId)?.name
          : "All"}
      </p>
      {isEmpty && <EmptyState message="No products found" />}

      <div className={styles.cardContainer}>
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ColorFilterPopup />

      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
};

export default ProductsContent;
