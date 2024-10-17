import { shallowEqual, useSelector } from "react-redux";
import { MainState } from "../models/Redux";

export default function useIsLoggedIn() {
  const uid = useSelector((state: MainState) => state.user.uid, shallowEqual);
  const token = useSelector(
    (state: MainState) => state.user.token,
    shallowEqual
  );
  const isLoggedIn: boolean = uid && token ? true : false;
  return isLoggedIn;
}
