import {
  type ActionResponseDto,
  type ProfileResponseDto,
} from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import type { ProfileSchemaProps } from "@validation/profileSchema";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const getProfile = () => {
  return api.get<ProfileResponseDto>("/users/me");
};

export const useProfile = () => {
  return useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: getProfile,
  });
};

export const updateProfile = (data: ProfileSchemaProps) => {
  return api.put<ActionResponseDto>("/users/me", data);
};
