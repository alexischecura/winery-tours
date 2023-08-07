import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signUpUser } from '../../services/apiAuth';
import { SingUpUser, SingUpError } from '../../services/types';

export function useSignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SingUpError | null>(null);

  const { mutate: signUnApi, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password, passwordConfirm }: SingUpUser) =>
      signUpUser({
        fullName,
        email,
        password,
        passwordConfirm,
      }),
    onSuccess: () => {
      navigate('/verification', { replace: true });
    },
    onError: (err: SingUpError) => {
      setErrors(err);
      toast.error(err.message);
    },
  });
  return { signUnApi, isLoading, errors };
}
