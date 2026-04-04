import { updateProfile } from "@api/profile";
import { QueryKeys } from "@api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileSchemaProps } from "@validation/profileSchema";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileSchemaProps) => updateProfile(data),
    onSuccess: (data) => {
      toast.success(data.message || "Action successful");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE] });
    },
    onError: (error: any) => {
      toast.error(error || "Something went wrong");
    },
  });
};

export default useUpdateProfile;
