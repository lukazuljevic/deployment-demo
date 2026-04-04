import { login, register, useMe } from "@api/auth";
import { QueryKeys } from "@api/queryKeys";
import type {
  AccessToken,
  LoginRequestDto,
  RegisterRequestDto,
} from "@cart-app/types";
import { useLocalStorage } from "@hooks/useLocalStorage";
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import LocalStorage from "common/helpers/LocalStorage";
import { createContext, type ReactNode } from "react";
import toast from "react-hot-toast";

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  register: UseMutationResult<AccessToken, any, RegisterRequestDto>;
  login: ReturnType<typeof useMutation<AccessToken, any, LoginRequestDto>>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useLocalStorage<string | null>({
    key: LocalStorage.accessTokenKey,
    initialValue: null,
  });

  const { data, isLoading } = useMe(value);

  const queryClient = useQueryClient();

  const isLoggedIn = !!data?.isLoggedIn;
  const isAdmin = !!data?.isAdmin;

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequestDto) => login(data),
    onSuccess: (data) => {
      setValue(data.accessToken);
      toast.success("Successfully logged in");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ME] });
    },
    onError: (error: any) => {
      toast.error(error || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterRequestDto) => register(values),
    onSuccess: (data) => {
      setValue(data.accessToken);
      toast.success("Registration successful!");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ME] });
    },
    onError: (error: any) => {
      toast.error(error || "Registration failed");
    },
  });

  const logout = () => {
    setValue(null);
    localStorage.removeItem(LocalStorage.accessTokenKey);
    toast.success("Successfully logged out");

    queryClient.setQueryData([QueryKeys.ME], null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        login: loginMutation,
        register: registerMutation,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
