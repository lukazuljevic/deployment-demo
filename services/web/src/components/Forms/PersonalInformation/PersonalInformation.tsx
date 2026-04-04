import FormInput from "@components/FormInput";
import { type RegistrationFormSchemaProps } from "common/validation/registrationForm";
import { useFormContext } from "react-hook-form";
import styles from "../RegistrationForm/RegistrationForm.module.scss";

const PersonalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormSchemaProps>();

  return (
    <fieldset className={styles.formInner}>
      <legend>Personal Information</legend>

      <FormInput
        label="Email"
        fullWidth
        margin="normal"
        {...register("personalInformation.email")}
        error={!!errors.personalInformation?.email}
        helperText={errors.personalInformation?.email?.message}
      />

      <FormInput
        label="First Name"
        fullWidth
        margin="normal"
        {...register("personalInformation.firstName")}
        error={!!errors.personalInformation?.firstName}
        helperText={errors.personalInformation?.firstName?.message}
      />

      <FormInput
        label="Last Name"
        fullWidth
        margin="normal"
        {...register("personalInformation.lastName")}
        error={!!errors.personalInformation?.lastName}
        helperText={errors.personalInformation?.lastName?.message}
      />
      <FormInput
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("personalInformation.password")}
        error={!!errors.personalInformation?.password}
        helperText={errors.personalInformation?.password?.message}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("personalInformation.confirmPassword")}
        error={!!errors.personalInformation?.confirmPassword}
        helperText={errors.personalInformation?.confirmPassword?.message}
      />
    </fieldset>
  );
};

export default PersonalInformation;
