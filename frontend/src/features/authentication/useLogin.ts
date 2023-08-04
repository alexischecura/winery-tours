import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiAuth';
import { IErrorResponse, ILogin } from '../../services/types';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginApi, isLoading } = useMutation({
    mutationFn: ({ email, password }: ILogin) => loginUser({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error.message);
    },
  });
  return { loginApi, isLoading };
}
