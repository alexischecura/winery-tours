import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiAuth';
import { ErrorResponse } from '../../types/types';
import { toast } from 'react-hot-toast';
import { LoginUserType } from '../../types/userTypes';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function useLogin() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAccessToken } = useContext(AuthContext);

  const { mutate: loginApi, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginUserType) =>
      loginUser(email, password),
    onSuccess: (user) => {
      setIsLoggedIn(true);
      setAccessToken(user.access_token);
      navigate('/dashboard', { replace: true });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
  return { loginApi, isLoading };
}
