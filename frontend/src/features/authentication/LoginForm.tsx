import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './LoginForm.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useLogin } from './useLogin';
import { LoginUser } from '../../services/types';

function LoginForm() {
  const { loginApi, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginUser>();

  const onSubmit: SubmitHandler<LoginUser> = ({ email, password }) => {
    loginApi({ email, password }, { onSettled: () => reset });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <FormRow
        label='Email address'
        childrenId='email'
        error={errors?.email?.message}
      >
        <input
          className={styles.input}
          type='email'
          id='email'
          autoComplete='username'
          disabled={isLoading}
          {...register('email', { required: 'Email is required' })}
        />
      </FormRow>
      <FormRow
        label='Password'
        childrenId='password'
        error={errors?.password?.message}
      >
        <input
          className={styles.input}
          type='password'
          id='password'
          autoComplete='username'
          disabled={isLoading}
          {...register('password', { required: 'Password is required' })}
        />
      </FormRow>
      <Button type='primary' disabled={isLoading}>
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
