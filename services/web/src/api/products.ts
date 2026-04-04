import {
  SortOrder,
  type FindProductsDto,
  type PaginatedResponse,
  type ProductListDto,
  type ProductResponseDto,
} from "@cart-app/types";
import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const searchProducts = async (filters: FindProductsDto) => {
  return api.post<PaginatedResponse<ProductListDto>>(
    "/products/search",
    filters,
  );
};
export const useProducts = (filters: FindProductsDto) => {
  const updatedFilters: FindProductsDto = {
    ...filters,
    sortOrder: filters.sortOrder?.toLocaleLowerCase() as SortOrder,
  };

  const queryKey = [
    QueryKeys.PRODUCTS,
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
      searchProducts({ ...updatedFilters, pageNumber: pageParam }),
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
  const updatedFilters: FindProductsDto = {
    ...filters,
    sortOrder: filters.sortOrder?.toLocaleLowerCase() as SortOrder,
  };

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
      searchProducts({ ...updatedFilters, pageNumber: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<ProductListDto>) =>
      lastPage.meta.next ?? undefined,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};

export const getProduct = async (id: string): Promise<ProductResponseDto> => {
  return api.get<ProductResponseDto>(`/products/${id}`);
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, productId],
    queryFn: () => getProduct(productId),
  });
};
