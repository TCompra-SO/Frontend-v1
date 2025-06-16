import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

interface UserNameProps {
  onClick?: () => void;
}

export default function UserName(props: UserNameProps) {
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
      <div
        className="user-opt text-truncate"
        style={{ maxWidth: "100%" }}
        onClick={props.onClick}
      >
        {userName}
      </div>
    </>
  );
}
