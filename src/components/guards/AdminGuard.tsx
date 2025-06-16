import { useSelector } from "react-redux";
import { MainState, UserState } from "../../models/Redux";
import { Navigate } from "react-router-dom";
import { navigateToAfterLoggingOut } from "../../utilities/globals";
import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard(props: AdminGuardProps) {
  const isLoading = useSelector(
    (state: MainState) => state.loadingUser.isLoading
  );
  const isSystemAdmin = useSelector((state: UserState) => state.isSystemAdmin);

  if (isLoading) {
    return null;
  } else if (!isSystemAdmin) return <Navigate to={navigateToAfterLoggingOut} />;
  return <>{props.children}</>;
}
