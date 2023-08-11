import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Form.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useSignUp } from './useSignUp';
import SpinnerMini from '../../ui/SpinnerMini';
import { singUpUserSchema, SingUpUserType } from '../../types/userTypes';

function SignUpForm() {
  const { signUnApi, isLoading, errors: serverErrors } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SingUpUserType>({
    resolver: zodResolver(singUpUserSchema),
  });

  const onSubmit: SubmitHandler<SingUpUserType> = ({
    fullName,
    email,
    password,
    passwordConfirm,
    termsAccepted,
  }) => {
    signUnApi(
      { fullName, email, password, passwordConfirm, termsAccepted },
      { onSettled: () => reset }
    );
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <FormRow
        label='Full name'
        childrenId='fullName'
        error={errors?.fullName?.message}
      >
        <input
          className={styles.input}
          type='fullName'
          id='fullName'
          disabled={isLoading}
          {...register('fullName')}
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
          {...register('email')}
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
          {...register('password')}
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
          {...register('passwordConfirm')}
        />
      </FormRow>
      <div className={styles.terms}>
        <div className={styles.termsInput}>
          <input
            type='checkbox'
            id='terms'
            className={styles.termsCheckbox}
            {...register('termsAccepted')}
          />
          <label htmlFor='terms'>
            I agree to the{' '}
            <a href='#' className={styles.termsLink}>
              terms & conditions
            </a>
          </label>
        </div>
        {errors?.termsAccepted?.message && (
          <span className={styles.termsError}>
            {errors?.termsAccepted?.message}
          </span>
        )}
      </div>
      <Button type='primary' disabled={isLoading}>
        {isLoading ? <SpinnerMini color='white' /> : 'Sign Up'}
      </Button>
    </form>
  );
}

export default SignUpForm;
