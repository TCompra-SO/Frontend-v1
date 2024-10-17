import { useNavigate } from "react-router-dom";
import { tokenKey, userDataKey } from "../utilities/globals";
import { mainUserInitialState, setFullMainUser } from "../redux/mainUserSlice";
import { setFullUser, userInitialState } from "../redux/userSlice";

import { useDispatch } from "react-redux";
import { pageRoutes } from "../utilities/routes";
import useIsLoggedIn from "./useIsLoggedIn";
import { useEffect, useState } from "react";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userDataKey);
    dispatch(setFullMainUser(mainUserInitialState));
    dispatch(setFullUser(userInitialState));
    setIsLoggingOut(true);
  };

  useEffect(() => {
    if (isLoggingOut && !isLoggedIn) {
      navigate(pageRoutes.home);
    }
  }, [isLoggingOut, isLoggedIn, navigate]);

  return logout;
}
