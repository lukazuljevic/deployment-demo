import FormInput from "@components/FormInput";
import { type ProfileSchemaProps } from "@validation/profileSchema";
import { useFormContext } from "react-hook-form";

const UpdateAddressInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSchemaProps>();
  return (
    <>
      <FormInput
        label="City"
        fullWidth
        margin="normal"
        {...register("address.city")}
        error={!!errors.address?.city}
        helperText={errors.address?.city?.message}
      ></FormInput>

      <FormInput
        label="Zipcode"
        fullWidth
        margin="normal"
        {...register("address.zipcode")}
        error={!!errors.address?.zipcode}
        helperText={errors.address?.zipcode?.message}
      ></FormInput>

      <FormInput
        label="County"
        fullWidth
        margin="normal"
        {...register("address.county")}
        error={!!errors.address?.county}
        helperText={errors.address?.county?.message}
      ></FormInput>

      <FormInput
        label="Country"
        fullWidth
        margin="normal"
        {...register("address.country")}
        error={!!errors.address?.country}
        helperText={errors.address?.country?.message}
      ></FormInput>

      <FormInput
        label="Adress Type"
        fullWidth
        margin="normal"
        {...register("address.type")}
        disabled
      />
    </>
  );
};

export default UpdateAddressInformation;
