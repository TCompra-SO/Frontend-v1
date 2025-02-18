import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { NotificationData } from "../models/Interfaces";
import { Action, RequirementType } from "../utilities/types";
import useShowNotification from "./utilHooks";

const notifications: NotificationData[] = [
  {
    id: "1",
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.DOWNLOAD_PURCHASE_ORDER,
    targetId: "bm9PdrQ5mGhtdvbGEPg5",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_OFFER,
    targetId: "4T0umjVzDazp0rlK3wcm",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "1",
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    senderImage: "https://dummyimage.com/300", // Replace with actual image URLs
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "1",
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    senderImage: "https://dummyimage.com/300", // Replace with actual image URLs
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "d",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "1",
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    senderImage: "https://dummyimage.com/300", // Replace with actual image URLs
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "1",
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    senderImage: "https://dummyimage.com/300", // Replace with actual image URLs
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    id: "2",
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
];

let notifSocketAPI: Socket | null = null;

export function useTCNotification() {
  const { showRealTimeNotification } = useShowNotification();
  const [notificationList, setNotificationList] = useState<NotificationData[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  function getMoreNotifications() {
    setLoading(true);
    setTimeout(() => {
      setNotificationList(
        notificationList.length > 0
          ? notificationList.concat(notificationList)
          : notifications.slice(0, 10)
      );
      setLoading(false);
    }, 1000);
  }

  function resetNotificationList() {
    setNotificationList([]);
  }

  useEffect(() => {
    if (!notifSocketAPI) {
      notifSocketAPI = io(import.meta.env.VITE_REQUIREMENTS_SOCKET_URL);

      notifSocketAPI.on("connect", () => {
        console.log("Connected notificaciones");
      });

      setTimeout(() => {
        // simulación
        // const newNotif = notifications[0];
        // setNotificationList([newNotif, ...notificationList]);
        showRealTimeNotification(notifications[0]);
      }, 3000);
      setTimeout(() => {
        // simulación
        // const newNotif = notifications[0];
        // setNotificationList([newNotif, ...notificationList]);
        showRealTimeNotification(notifications[1]);
      }, 6000);
    }
    return () => {
      if (notifSocketAPI) {
        console.log("Disconnected notificaciones");
        notifSocketAPI.disconnect();
        notifSocketAPI = null;
      }
      setNotificationList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notificationList,
    getMoreNotifications,
    resetNotificationList,
    notificationLoading: loading,
  };
}
