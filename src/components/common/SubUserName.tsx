import { Tooltip } from "antd";
import { BaseUser } from "../../models/MainInterfaces";

interface SubUserNameProps {
  subUser: BaseUser | undefined;
  small?: boolean;
}

export default function SubUserName(props: SubUserNameProps) {
  return (
    <>
      {props.subUser && props.subUser.name.length > 0 && (
        <Tooltip title={props.subUser.name}>
          <div className={props.small ? "user-empresa-2" : "user-empresa"}>
            {props.subUser.name[0].toLocaleUpperCase()}
          </div>
        </Tooltip>
      )}
    </>
  );
}
