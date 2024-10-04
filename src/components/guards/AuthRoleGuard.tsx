import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { MainState } from "../../models/Redux";
import { useSelector } from "react-redux";
import { pageRoutes } from "../../utilities/routes";
import { UserRoles } from "../../utilities/types";

interface AuthRoleGuardProps {
  children: ReactNode;
  allowedRoles: Record<UserRoles, boolean>;
}

export default function AuthRoleGuard({
  children,
  allowedRoles,
}: AuthRoleGuardProps) {
  const uid = useSelector((state: MainState) => state.user.uid);
  const typeId = useSelector((state: MainState) => state.user.typeID);

  if (!uid || typeId == UserRoles.NONE || !allowedRoles[typeId]) {
    return <Navigate to={pageRoutes.home} />;
  }

  return <>{children}</>;
}
