import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { UserRoles } from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";

interface UserNameProps {
  onClick?: () => void;
}

export default function UserName(props: UserNameProps) {
  const { userRolesData } = useContext(ListsContext);
  const userName = useSelector((state: MainState) => state.user.name);
  const userImage = useSelector((state: MainState) => state.user.image);
  const role = useSelector((state: MainState) => state.user.typeID);

  const userNode = (
    <div
      className="user-opt text-truncate"
      style={{ maxWidth: "100%" }}
      onClick={props.onClick}
    >
      {userName}
    </div>
  );

  return (
    <>
      {userImage ? (
        <img src={userImage} alt="avatar" />
      ) : (
        <div className="avatar-l">
          {userName.length > 0 ? userName[0] : null}
        </div>
      )}
      {role != UserRoles.ADMIN && role != UserRoles.NONE ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {userNode}
          <div className="user-opt text-truncate" style={{ fontSize: "0.8em" }}>
            {userRolesData[role]?.value}
          </div>
        </div>
      ) : (
        userNode
      )}
    </>
  );
}
