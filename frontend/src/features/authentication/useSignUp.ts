import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../services/apiAuth';
import { SingUpUser, GenericResponse } from '../../services/types';
import { toast } from 'react-hot-toast';

export function useSignIn() {
  const navigate = useNavigate();

  const { mutate: signUnApi, isLoading } = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      email,
      nationalId,
      password,
      passwordConfirm,
    }: SingUpUser) =>
      signUpUser({
        firstName,
        lastName,
        email,
        nationalId,
        password,
        passwordConfirm,
      }),
    onSuccess: () => {
      navigate('/verification', { replace: true });
    },
    onError: (error: GenericResponse) => {
      toast.error(error.message);
    },
  });
  return { signUnApi, isLoading };
}
