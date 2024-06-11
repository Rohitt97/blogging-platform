import React from "react";
import { useRouteMatch } from "../../hooks";
import { anonymousRoutes, publicRoutes } from "../../utils/routes";
import { useAuth } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";

export function Page({ PageComponent }: { PageComponent: any }) {
  const navigate = useNavigate();
  const isPublic = useRouteMatch(publicRoutes);
  const isAnonymous = useRouteMatch(anonymousRoutes);
  const { authUser } = useAuth();

  React.useEffect(() => {
    if (!isPublic) {
      if (isAnonymous) {
        if (authUser) {
          navigate("/");
        }
      } else if (!authUser) {
        navigate("/auth/signin");
      }
    }
  }, [isPublic, isAnonymous, authUser, navigate]);
  return (
    <React.Fragment>
      <PageComponent />
    </React.Fragment>
  );
}
