import { createContext, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (newState: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void;
}

const initialValue = {
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
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
