import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signUpUser } from '../../services/apiAuth';
import { FormError } from '../../types/types';
import { SingUpUserType } from '../../types/userTypes';

export function useSignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormError | null>(null);

  const { mutate: signUnApi, isLoading } = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
      passwordConfirm,
      termsAccepted,
    }: SingUpUserType) =>
      signUpUser({
        fullName,
        email,
        password,
        passwordConfirm,
        termsAccepted,
      }),
    onSuccess: () => {
      navigate('/verification', { replace: true });
    },
    onError: (err: FormError) => {
      setErrors(err);
      toast.error(err.message);
    },
  });
  return { signUnApi, isLoading, errors };
}
