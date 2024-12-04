import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { ChatListData } from "../../../../models/MainInterfaces";
import ChatListItem from "./ChatListItem";

interface ChatListProps {
  chatList: ChatListData[];
  onClickOnItem: (item: ChatListData) => void;
}

export default function ChatList(props: ChatListProps) {
  const { t } = useTranslation();

  return (
    <div className="card-white t-flex f-column gap-10 mch-1">
      <div className="t-flex gap-5 j-items chat-buscar">
        <InputContainer
          prefix={<i className="fa-solid fa-magnifying-glass"></i>}
          type="text"
          className="form-transparent form-filter"
          placeholder={t("search")}
        />
      </div>
      {props.chatList.length == 0 ? (
        <div className="multimedia-nula t-flex j-conten f-column gap-10 sin-chats">
          <i className="fa-regular fa-comment-slash fa-2x"></i>
          <div className="name-file">{t("noChats")}</div>
        </div>
      ) : (
        <div className="t-flex f-column scroll-y list-chats">
          {props.chatList.map((item: ChatListData) => (
            <ChatListItem
              data={item}
              key={`${item.userId}-${item.requirementId}`}
              onClickOnItem={props.onClickOnItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
