import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { MainState } from "../../models/Redux";
import { useSelector } from "react-redux";
import { UserRoles } from "../../utilities/types";
import { navigateToAfterLoggingOut } from "../../utilities/globals";

interface AuthRoleGuardProps {
  children: ReactNode;
  allowedRoles?: Record<UserRoles, boolean>;
}

export default function AuthRoleGuard({
  children,
  allowedRoles,
}: AuthRoleGuardProps) {
  const isLoading = useSelector(
    (state: MainState) => state.loadingUser.isLoading
  );
  const typeId = useSelector((state: MainState) => state.user.typeID);

  if (isLoading) {
    return null;
  }

  if (!isLoading && allowedRoles && !allowedRoles[typeId]) {
    return <Navigate to={navigateToAfterLoggingOut} />;
  }

  return <>{children}</>;
}
