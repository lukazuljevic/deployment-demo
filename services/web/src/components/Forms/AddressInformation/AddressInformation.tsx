import FormInput from "@components/FormInput";
import { type RegistrationFormSchemaProps } from "common/validation/registrationForm";
import { useFormContext } from "react-hook-form";
import styles from "../RegistrationForm/RegistrationForm.module.scss";

const AddressInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormSchemaProps>();

  console.log(errors);
  return (
    <>
      <fieldset>
        <legend className={styles.formInner}>Shipping Address</legend>

        <FormInput
          label="Street"
          fullWidth
          margin="normal"
          {...register("shippingAddress.street")}
          error={!!errors.shippingAddress?.street}
          helperText={errors.shippingAddress?.street?.message}
        />

        <FormInput
          label="City"
          fullWidth
          margin="normal"
          {...register("shippingAddress.city")}
          error={!!errors.shippingAddress?.city}
          helperText={errors.shippingAddress?.city?.message}
        />

        <FormInput
          label="Zip Code"
          fullWidth
          margin="normal"
          {...register("shippingAddress.zipcode")}
          error={!!errors.shippingAddress?.zipcode}
          helperText={errors.shippingAddress?.zipcode?.message}
        />

        <FormInput
          label="County"
          fullWidth
          margin="normal"
          {...register("shippingAddress.county")}
          error={!!errors.shippingAddress?.county}
          helperText={errors.shippingAddress?.county?.message}
        />

        <FormInput
          label="Country"
          fullWidth
          margin="normal"
          {...register("shippingAddress.country")}
          error={!!errors.shippingAddress?.country}
          helperText={errors.shippingAddress?.country?.message}
        />

        <FormInput
          label="Adress Type"
          fullWidth
          margin="normal"
          {...register("shippingAddress.type")}
          disabled
        />
      </fieldset>

      <fieldset>
        <legend>Billing Address</legend>

        <FormInput
          label="Street"
          fullWidth
          margin="normal"
          {...register("billingAddress.street")}
          error={!!errors.billingAddress?.street}
          helperText={errors.billingAddress?.street?.message}
        />

        <FormInput
          label="City"
          fullWidth
          margin="normal"
          {...register("billingAddress.city")}
          error={!!errors.billingAddress?.city}
          helperText={errors.billingAddress?.city?.message}
        />

        <FormInput
          label="County"
          fullWidth
          margin="normal"
          {...register("billingAddress.county")}
          error={!!errors.billingAddress?.county}
          helperText={errors.billingAddress?.county?.message}
        />

        <FormInput
          label="Country"
          fullWidth
          margin="normal"
          {...register("billingAddress.country")}
          error={!!errors.billingAddress?.country}
          helperText={errors.billingAddress?.country?.message}
        />

        <FormInput
          label="Zip Code"
          fullWidth
          margin="normal"
          {...register("billingAddress.zipcode")}
          error={!!errors.billingAddress?.zipcode}
          helperText={errors.billingAddress?.zipcode?.message}
        />

        <FormInput
          label="Adress Type"
          fullWidth
          margin="normal"
          {...register("billingAddress.type")}
          error={!!errors.billingAddress?.type}
          helperText={errors.billingAddress?.type?.message}
          disabled
        />
      </fieldset>
    </>
  );
};

export default AddressInformation;
