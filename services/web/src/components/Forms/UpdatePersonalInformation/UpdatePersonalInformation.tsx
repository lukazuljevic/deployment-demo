import FormInput from "@components/FormInput";
import type { ProfileSchemaProps } from "@validation/profileSchema";
import { useFormContext } from "react-hook-form";

const UpdatePersonalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSchemaProps>();

  console.log(errors);

  return (
    <>
      <FormInput
        label="First Name"
        fullWidth
        {...register("firstName")}
        error={!!errors?.firstName}
        helperText={errors?.firstName?.message}
      />
      <FormInput
        label="Last Name"
        fullWidth
        margin="normal"
        {...register("lastName")}
        error={!!errors?.lastName}
        helperText={errors?.lastName?.message}
      />
    </>
  );
};

export default UpdatePersonalInformation;
