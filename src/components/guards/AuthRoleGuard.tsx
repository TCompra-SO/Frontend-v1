import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { MainState } from "../../models/Redux";
import { useSelector } from "react-redux";
import { pageRoutes } from "../../utilities/routes";
import { UserRoles } from "../../utilities/types";

interface AuthRoleGuardProps {
  children: ReactNode;
  allowedRoles:
    | Record<UserRoles, boolean>
    | Record<string, Record<UserRoles, boolean>>;
}

export default function AuthRoleGuard({
  children,
  allowedRoles,
}: AuthRoleGuardProps) {
  const [isWaiting, setIsWaiting] = useState(true);
  // const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const typeId = useSelector((state: MainState) => state.user.typeID);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 300); // espera para obtener datos del usuario

    return () => clearTimeout(timer);
  }, []);

  if (isWaiting) {
    return null;
  }

  if (!allowedRoles[typeId]) {
    return <Navigate to={pageRoutes.home} />;
  }

  return <>{children}</>;
}
