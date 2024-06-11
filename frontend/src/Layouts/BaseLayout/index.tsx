import { AuthProvider } from "../../components/AuthProvider";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
