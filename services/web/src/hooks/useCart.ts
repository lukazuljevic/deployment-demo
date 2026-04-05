import { addCartItem, clearCartItems } from "@api/cart";
import { QueryKeys } from "@api/queryKeys";
import { type CartItemDto } from "@cart-app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCart = () => {
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: (item: CartItemDto) => addCartItem(item),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CART] });
      toast.success(data.message ?? "Item added to cart");
    },
    onError: (error: any) => {
      toast.error(error || "Something went wrong");
    },
  });

  const clearCart = useMutation({
    mutationFn: () => clearCartItems(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CART] });
      toast.success(data.message ?? "Cart cleared");
    },
    onError: (error: any) => {
      toast.error(error || "Failed to clear cart");
    },
  });

  return {
    addToCart: addItemMutation,
    clearCart,
  };
};

export default useCart;
