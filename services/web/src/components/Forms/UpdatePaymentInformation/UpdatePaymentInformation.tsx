import FormInput from "@components/FormInput";
import type { ProfileSchemaProps } from "@validation/profileSchema";
import { useFormContext } from "react-hook-form";

const UpdatePaymentInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSchemaProps>();
  return (
    <>
      <FormInput
        label="IBAN"
        fullWidth
        margin="normal"
        {...register("card.iban")}
        error={!!errors.card?.iban}
        helperText={errors.card?.iban?.message}
      />
      <FormInput
        label="Expiry Month"
        fullWidth
        margin="normal"
        type="number"
        {...register("card.expiryMonth")}
        error={!!errors.card?.expiryMonth}
        helperText={errors.card?.expiryMonth?.message}
      />
      <FormInput
        label="Expiry Year"
        fullWidth
        margin="normal"
        type="number"
        {...register("card.expiryYear")}
        error={!!errors.card?.expiryYear}
        helperText={errors.card?.expiryYear?.message}
      />
      <FormInput
        label="CVC"
        fullWidth
        margin="normal"
        type="number"
        {...register("card.cvc")}
        error={!!errors.card?.cvc}
        helperText={errors.card?.cvc?.message}
      />
    </>
  );
};

export default UpdatePaymentInformation;
