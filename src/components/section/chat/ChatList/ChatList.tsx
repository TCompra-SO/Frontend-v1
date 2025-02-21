import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { ChatListData } from "../../../../models/MainInterfaces";
import ChatListItem from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Flex, Spin } from "antd";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { ReactNode } from "react";

const loadingSpinner: ReactNode = (
  <Flex justify="center">
    <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
  </Flex>
);

interface ChatListProps {
  chatList: ChatListData[];
  onClickOnItem: (item: ChatListData) => void;
  loadMoreChats: () => void;
  currentChat: ChatListData | null;
  hasMore: boolean;
  loading: boolean;
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
        props.loading ? (
          loadingSpinner
        ) : (
          <div className="multimedia-nula t-flex j-conten f-column gap-10 sin-chats">
            <i className="fa-regular fa-comment-slash fa-2x"></i>
            <div className="name-file">{t("noChats")}</div>
          </div>
        )
      ) : (
        <div
          id="scrollableDivChatList"
          className="t-flex f-column  scroll-y list-chats"
        >
          <InfiniteScroll
            dataLength={props.chatList.length}
            next={props.loadMoreChats}
            hasMore={props.hasMore}
            loader={loadingSpinner}
            scrollableTarget="scrollableDivChatList"
          >
            {props.chatList.map((item: ChatListData) => (
              <ChatListItem
                data={item}
                key={`${item.userId}-${item.requirementId}`}
                onClickOnItem={props.onClickOnItem}
                active={props.currentChat?.uid == item.uid}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
