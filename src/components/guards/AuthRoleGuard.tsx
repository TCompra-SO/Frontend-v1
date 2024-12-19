import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { MainState } from "../../models/Redux";
import { useSelector } from "react-redux";
import { UserRoles } from "../../utilities/types";
import { navigateToAfterLoggingOut } from "../../utilities/globals";

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
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const typeId = useSelector((state: MainState) => state.user.typeID);

  useEffect(() => {
    if (isLoggedIn !== undefined) setIsWaiting(false);
  }, [isLoggedIn]);

  if (isWaiting) {
    return null;
  }

  if (!allowedRoles[typeId]) {
    return <Navigate to={navigateToAfterLoggingOut} />;
  }

  return <>{children}</>;
}
