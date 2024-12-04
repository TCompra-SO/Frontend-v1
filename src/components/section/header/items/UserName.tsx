import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

export default function UserName() {
  const userName = useSelector((state: MainState) => state.user.name);
  const userImage = useSelector((state: MainState) => state.user.image);

  return (
    <>
      {userImage ? (
        <img src={userImage} alt="avatar" />
      ) : (
        <div className="avatar-l">
          {userName.length > 0 ? userName[0] : null}
        </div>
      )}
      <div className="user-opt">{userName}</div>
    </>
  );
}
