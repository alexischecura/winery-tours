import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';
import { refreshToken } from '../../services/apiAuth';
import { ErrorResponse } from '../../types/types';

export function useRefreshToken() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAccessToken } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const { isLoading: isRefreshing, data: refreshData } = useQuery({
    queryKey: ['refresh'],
    queryFn: refreshToken,
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
      setIsLoggedIn(false);
      setAccessToken('');
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      navigate('/login', { replace: true });
    },
  });

  return { isRefreshing, refreshData };
}
