import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import FormInput from "@components/FormInput";
import useAuth from "@hooks/useAuth";
import { loginRoute } from "@routes/auth";
import { AppPaths } from "@routes/paths";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { loginFormSchema } from "@validation/loginForm";

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
        navigate({ to: search.redirect || AppPaths.HOME });
      },
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset>
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
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
