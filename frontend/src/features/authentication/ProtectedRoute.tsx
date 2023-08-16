import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import Spinner from '../../ui/Spinner';
import { AuthContext } from '../../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  const { isLoading, data } = useUser();

  if (isLoading) return <Spinner />;
  if (data && isLoggedIn) return children;
};

export default ProtectedRoute;
