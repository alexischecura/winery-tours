import { createContext, useContext, useState } from 'react';
import { User } from '../types/userTypes';

interface Props {
  children?: React.ReactNode;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (newState: User) => void;
  accessToken: string | null;
  setAccessToken: (newState: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void;
}

const initialValue = {
  authUser: null,
  setAuthUser: () => {
    /* Empty */
  },
  accessToken: null,
  setAccessToken: () => {
    /* Empty */
  },
  isLoggedIn: false,
  setIsLoggedIn: () => {
    /* Empty */
  },
};

export const AuthContext = createContext<AuthContextType>(initialValue);

function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        setAccessToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
