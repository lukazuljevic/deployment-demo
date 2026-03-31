import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  RegistrationFormTypeEnum,
  registrationFormSchema,
} from "@validation/registrationForm";
import PersonalInformation from "../PersonalInformation";

const RegistrationForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      formType: RegistrationFormTypeEnum.PersonalInformation,
    },
  });

  const {
    watch,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const formType = watch("formType");
  const formTypeIsPersonalInformation = formType === "personalInformation";
  const formTypeIsShippingAddress = formType === "address";
  const formTypeIsPaymentInformation = formType === "paymentInformation";

  function setFormType(formType: RegistrationFormTypeEnum) {
    formMethods.setValue("formType", formType);
  }

  function handleNextFormType() {
    switch (formType) {
      case "personalInformation":
        setFormType(RegistrationFormTypeEnum.Address);
        break;
      case "address":
        setFormType(RegistrationFormTypeEnum.PaymentInformation);
        break;
      case "paymentInformation":
      // console.log("submit", getValues());

      // toast({
      //   title: "Successfully registered!",
      //   description: "Your registration has been successfully submitted.",
      //   action: (
      //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      //   ),
      // });
      // break;
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleNextFormType)}>
        {formTypeIsPersonalInformation && <PersonalInformation />}
        {/* {formTypeIsShippingAddress && <ShippingAddress />}
        {formTypeIsPaymentInformation && <PaymentInformation />} */}

        <button type="submit">
          {formTypeIsPaymentInformation ? "Submit" : "Next"}
        </button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
