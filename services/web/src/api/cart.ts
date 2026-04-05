import {
  CartItemResponseDto,
  type ActionResponseDto,
  type CartItemDto,
} from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const addCartItem = (item: CartItemDto) => {
  return api.post<ActionResponseDto>("/cart", item);
};

export const getCartItems = () => {
  return api.get<CartItemResponseDto[]>("/cart");
};

export const clearCartItems = () => {
  return api.delete<ActionResponseDto>("/cart");
};

export const useCartItems = () => {
  return useQuery({
    queryKey: [QueryKeys.CART],
    queryFn: getCartItems,
  });
};
