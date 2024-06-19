import { Avatar } from "antd";

export default function UserName() {
  const userName = "udme";
  return (
    <>
      <Avatar src="../../../../assets/images/logo-black.svg" size={30} style={{marginRight: '8px'}}/>
      {userName}
    </>
  )
}
