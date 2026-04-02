import {
  type FindProductsDto,
  type PaginatedResponse,
  type ProductListDto,
} from "@cart-app/types";
import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { api } from ".";

export const searchProducts = async (filters: FindProductsDto) => {
  return api.post<PaginatedResponse<ProductListDto>>(
    "/products/search",
    filters,
  );
};
export const useProducts = (filters: FindProductsDto) => {
  const queryKey = [
    "products",
    filters.categoryId,
    filters.search,
    filters.sortOrder,
    filters.inStock,
    filters.limit,
  ];

  return useInfiniteQuery<
    PaginatedResponse<ProductListDto>,
    Error,
    InfiniteData<PaginatedResponse<ProductListDto>>,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      searchProducts({ ...filters, pageNumber: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.next ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};

export const prefetchProducts = async (
  queryClient: QueryClient,
  filters: FindProductsDto,
) => {
  console.log(filters);
  return queryClient.prefetchInfiniteQuery<
    PaginatedResponse<ProductListDto>,
    Error,
    InfiniteData<PaginatedResponse<ProductListDto>>,
    any,
    number
  >({
    queryKey: [
      "products",
      filters.categoryId,
      filters.search,
      filters.sortOrder,
      filters.inStock,
      filters.limit,
    ],
    queryFn: ({ pageParam = 1 }) =>
      searchProducts({ ...filters, pageNumber: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<ProductListDto>) =>
      lastPage.meta.next ?? undefined,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};
