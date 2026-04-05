import { useProducts } from "@api/products";
import indexRoute from "@routes/indexRoute";
import { useNavigate } from "@tanstack/react-router";
import useInfiniteScroll from "./useInfiniteScroll";

const useHomePageProducts = () => {
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

  const handleSearch = (value: string) => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        search: value || undefined,
      }),
      replace: true,
    });
  };

  return {
    search,
    data,
    ref,
    handleSearch,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useHomePageProducts;
