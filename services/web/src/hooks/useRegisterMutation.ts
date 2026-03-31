import type { RegisterRequestDto } from "@cart-app/types";
import { useMutation } from "@tanstack/react-query";
import { register } from "api/auth";
import { toast } from "react-hot-toast";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (values: RegisterRequestDto) => register(values),
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (err: any) => {
      toast.error(err || "Registration failed");
    },
  });
};
