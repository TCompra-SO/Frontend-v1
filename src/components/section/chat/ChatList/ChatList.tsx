import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { ChatListData } from "../../../../models/MainInterfaces";
import ChatListItem from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Flex, Spin, Tag } from "antd";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { DebouncedFunc } from "lodash";
import { getSearchString } from "../../../../utilities/globalFunctions";

const loadingSpinner: ReactNode = (
  <Flex justify="center">
    <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
  </Flex>
);

interface ChatListProps {
  chatList: ChatListData[];
  onClickOnItem: (item: ChatListData) => void;
  loadMoreChats: (archived: boolean, chatId?: string) => void;
  currentChat: ChatListData | null;
  hasMore: boolean;
  loadingList: boolean | undefined;
  loadingSearch: boolean | undefined;
  showArchivedChats: boolean;
  setShowArchivedChats: (val: boolean) => void;
  handleSearch: DebouncedFunc<(val: string) => void>;
  usingSearch: boolean;
  removeChatFromList: (chatId: string) => void;
  closeChat: () => void;
}

export default function ChatList(props: ChatListProps) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  /** Cargar más elementos en infinite scroller si no hay scroll */

  useEffect(() => {
    if (
      !props.usingSearch &&
      props.chatList.length &&
      props.hasMore &&
      chatContainerRef.current &&
      chatContainerRef.current.scrollHeight <=
        chatContainerRef.current.clientHeight
    )
      props.loadMoreChats(props.showArchivedChats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chatList]);

  /** Funciones */

  function onChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const temp = getSearchString(e.target.value);
    const prev = getSearchString(searchValue);
    if (typeof temp === "string") {
      if ((temp.length == 0 && prev !== temp) || temp.length) {
        props.closeChat();
        props.handleSearch(temp);
      }
    }
    setSearchValue(e.target.value);
  }

  return (
    <div className="card-white t-flex f-column gap-10 mch-1">
      <div className="t-flex gap-5 j-items chat-buscar">
        <InputContainer
          placeholder={`${t("search")}...`}
          prefix={<SearchOutlined />}
          className="form-transparent form-filter"
          onChange={onChangeSearchValue}
          allowClear
          value={searchValue}
        />
      </div>
      {!props.usingSearch && (
        <div className="t-flex gap-5 j-items chat-tab">
          <Tag.CheckableTag
            checked={false}
            style={{
              color: "#92acbf",
              cursor:
                props.loadingList || props.loadingSearch
                  ? "not-allowed"
                  : "pointer",
            }}
            onChange={() => {
              if (!(props.loadingList || props.loadingSearch))
                props.setShowArchivedChats(!props.showArchivedChats);
            }}
          >
            <i
              className={
                props.showArchivedChats
                  ? "fa-solid fa-globe"
                  : "fa-solid fa-box-archive"
              }
            ></i>{" "}
            {t(props.showArchivedChats ? "all" : "archivedPl")}
          </Tag.CheckableTag>
        </div>
      )}
      {props.chatList.length == 0 || props.loadingSearch ? (
        props.loadingList || props.loadingSearch ? (
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
          ref={chatContainerRef}
        >
          <InfiniteScroll
            dataLength={props.chatList.length}
            next={() => props.loadMoreChats(props.showArchivedChats)}
            hasMore={!props.usingSearch && props.hasMore}
            loader={loadingSpinner}
            scrollableTarget="scrollableDivChatList"
          >
            {props.chatList.map((item: ChatListData) => (
              <ChatListItem
                data={item}
                key={`${item.userId}-${item.requirementId}`}
                onClickOnItem={props.onClickOnItem}
                active={props.currentChat?.uid == item.uid}
                removeChatFromList={props.removeChatFromList}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
