import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { AddressType } from "@cart-app/types";
import mapToRegisterDto from "@helpers/map-to-register-dto";
import useAuth from "@hooks/useAuth";
import {
  RegistrationFormTypeEnum,
  registrationFormSchema,
  type RegistrationFormSchemaProps,
} from "@validation/registrationForm";
import AddressInformation from "../AddressInformation";
import PaymentInformation from "../PaymentInformation";
import PersonalInformation from "../PersonalInformation";

const RegistrationForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      formType: RegistrationFormTypeEnum.PersonalInformation,
    },
  });

  const { watch, getValues, handleSubmit } = formMethods;

  const { register: registerMutation } = useAuth();

  const formType = watch("formType");
  const formTypeIsPersonalInformation =
    formType === RegistrationFormTypeEnum.PersonalInformation;
  const formTypeIsShippingAddress =
    formType === RegistrationFormTypeEnum.Address;
  const formTypeIsPaymentInformation =
    formType === RegistrationFormTypeEnum.PaymentInformation;

  function setFormType(formType: RegistrationFormTypeEnum) {
    formMethods.setValue("formType", formType);
  }

  function handleNextFormType() {
    switch (formType) {
      case RegistrationFormTypeEnum.PersonalInformation:
        setFormType(RegistrationFormTypeEnum.Address);
        formMethods.setValue("shippingAddress", {
          street: "",
          city: "",
          country: "",
          zipcode: "",
          type: AddressType.SHIPPING,
        });

        formMethods.setValue("billingAddress", {
          street: "",
          city: "",
          country: "",
          zipcode: "",
          type: AddressType.BILLING,
        });
        break;
      case RegistrationFormTypeEnum.Address:
        setFormType(RegistrationFormTypeEnum.PaymentInformation);
        break;
      case RegistrationFormTypeEnum.PaymentInformation: {
        const values = getValues() as RegistrationFormSchemaProps;
        registerMutation.mutate(mapToRegisterDto(values));
        break;
      }
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleNextFormType)}>
        {formTypeIsPersonalInformation && <PersonalInformation />}
        {formTypeIsShippingAddress && <AddressInformation />}
        {formTypeIsPaymentInformation && <PaymentInformation />}

        <button type="submit">
          {formTypeIsPaymentInformation ? "Submit" : "Next"}
        </button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
