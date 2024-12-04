import dayjs from "dayjs";
import { ChatListData } from "../../../../models/MainInterfaces";
import { dateFormatChatList } from "../../../../utilities/globals";
import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/lib/menu/interface";
import { useTranslation } from "react-i18next";

interface ChatListItemProps {
  data: ChatListData;
  onClickOnItem: (item: ChatListData) => void;
}

export default function ChatListItem(props: ChatListItemProps) {
  const { t } = useTranslation();
  const dropdownItems: ItemType[] = [{ key: "ARC", label: t("archive") }];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key == "ARC") console.log("archivar");
  };

  return (
    <div
      className="card-chat t-flex gap-10 j-items"
      onClick={() => props.onClickOnItem(props.data)}
    >
      {props.data.userImage ? (
        <img src={props.data.userImage} className="img-chat" />
      ) : (
        <div className="inicial-chat">
          {props.data.userName.length > 0 ? props.data.userName[0] : null}
        </div>
      )}
      {props.data.userOnline && <div className="chat-online"></div>}
      <div className="chat-user">
        <div className="usuario-chat text-truncate">{props.data.userName}</div>
        <div className="requ-chat text-truncate">{props.data.title}</div>
        <div className="mensaje-chat text-truncate">
          {props.data.lastMessage}
        </div>
      </div>
      <div className="date-chat t-flex f-column">
        <Dropdown
          menu={{ items: dropdownItems, onClick: onClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="chat-fecha">
            <i className="fa-solid fa-ellipsis chat-opciones"></i>
          </div>
        </Dropdown>
        <div className="chat-fecha">
          {dayjs(props.data.lastDate).format(dateFormatChatList)}
        </div>
        {props.data.numUnreadMessages && (
          <div className="chat-notf-2">{props.data.numUnreadMessages}</div>
        )}
      </div>
    </div>
  );
}
