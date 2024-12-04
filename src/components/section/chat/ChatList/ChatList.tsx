import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useState } from "react";

const chatElements = [
  {
    userImage: "img/avatar.jpg", // Or "RJ" if there's no image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: "img/avatar.jpg",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
  },
  {
    userImage: "img/avatar.jpg",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: undefined, // No image
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: "img/avatar.jpg",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
  {
    userImage: "img/avatar.jpg",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "03/05/24",
    numUnreadMessages: 10,
  },
];

export default function ChatList() {
  const { t } = useTranslation();
  const [chatList, setChatList] = useState(chatElements);

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
      {chatList.length == 0 ? (
        <div className="multimedia-nula t-flex j-conten f-column gap-10 sin-chats">
          <i className="fa-regular fa-comment-slash fa-2x"></i>
          <div className="name-file">{t("noChats")}</div>
        </div>
      ) : (
        <div className="t-flex f-column scroll-y list-chats"></div>
      )}
    </div>
  );
}
