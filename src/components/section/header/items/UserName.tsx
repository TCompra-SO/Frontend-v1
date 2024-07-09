import { Avatar } from "antd";

export default function UserName() {
  const userName = "first-name last-name";
  return (
    <>
      <div className="text-truncate" style={{width: '130px'}}>
        <Avatar src="../../../../assets/images/logo-black.svg" size={30} style={{marginRight: '8px'}}/>
          {userName}
      </div>
    </>
  )
}
