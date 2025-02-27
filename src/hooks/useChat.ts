import { useState } from "react";
import {
  ChatListData,
  ChatMessage,
  ChatSocketData,
} from "../models/MainInterfaces";
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
    uid: "RJxx",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ1",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xrrfe4x",
    uid: "RJ1xrrfe4x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ2",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    userOnline: true,
    requirementId: "x4445x",
    uid: "RJ2x4445x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ3",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xxewer",
    uid: "RJ3xxewer",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ4",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xgfgx",
    uid: "RJ4xgfgx",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ5",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "wexx",
    uid: "RJ5wexx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ6",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xghx",
    uid: "RJ6xghx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ7",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xfdsfx",
    uid: "RJ7xfdsfx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ8",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xx",
    uid: "RJ8xx",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ9",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xrrfe4x",
    uid: "RJ9xrrfe4x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ10",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    userOnline: true,
    requirementId: "x4445x",
    uid: "RJ10x4445x",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ11",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xxewer",
    uid: "RJ11xxewer",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ12",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xgfgx",
    uid: "RJ12xgfgx",
  },
  {
    userImage: undefined,
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ13",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "wexx",
    uid: "RJ13wexx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ14",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xghx",
    uid: "RJ14xghx",
  },
  {
    userImage: "https://dummyimage.com/250/ffffff/000000",
    userName: "Rio Jimenez Salas del Carpio",
    userId: "RJ15",
    title: "Nombre del Requerimiento",
    lastMessage: "Mensaje de prueba para las",
    lastDate: "2024-11-20T19:33:58.001Z",
    numUnreadMessages: 10,
    requirementId: "xfdsfx",
    uid: "RJ15xfdsfx",
  },
];

const fullChatMessages: ChatMessage[] = [
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados. ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados, ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados, ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados. ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados, ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados, ¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-22T15:31:00.000Z",
    read: true,
    uid: "2x",
    chatId: "RJ1xrrfvve4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    timestamp: "2024-11-22T15:30:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    uid: "8",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-22T15:29:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    uid: "7",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    timestamp: "2024-11-22T15:28:00.000Z",
    read: true,
    images: ["https://dummyimage.com/250/ff3fff/000000"],
    uid: "6",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    timestamp: "2024-11-20T15:28:00.000Z",
    read: true,
    images: ["https://dummyimage.com/250/ff3fff/000000"],
    uid: "5",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-20T15:27:00.000Z",
    read: true,
    images: [
      "https://dummyimage.com/250/ff3fff/000000",
      "https://dummyimage.com/250/ff3ff1/000000",
      "https://dummyimage.com/250/af3ff1/000000",
    ],
    uid: "4",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message: "El costo es de $500 mensuales",
    read: true,
    timestamp: "2024-11-20T15:26:00.000Z",
    uid: "3",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "2",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "10",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "12",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "14",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-20T15:24:00.000Z",
    read: true,
    uid: "9",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-20T15:24:00.000Z",
    read: true,
    uid: "11",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-20T15:24:00.000Z",
    read: true,
    uid: "13",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-19T15:24:00.000Z",
    read: true,
    uid: "9a",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-19T15:24:00.000Z",
    read: true,
    uid: "1a",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    message:
      "Buenos días, estoy buscando información sobre el alquiler de un espacio en su almacén",
    timestamp: "2024-11-19T15:24:00.000Z",
    read: true,
    uid: "13a",
    chatId: "RJ1xrrfe4x",
  },
];

const chatMessages: ChatSocketData[] = [
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "2",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-20T15:27:00.000Z",
    read: true,
    images: [
      "https://dummyimage.com/250/ff3fff/000000",
      "https://dummyimage.com/250/ff3ff1/000000",
      "https://dummyimage.com/250/af3ff1/000000",
    ],
    uid: "4",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-20T15:29:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    uid: "7",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
];

export function useChat() {
  const [loadingChatList, setLoadingChatList] = useState(false);
  const [loadingChatMessages, setLoadingChatMessages] = useState(false);
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [hasMoreChatList, setHasMoreChatList] = useState(true);
  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const [hasMoreChatMessageList, setHasMoreChatMessageList] = useState(true);

  /** Funciones */

  function getMoreChats() {
    console.log("gettin more chats");
    setLoadingChatList(true);
    setTimeout(() => {
      if (chatList.length >= chatElements.length) setHasMoreChatList(false);
      else
        setChatList(
          chatList.length > 0
            ? chatList.concat(
                chatElements.slice(chatList.length, 10 + chatList.length)
              )
            : chatElements.slice(0, 10)
        );
      setLoadingChatList(false);
    }, 2000);
  }

  function getMoreChatMessages() {
    setLoadingChatMessages(true);
    setTimeout(() => {
      if (chatMessageList.length >= fullChatMessages.length)
        setHasMoreChatMessageList(false);
      else
        setChatMessageList(
          chatMessageList.length > 0
            ? chatMessageList.concat(
                fullChatMessages.slice(
                  chatMessageList.length,
                  10 + chatMessageList.length
                )
              )
            : fullChatMessages.slice(0, 10)
        );
      setLoadingChatMessages(false);
    }, 1000);
  }

  function resetChatList() {
    setChatList([]);
  }

  function resetChatMessageList() {
    setChatMessageList([]);
    setHasMoreChatMessageList(true);
  }

  return {
    resetChatList,
    chatList,
    loadingChatList,
    getMoreChats,
    loadingChatMessages,
    resetChatMessageList,
    chatMessageList,
    getMoreChatMessages,
    hasMoreChatList,
    hasMoreChatMessageList,
  };
}
