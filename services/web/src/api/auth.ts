import type {
  AccessToken,
  LoginRequestDto,
  MeResponseDto,
  RegisterRequestDto,
} from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "api";
import { QueryKeys } from "./queryKeys";

export const register = (data: RegisterRequestDto): Promise<AccessToken> => {
  return api.post<RegisterRequestDto, AccessToken>("/auth/register", data);
};

export const login = (data: LoginRequestDto): Promise<AccessToken> => {
  return api.post<RegisterRequestDto, AccessToken>("/auth/login", data);
};

export const me = async (): Promise<MeResponseDto> => {
  return api.get<never, MeResponseDto>("/auth/me");
};

export const useMe = (token: string | null) => {
  return useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: me,
    enabled: !!token,
    retry: false,
  });
};
