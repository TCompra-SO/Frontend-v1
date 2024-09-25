import { Tooltip } from "antd";
import { BaseUser } from "../../models/MainInterfaces";

interface SubUserNameProps {
  subUser?: BaseUser;
}

export default function SubUserName(props: SubUserNameProps) {
  return (
    <>
      {props.subUser && props.subUser.name.length > 0 && (
        <Tooltip title={props.subUser.name}>
          <div className="user-empresa">
            {props.subUser.name[0].toLocaleUpperCase()}
          </div>
        </Tooltip>
      )}
    </>
  );
}
