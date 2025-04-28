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

export function markChatMessagesAsReadService(): HttpService {
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
    type: "CH-GE-CL",
  };
}

export function getArchivedChatListService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getArchivedChats
    }`,
    type: "CH-GE-ACL",
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

export function searchChatService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.searchChat
    }`,
    type: "CH-SE-CH",
  };
}

export function archiveChatService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.archiveChat
    }`,
    type: "CH-AR-CH",
  };
}

export function getCountMessageUnReadService(userId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getCountMessageUnRead
    }${userId}`,
    type: "CH-CO-UN",
  };
}

export function getChatStateService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.chat}${
      ApiRoutes.chat.getChatState
    }`,
    type: "CH-GE-ST",
  };
}
