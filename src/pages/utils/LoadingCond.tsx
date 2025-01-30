import { useSelector } from "react-redux";
import { MainState } from "../../models/Redux";
import LoadingPage from "./LoadingPage";
import { useEffect } from "react";

export default function LoadingCond() {
  const isLoading = useSelector((state: MainState) => state.loading.isLoading);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return <LoadingPage></LoadingPage>;
}
