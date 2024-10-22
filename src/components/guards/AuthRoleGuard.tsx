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
  const uid = useSelector((state: MainState) => state.user.uid);
  const typeId = useSelector((state: MainState) => state.user.typeID);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 500); // espera para obtener datos del usuario

    return () => clearTimeout(timer);
  }, []);

  if (isWaiting) {
    return null;
  }

  if (!uid || typeId == UserRoles.NONE || !allowedRoles[typeId]) {
    return <Navigate to={pageRoutes.home} />;
  }

  return <>{children}</>;
}
