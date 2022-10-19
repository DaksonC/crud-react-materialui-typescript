import { createContext, useCallback, useEffect, useMemo, useState, useContext} from "react"
import { AuthService } from "../services/api/auth/AuthService";
import { IAuthContextData, IChildrenProps } from "../services/interfaces";

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("App_accessToken");
    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem('APP_accessToken', JSON.stringify(result.access_token));
      setAccessToken(result.access_token);
    }

  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_accessToken');
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ logout: handleLogout, isAuthenticated, login: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);