import {
  OrderListDto,
  type ActionResponseDto,
  type CreateOrderDto,
  type FindOrdersDto,
} from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const placeOrder = (data: CreateOrderDto) => {
  return api.post<ActionResponseDto>("/orders", data);
};

export const getOrders = (filters: FindOrdersDto) => {
  return api.post<OrderListDto[]>("/orders", filters);
};

export const useOrders = (filters: FindOrdersDto) => {
  const queryKey = [QueryKeys.ORDERS, filters.orderStatus];

  return useQuery({
    queryKey,
    queryFn: () => getOrders(filters),
  });
};
