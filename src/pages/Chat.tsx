import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody/ChatBody";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import { useState } from "react";

const chatElements: ChatListData[] = [
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xx",
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xrrfe4x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    userOnline: true,
    requirementId: "x4445x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xxewer",
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xgfgx",
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "wexx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xghx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xfdsfx",
  },
];

const chatMessages: ChatMessage[] = [
  {
    isInputMsg: false,
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    time: "2024-11-20T15:24:00.000Z",
    read: true,
  },
  {
    isInputMsg: true,
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    time: "2024-11-20T15:25:00.000Z",
    read: true,
  },
  {
    isInputMsg: true,
    message: "El costo es de $500 mensuales",
    read: true,
    time: "2024-11-20T15:26:00.000Z",
  },
  {
    isInputMsg: false,
    time: "2024-11-20T15:27:00.000Z",
    read: true,
    images: [
      "https://dummyimage.com/250/ff3fff/000000",
      "https://dummyimage.com/250/ff3ff1/000000",
      "https://dummyimage.com/250/af3ff1/000000",
      // "https://dummyimage.com/250/ff3f21/000000",
      // "https://dummyimage.com/250/aa3ff1/000000",
    ],
  },
  {
    isInputMsg: true,
    time: "2024-11-20T15:28:00.000Z",
    read: true,
    images: ["https://dummyimage.com/250/ff3fff/000000"],
  },
  {
    isInputMsg: true,
    time: "2024-11-20T15:28:00.000Z",
    read: true,
    images: ["https://dummyimage.com/250/ff3fff/000000"],
  },
  {
    isInputMsg: false,
    time: "2024-11-20T15:29:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
  },
  {
    isInputMsg: true,
    time: "2024-11-20T15:30:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
  },
];

export default function Chat() {
  const { t } = useTranslation();
  const [chatList, setChatList] = useState(chatElements);
  const [chatMsgs, setChatMsgs] = useState(chatMessages);
  const [isChatOpened, setIsChatOpened] = useState(true);
  const [currentChat, setCurrentChat] = useState<ChatListData | null>(null);

  function handleCloseChat() {
    setCurrentChat(null);
    setIsChatOpened(false);
  }

  function handleClickOnChatItem(item: ChatListData) {
    setCurrentChat(item);
    setIsChatOpened(true);
    console.log(item);
  }

  return (
    <>
      <ContentHeader
        title={t("chatSection")}
        icon={<i className="fa-regular fa-comment c-default"></i>}
      />
      <div className="gap-20 modulo-chat">
        <ChatList chatList={chatList} onClickOnItem={handleClickOnChatItem} />
        {isChatOpened && currentChat ? (
          <ChatBody
            chatData={currentChat}
            onCloseChat={handleCloseChat}
            messages={chatMsgs}
          />
        ) : (
          <div className="card-white mch-2 t-flex j-conten j-items f-column">
            <img
              src="/src/assets/images/chat.svg"
              alt=""
              className="chat-pre"
            />
            <div className="pre-chat">
              <div className="info-chat1">{`${t("appName")} ${t(
                "keepsYouConnected"
              )}`}</div>
              <div className="info-chat2">{t("chatText")}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}