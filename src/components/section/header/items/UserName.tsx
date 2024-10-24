import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

export default function UserName() {
  const userName = useSelector((state: MainState) => state.user.name);
  return (
    <>
      <div className="avatar-l">A</div>
      <div className="user-opt">{userName}</div>
    </>
  );
}
