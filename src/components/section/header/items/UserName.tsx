import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

export default function UserName() {
  const userName = useSelector((state: MainState) => state.user.name);

  return (
    <>
      {/* <img src="/src/assets/images/user-default.svg" alt="avatar" /> */}
      <div className="avatar-l">{userName.length > 0 ? userName[0] : null}</div>
      <div className="user-opt">{userName}</div>
    </>
  );
}
