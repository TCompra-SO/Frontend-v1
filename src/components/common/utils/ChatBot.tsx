import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatBodyMessage from "../../section/chat/ChatBody/ChatBodyMessage";
import { BasicChatMessage } from "../../../models/MainInterfaces";
import { generateShortId } from "../../../utilities/globalFunctions";
import InputContainer from "../../containers/InputContainer";
import { useGetBannedWords } from "../../../hooks/utilHooks";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import { sendToChatBot } from "../../../services/general/generalServices";
import { primaryColor } from "../../../utilities/colors";

interface ChatBotProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface ChatBotRef {
  scrollToBottom: () => void;
}

export const ChatBot = forwardRef<ChatBotRef, ChatBotProps>(function ChatBot(
  props,
  ref
) {
  const { t } = useTranslation();
  const { censorText } = useGetBannedWords();
  const userId = useSelector((state: MainState) => state.user.uid);
  const botId = "B01";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<BasicChatMessage[]>([
    {
      uid: generateShortId(),
      userId: botId,
      message: t("chatBotGreeting"),
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));

  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }

  function updatMessage(msgUid: string, error?: boolean) {
    setMessages((prevList) => {
      const index = prevList.findIndex((item) => item.uid == msgUid);
      if (index === -1) return prevList;
      const newList = [...prevList];
      newList[index] = { ...newList[index], waiting: false, error };
      return newList;
    });
  }

  async function sendMsg() {
    const msg = censorText(message.trim());
    if (msg) {
      setMessage("");
      scrollToBottom();
      const msgUid = generateShortId();
      const userMsg: BasicChatMessage = {
        uid: msgUid,
        userId,
        message: msg,
        waiting: true,
      };
      setMessages((prev) => [userMsg, ...prev]);
      const { reply, error } = await sendToChatBot(msg);
      if (reply !== null) {
        updatMessage(msgUid);
        if (reply) {
          const lines = reply
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => {
              const botMsg: BasicChatMessage = {
                uid: generateShortId(),
                userId: botId,
                message: line,
              };
              return botMsg;
            });
          lines.reverse();
          setMessages((prev) => [...lines, ...prev]);
        }
      } else if (error) {
        updatMessage(msgUid, true);
      }
    }
  }

  return (
    <div
      className="gap-5"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 225,
        maxHeight: 335,
      }}
    >
      <div
        className="chat-info t-flex gap-10 j-items"
        style={{
          background: primaryColor,
          padding: 10,
          borderRadius: 20,
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="chat-iu">
          <div className="usuario-chat text-truncate" style={{ color: "#fff" }}>
            {t("chat")}
          </div>
        </div>
        <div
          className="chat-close"
          style={{ fontSize: "inherit", color: "#fff" }}
          onClick={() => props.onClose()}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div
        className="card-white t-flex f-column gap-10"
        style={{
          padding: 10,
          borderRadius: 20,
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="t-flex f-column-reverse j-items conversacion">
          <div
            className="t-flex f-column-reverse mensajes-contenedor gap-5"
            style={{ width: "100%", maxHeight: "212px" }}
            ref={containerRef}
          >
            {messages.map((msg) => {
              const node = (
                <ChatBodyMessage
                  key={msg.uid}
                  message={{
                    data: msg,
                    isChatMessage: false,
                  }}
                />
              );
              return node;
            })}
          </div>
        </div>
        <div className="t-flex gap-10 j-items chat-buscar">
          <InputContainer
            type="text"
            className="form-transparent form-filter"
            placeholder={t("message")}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            onPressEnter={sendMsg}
          />
          <i
            className="fa-regular fa-paper-plane-top mensaje-send"
            onClick={sendMsg}
          ></i>
        </div>
      </div>
    </div>
  );
});
