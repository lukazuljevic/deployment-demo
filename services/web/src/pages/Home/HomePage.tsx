import { useProducts } from "@api/products";
import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import ProductCard from "@components/ProductCard";
import SearchBar from "@components/SearchBar/SearchBar";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import indexRoute from "@routes/indexRoute";
import { useNavigate } from "@tanstack/react-router";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const search = indexRoute.useSearch();
  const navigate = useNavigate();

  const filters = {
    ...search,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useProducts(filters);

  const ref = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const products = data?.pages.flatMap((page) => page.results) ?? [];

  if (isError || products.length === 0)
    return <FetchError message="Error loading products" onRetry={refetch} />;

  const isEmpty = !isLoading && products.length === 0;

  const handleSearch = (value: string) => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        search: value,
      }),
      replace: true,
    });
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingState />}

      <SearchBar
        value={search.search || ""}
        placeholder="Search for..."
        onSearchChange={handleSearch}
      />

      {isEmpty && <EmptyState message="No produts found" />}

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
