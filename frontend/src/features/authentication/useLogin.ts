import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiAuth';
import { ErrorResponse } from '../../types/types';
import { toast } from 'react-hot-toast';
import { LoginUserType } from '../../types/userTypes';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginApi, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginUserType) =>
      loginUser(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
  return { loginApi, isLoading };
}
