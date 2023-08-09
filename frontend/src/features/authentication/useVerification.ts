import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../services/apiAuth';
import { ErrorResponse } from '../../types/types';
import { toast } from 'react-hot-toast';

export function useVerification() {
  const navigate = useNavigate();

  const { mutate: verifyApi, isLoading } = useMutation({
    mutationFn: (verificationCode: string) => verifyUser(verificationCode),
    onSuccess: (data) => {
      navigate('/login', { replace: true });
      toast.success(data?.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
  return { verifyApi, isLoading };
}
