import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { SingUpUser } from '../../services/types';
import { useSignUp } from './useSignUp';
import SpinnerMini from '../../ui/SpinnerMini';

function SignUpForm() {
  const { signUnApi, isLoading, errors: serverErrors } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SingUpUser>();
  console.log(serverErrors);

  const onSubmit: SubmitHandler<SingUpUser> = ({
    fullName,
    email,
    password,
    passwordConfirm,
  }) => {
    signUnApi(
      { fullName, email, password, passwordConfirm },
      { onSettled: () => reset }
    );
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <FormRow
        label='First name'
        childrenId='fullName'
        error={errors?.fullName?.message}
      >
        <input
          className={styles.input}
          type='fullName'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', { required: 'Full name is required' })}
        />
      </FormRow>
      <FormRow
        label='Email address'
        childrenId='email'
        error={errors?.email?.message}
      >
        <input
          className={styles.input}
          type='email'
          id='email'
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
          min='8'
          disabled={isLoading}
          {...register('password', { required: 'Password is required' })}
        />
      </FormRow>
      <FormRow
        label='Password Confirm'
        childrenId='passwordConfirm'
        error={errors?.passwordConfirm?.message}
      >
        <input
          className={styles.input}
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          min='8'
          {...register('passwordConfirm', {
            required: 'Confirm your password',
          })}
        />
      </FormRow>
      <Button type='primary' disabled={isLoading}>
        {isLoading ? <SpinnerMini color='white' /> : 'Sign Up'}
      </Button>
    </form>
  );
}

export default SignUpForm;
