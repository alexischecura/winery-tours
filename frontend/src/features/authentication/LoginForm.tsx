import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Form.module.css";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { LoginUserType, loginUserSchema } from "../../types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginForm() {
  const { loginApi, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginUserType>({ resolver: zodResolver(loginUserSchema) });

  const onSubmit: SubmitHandler<LoginUserType> = (credentials) => {
    loginApi(credentials, { onSettled: () => reset });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <FormRow
        label="Email address"
        childrenId="email"
        error={errors?.email?.message}
      >
        <input
          className={styles.input}
          type="email"
          id="email"
          autoComplete="username"
          disabled={isLoading}
          {...register("email")}
        />
      </FormRow>
      <FormRow
        label="Password"
        childrenId="password"
        error={errors?.password?.message}
      >
        <input
          className={styles.input}
          type="password"
          id="password"
          autoComplete="username"
          disabled={isLoading}
          {...register("password")}
        />
      </FormRow>
      <Button type="primary" disabled={isLoading}>
        {isLoading ? <SpinnerMini color="white" /> : "Log In"}
      </Button>
    </form>
  );
}

export default LoginForm;
