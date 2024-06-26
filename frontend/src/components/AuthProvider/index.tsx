import React from "react";
import { AuthContext } from "./AuthContext";
import { AuthUser } from "../../types/auth-user";
import { deleteCookie, getCookie, setCookie } from "../../utils/helpers";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userCookie = getCookie("auth-user");

  const [state, setState] = React.useState<AuthUser | null>(
    userCookie ? JSON.parse(userCookie ?? "") : null
  );

  const setAuthUser = (user?: AuthUser) => {
    if (user) {
      setCookie("auth-user", JSON.stringify(user));
    } else {
      deleteCookie("auth-user");
    }
    setState(user ?? null);
  };

  const contextValue = {
    authUser: state,
    setAuthUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
