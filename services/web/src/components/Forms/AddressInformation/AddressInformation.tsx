import FormInput from "@components/FormInput";
import { type RegistrationFormSchemaProps } from "@validation/registrationForm";
import { useFormContext } from "react-hook-form";

const AddressInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormSchemaProps>();

  return (
    <>
      <fieldset>
        <legend>Shipping Address</legend>

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
          label="Country"
          fullWidth
          margin="normal"
          {...register("shippingAddress.country")}
          error={!!errors.shippingAddress?.country}
          helperText={errors.shippingAddress?.country?.message}
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
          label="Adress Type"
          fullWidth
          margin="normal"
          {...register("shippingAddress.type")}
          error={!!errors.shippingAddress?.type}
          helperText={errors.shippingAddress?.type?.message}
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
