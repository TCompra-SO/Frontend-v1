import { decryptData } from "../../utilities/crypto";
import store from "../../redux/store";
import { setBaseUser, setIsLoggedIn, setUser } from "../../redux/userSlice";
import { getBaseUserForUserSubUser } from "./general";
import { setMainUser } from "../../redux/mainUserSlice";
import { tokenKey, userDataKey } from "../../utilities/globals";
import { setIsUserLoading } from "../../redux/loadingUserSlice";

export async function loadUserInfo() {
  store.dispatch(setIsUserLoading(true));
  const userData = localStorage.getItem(userDataKey);
  if (userData) {
    const userInfo = JSON.parse(decryptData(userData));
    // console.log(userInfo);
    if (userInfo) {
      localStorage.setItem(tokenKey, userInfo.token);
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
      store.dispatch(setIsUserLoading(false));
      store.dispatch(setIsLoggedIn(user && subUser ? true : false));
      return;
    }
    store.dispatch(setIsUserLoading(false));
    store.dispatch(setIsLoggedIn(false));
    return;
  }

  store.dispatch(setIsUserLoading(false));
  store.dispatch(setIsLoggedIn(false));
}
