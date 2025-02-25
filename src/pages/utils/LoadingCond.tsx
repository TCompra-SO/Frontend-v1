import { useSelector } from "react-redux";
import { MainState } from "../../models/Redux";
import LoadingPage from "./LoadingPage";

export default function LoadingCond() {
  const isLoading = useSelector((state: MainState) => state.loading.isLoading);

  if (!isLoading) {
    return null;
  }

  return <LoadingPage></LoadingPage>;
}
