import type { AccessToken, RegisterRequestDto } from "@cart-app/types";
import { api } from "api";

export const register = (data: RegisterRequestDto): Promise<AccessToken> => {
  return api.post<RegisterRequestDto, AccessToken>("/auth/register", data);
};
