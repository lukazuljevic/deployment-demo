import { placeOrder } from "@api/order";
import { QueryKeys } from "@api/queryKeys";
import type { CreateOrderDto } from "@cart-app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDto) => placeOrder(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CART] });
      toast.success(data.message ?? "Order has been placed");
    },
    onError: (error: any) => {
      toast.error(error ?? "Error while processing order");
    },
  });
};

export default usePlaceOrder;
