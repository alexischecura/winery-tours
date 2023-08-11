import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './Form.module.css';
import { useVerification } from './useVerification';
import { verifyUserSchema, VerifyUserType } from '../../types/userTypes';

function VerificationForm() {
  const { verificationCode } = useParams();
  const { verifyApi, isLoading } = useVerification();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<VerifyUserType>({ resolver: zodResolver(verifyUserSchema) });

  useEffect(() => {
    if (verificationCode) {
      reset({verificationCode})
      verifyApi(verificationCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<VerifyUserType> = ({ verificationCode }) => {
    verifyApi(verificationCode, { onSettled: () => reset });
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <FormRow
        label='Verification Code'
        childrenId='verificationCode'
        error={errors?.verificationCode?.message}
      >
        <input
          className={styles.input}
          type='text'
          id='verificationCode'
          disabled={isLoading}
          {...register('verificationCode')}
        />
      </FormRow>

      <Button type='primary' disabled={isLoading}>
        {isLoading ? <SpinnerMini color='white' /> : 'Verify User'}
      </Button>
    </form>
  );
}

export default VerificationForm;
