import FormInput from "@components/FormInput";
import { type RegistrationFormSchemaProps } from "common/validation/registrationForm";
import { useFormContext } from "react-hook-form";
import styles from "../RegistrationForm/RegistrationForm.module.scss";

const PaymentInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormSchemaProps>();

  return (
    <fieldset>
      <legend className={styles.formInnter}>Payment Information</legend>

      <FormInput
        label="Expiry Month"
        fullWidth
        margin="normal"
        {...register("paymentInformation.expiryMonth", { valueAsNumber: true })}
        error={!!errors.paymentInformation?.expiryMonth}
        helperText={errors.paymentInformation?.expiryMonth?.message}
      />

      <FormInput
        label="Expiry Year"
        fullWidth
        margin="normal"
        {...register("paymentInformation.expiryYear", { valueAsNumber: true })}
        error={!!errors.paymentInformation?.expiryYear}
        helperText={errors.paymentInformation?.expiryYear?.message}
      />

      <FormInput
        label="IBAN"
        fullWidth
        margin="normal"
        {...register("paymentInformation.iban")}
        error={!!errors.paymentInformation?.iban}
        helperText={errors.paymentInformation?.iban?.message}
      />

      <FormInput
        label="CVC"
        fullWidth
        margin="normal"
        {...register("paymentInformation.cvc")}
        error={!!errors.paymentInformation?.cvc}
        helperText={errors.paymentInformation?.cvc?.message}
      />
    </fieldset>
  );
};

export default PaymentInformation;
