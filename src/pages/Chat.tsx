import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody";

export default function Chat() {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader
        title={t("chatSection")}
        icon={<i className="fa-regular fa-comment c-default"></i>}
      />
      <div className="gap-20 modulo-chat">
        <ChatList />
        <ChatBody />
      </div>
    </>
  );
}
