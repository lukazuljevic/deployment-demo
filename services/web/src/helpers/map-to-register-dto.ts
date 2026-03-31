import type { RegisterRequestDto } from "@cart-app/types";
import type { RegistrationFormSchemaProps } from "@validation/registrationForm";

const mapToRegisterDto = (
  values: RegistrationFormSchemaProps,
): RegisterRequestDto => {
  return {
    email: values.personalInformation.email,
    firstName: values.personalInformation.firstName,
    lastName: values.personalInformation.lastName,
    password: values.personalInformation.password,
    addresses: [
      {
        ...values.shippingAddress,
      },
      {
        ...values.billingAddress,
      },
    ],
    card: {
      expiryMonth: values.paymentInformation.expiryMonth,
      expiryYear: values.paymentInformation.expiryYear,
      iban: values.paymentInformation.iban,
      cvc: values.paymentInformation.cvc,
    },
  };
};

export default mapToRegisterDto;
