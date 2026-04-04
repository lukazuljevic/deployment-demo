import { useCategories } from "@api/category";
import { useProducts } from "@api/products";
import type { SortOrder } from "@cart-app/types";
import { productsRoute } from "@routes/productRoute";
import { useNavigate } from "@tanstack/react-router";
import useInfiniteScroll from "./useInfiniteScroll";

const useProductsPage = () => {
  const search = productsRoute.useSearch();
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

  const { data: categories } = useCategories();

  const ref = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const products = data?.pages.flatMap((page) => page.results) ?? [];

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

  const handleCategory = (categoryId: string) => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        categoryId: categoryId || undefined,
      }),
      replace: true,
    });
  };

  const handleSortOrder = (order?: SortOrder) => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        sortOrder: order || undefined,
      }),
      replace: true,
    });
  };

  return {
    search,
    categories,
    products,
    ref,
    handleSearch,
    handleCategory,
    handleSortOrder,
    isLoading,
    isError,
    refetch,
  };
};

export default useProductsPage;
