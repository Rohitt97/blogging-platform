import React from "react";
import { AuthUser } from "../../types/auth-user";

export type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: (user?: AuthUser) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  authUser: null,
  setAuthUser: (user?: AuthUser) => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};
