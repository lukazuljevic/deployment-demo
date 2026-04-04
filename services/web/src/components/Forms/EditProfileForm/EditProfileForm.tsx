import {
  type ProfileResponseDto,
  type UserAddressResponseDto,
} from "@cart-app/types";
import UpdateAddressInformation from "@components/Forms/UpdateAddressInformation";
import UpdatePaymentInformation from "@components/Forms/UpdatePaymentInformation";
import UpdatePersonalInformation from "@components/Forms/UpdatePersonalInformation";
import { getDirtyValues } from "@helpers/getDirtyValues";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateProfile from "@hooks/useUpdateProfile";
import { Modal } from "@mui/material";
import {
  profileSchema,
  type ProfileSchemaProps,
} from "@validation/profileSchema";
import { REDIRECT_TIMEOUT } from "common/constants/redirect";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./EditProfileForm.module.scss";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  shippingAddress?: UserAddressResponseDto;
  profile: ProfileResponseDto;
}

const EditProfileForm: React.FC<EditProfileModalProps> = ({
  isOpen,
  shippingAddress,
  onClose,
  profile,
}) => {
  const form = useForm<ProfileSchemaProps>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      ...profile,
      address: {
        ...shippingAddress,
      },
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const updateProfile = useUpdateProfile();

  const onSubmit = (data: ProfileSchemaProps) => {
    const dirtyData = getDirtyValues(dirtyFields, data) as ProfileSchemaProps;

    if (dirtyData.address)
      dirtyData.address = {
        ...dirtyData.address,
        id: shippingAddress?.id,
      };

    if (Object.keys(dirtyData).length === 0) {
      toast.error("No changes detected");
      return;
    }

    updateProfile.mutate(dirtyData, {
      onSuccess: () => {
        setTimeout(() => onClose(), REDIRECT_TIMEOUT);
      },
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.editContainer}>
        <h2 className={styles.title}>Edit Profile</h2>
        <div className={styles.body}>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UpdatePersonalInformation />
              <UpdateAddressInformation />
              <UpdatePaymentInformation />
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileForm;
