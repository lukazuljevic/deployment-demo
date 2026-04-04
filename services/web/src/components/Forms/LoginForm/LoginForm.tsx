import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import FormInput from "@components/FormInput";
import useAuth from "@hooks/useAuth";
import { loginRoute } from "@routes/auth";
import welcomeRoute from "@routes/welcome";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { loginFormSchema } from "@validation/loginForm";
import { REDIRECT_TIMEOUT } from "common/constants/redirect";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const { login: loginMutation } = useAuth();
  const navigate = useNavigate();
  const routeApi = getRouteApi(loginRoute.fullPath);

  const search = routeApi.useSearch();

  const handleLogin = () => {
    const values = getValues();
    loginMutation.mutate(values, {
      onSuccess: () => {
        setTimeout(
          () =>
            navigate({ to: search.redirect || welcomeRoute.id, replace: true }),
          REDIRECT_TIMEOUT,
        );
      },
    });
  };

  return (
    <div className={styles.loginContainer}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className={styles.formInner}>
            <legend>Login Information</legend>

            <FormInput
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <FormInput
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </fieldset>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
