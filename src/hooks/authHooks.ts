import { useNavigate } from "react-router-dom";
import {
  navigateToAfterLoggingOut,
  tokenKey,
  userDataKey,
} from "../utilities/globals";
import {
  mainUserInitialState,
  setFullMainUser,
  setMainUser,
} from "../redux/mainUserSlice";
import {
  setBaseUser,
  setFullUser,
  setIsLoggedIn,
  setUser,
  userInitialState,
} from "../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MainState } from "../models/Redux";
import { decryptData } from "../utilities/crypto";
import { getBaseUserForUserSubUser } from "../services/general/generalServices";
import { searchCompanyByNameService } from "../services/requests/authService";
import useApi from "./useApi";
import { useApiParams } from "../models/Interfaces";
import { DisplayUser } from "../models/MainInterfaces";
import { transformToDisplayUser } from "../utilities/transform";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const logoutKey: string = "logout";

  function logout() {
    if (isLoggedIn) {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userDataKey);
      dispatch(setFullMainUser(mainUserInitialState));
      dispatch(setFullUser(userInitialState));
      localStorage.setItem(logoutKey, Date.now().toString());
      localStorage.removeItem(logoutKey);
    }
  }

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === logoutKey) {
        dispatch(setIsLoggedIn(false));
        navigate(navigateToAfterLoggingOut);
      }
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch();
  // const logout = useLogout();

  // function checkToken() {
  //   try {
  //     // check if token has expired.refresh token
  //     // return true;
  //     throw Error;
  //   } catch (err) {
  //     console.log("error in token");
  //     logout();
  //     return false;
  //   }
  // }

  async function loadUserInfo() {
    const userData = localStorage.getItem(userDataKey);
    if (userData) {
      const userInfo = JSON.parse(decryptData(userData));
      // console.log(userInfo);
      // if (!checkToken()) return;
      if (userInfo) {
        localStorage.setItem(tokenKey, userInfo.token);
        dispatch(
          setUser({
            token: userInfo.token,
            dataUser: [
              {
                uid: userInfo.uid,
                name: userInfo.name,
                email: userInfo.email,
                typeID: userInfo.typeID,
                planID: userInfo.planID,
                type: userInfo.typeEntity,
              },
            ],
          })
        );
        const { user, subUser } = await getBaseUserForUserSubUser(
          userInfo.uid,
          true
        );
        if (user) {
          dispatch(setMainUser(user));
        }
        if (subUser) {
          dispatch(setBaseUser(subUser));
        }

        dispatch(setIsLoggedIn(user && subUser ? true : false));
        return;
      }

      dispatch(setIsLoggedIn(false));
      return;
    }

    dispatch(setIsLoggedIn(false));
  }

  return loadUserInfo;
}

export function useSearchCompanyByName() {
  const [companyList, setCompanyList] = useState<DisplayUser[]>([]);
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { loading, responseData, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setCompanyList(
          responseData.data?.map((item: any) => transformToDisplayUser(item))
        );
      } catch (err) {
        console.log(err);
      } finally {
        // showLoadingMessage(message, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  function searchCompanyByName(query: string) {
    setCompanyList([]);
    setApiParams({
      service: searchCompanyByNameService(query),
      method: "get",
    });
  }

  function clearList() {
    setCompanyList([]);
  }

  return {
    searchCompanyByName,
    clearList,
    loadingCompanyList: loading,
    companyList,
  };
}
