import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRefreshToken } from './useRefreshToken';

export function useUser() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { isRefreshing, refreshData } = useRefreshToken();

  const { isLoading: isLoadingUser, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(accessToken),
    onError: () => {
      if (refreshData) {
        setAccessToken(refreshData?.access_token);
      }
    },
  });

  const isLoading = isLoadingUser || isRefreshing;

  return { isLoading, data };
}
