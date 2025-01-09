import { Tooltip } from "antd";

interface SubUserNameProps {
  subUserName: string | undefined;
  small?: boolean;
}

export default function SubUserName(props: SubUserNameProps) {
  return (
    <>
      {props.subUserName && props.subUserName.length > 0 && (
        <Tooltip title={props.subUserName}>
          <div className={props.small ? "user-empresa-2" : "user-empresa"}>
            {props.subUserName[0].toLocaleUpperCase()}
          </div>
        </Tooltip>
      )}
    </>
  );
}
