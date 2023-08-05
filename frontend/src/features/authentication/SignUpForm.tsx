import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { SingUpUser } from '../../services/types';
import { useSignIn } from './useSignUp';

function SignUpForm() {
  const { signUnApi, isLoading } = useSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SingUpUser>();

  const onSubmit: SubmitHandler<SingUpUser> = ({
    firstName,
    lastName,
    nationalId,
    email,
    password,
    passwordConfirm,
  }) => {
    signUnApi(
      { firstName, lastName, nationalId, email, password, passwordConfirm },
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
        childrenId='firstName'
        error={errors?.firstName?.message}
      >
        <input
          className={styles.input}
          type='firstName'
          id='firstName'
          disabled={isLoading}
          {...register('firstName', { required: 'First name is required' })}
        />
      </FormRow>
      <FormRow
        label='Last Name'
        childrenId='lastName'
        error={errors?.lastName?.message}
      >
        <input
          className={styles.input}
          type='lastName'
          id='lastName'
          disabled={isLoading}
          {...register('lastName', { required: 'Last name is required' })}
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
        label='National ID'
        childrenId='nationalId'
        error={errors?.nationalId?.message}
      >
        <input
          className={styles.input}
          type='nationalId'
          id='nationalId'
          disabled={isLoading}
          {...register('nationalId', { required: 'Natinal ID is required' })}
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
          type='passwordConfirm'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'Confirm your password',
          })}
        />
      </FormRow>
      <Button type='primary' disabled={isLoading}>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
