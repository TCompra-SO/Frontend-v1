import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function createChatService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.createChat
    }`,
    type: "CH-CR-CH",
  };
}

export function getChatService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getChat
    }`,
    type: "CH-GE-CH",
  };
}

export function createChatMessageService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.createMessage
    }`,
    type: "CH-CR-ME",
  };
}

export function setChatMessagesAsReadService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.readMessages
    }`,
    type: "CH-RE-ME",
  };
}

export function getChatMessagesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getMessages
    }`,
    type: "CH-GE-MES",
  };
}

export function getChatMessageService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getMessage
    }`,
    type: "CH-GE-ME",
  };
}

export function getChatListService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getChatUsersData
    }`,
    type: "CH-GE-US",
  };
}

export function changeStateConnectionService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.changeStateConnection
    }`,
    type: "CH-CH-CO",
  };
}
