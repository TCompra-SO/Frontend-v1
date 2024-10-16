import { decryptData } from "../../utilities/crypto";
import store from "../../redux/store";
import {
  setBaseUser,
  setFullUser,
  setUser,
  userInitialState,
} from "../../redux/userSlice";
import { getBaseUserForUserSubUser } from "./general";
import {
  mainUserInitialState,
  setFullMainUser,
  setMainUser,
} from "../../redux/mainUserSlice";
import { tokenKey, userDataKey } from "../../utilities/globals";

export async function loadUserInfo(): Promise<boolean> {
  const userData = localStorage.getItem(userDataKey);
  if (userData) {
    const userInfo = JSON.parse(decryptData(userData));
    console.log(userInfo);
    if (userInfo) {
      store.dispatch(
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
        store.dispatch(setMainUser(user));
      }
      if (subUser) {
        store.dispatch(setBaseUser(subUser));
      }
      return user && subUser ? true : false;
    }
    return false;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userDataKey);
  store.dispatch(setFullMainUser(mainUserInitialState));
  store.dispatch(setFullUser(userInitialState));
}
