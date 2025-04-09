import dayjs from "dayjs";
import { ChatListData } from "../../../../models/MainInterfaces";
import { dateFormatChatList } from "../../../../utilities/globals";
import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/lib/menu/interface";
import { useTranslation } from "react-i18next";
import { useChatFunctions } from "../../../../hooks/chatHooks";
import { useState } from "react";

const archiveKey = "ARC";

interface ChatListItemProps {
  data: ChatListData;
  onClickOnItem: (item: ChatListData) => void;
  active?: boolean;
  removeChatFromList: (chatId: string) => void;
}

export default function ChatListItem(props: ChatListItemProps) {
  const { t } = useTranslation();
  const { archiveChat } = useChatFunctions(false);
  const [loading, setLoading] = useState(false);
  const dropdownItems: ItemType[] = [
    {
      key: archiveKey,
      label: t(props.data?.archive?.[0]?.state ? "unarchive" : "archive"),
    },
  ];

  const onClick: MenuProps["onClick"] = async ({ key, domEvent }) => {
    try {
      domEvent.stopPropagation();
      if (key == archiveKey) {
        setLoading(true);
        const success = await archiveChat({
          chatId: props.data.uid,
          archive: props.data?.archive?.[0]?.state ? false : true,
        });
        if (success) props.removeChatFromList(props.data.uid);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`card-chat t-flex gap-10 j-items ${
        props.active ? "active" : ""
      }`}
      onClick={() => props.onClickOnItem(props.data)}
    >
      {props.data.userImage ? (
        <img src={props.data.userImage} className="img-chat" />
      ) : (
        <div className="inicial-chat">
          {props.data.userName && props.data.userName.length > 0
            ? props.data.userName[0]
            : null}
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
          disabled={loading}
          menu={{ items: dropdownItems, onClick: onClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="chat-fecha" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-ellipsis chat-opciones"></i>
          </div>
        </Dropdown>
        <div className="chat-fecha">
          {dayjs(props.data.lastDate).format(dateFormatChatList)}
        </div>
        {props.data.numUnreadMessages && props.data.numUnreadMessages > 0 ? (
          <div className="chat-notf-2">{props.data.numUnreadMessages}</div>
        ) : null}
      </div>
    </div>
  );
}
