import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function useUser() {
  const { accessToken } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(accessToken),
  });

  return { isLoading, data };
}
