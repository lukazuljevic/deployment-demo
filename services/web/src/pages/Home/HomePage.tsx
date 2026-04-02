import { useProducts } from "@api/products";
import ProductCard from "@components/ProductCard";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import indexRoute from "@routes/indexRoute";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const search = indexRoute.useSearch();

  const filters = {
    ...search,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts(filters);

  const products = data?.pages.flatMap((page) => page.results);

  const ref = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
};

export default HomePage;
