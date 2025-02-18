import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { NotificationData } from "../models/MainInterfaces";
import {
  Action,
  RequirementType,
  RTNotificationType,
} from "../utilities/types";
import useShowNotification, { useDownloadPdfOrder } from "./utilHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import { isRequirementType } from "../utilities/globalFunctions";
import { pageRoutes } from "../utilities/routes";
import { useNavigate } from "react-router-dom";

const notifications: NotificationData[] = [
  {
    id: "1",
    title:
      "New Comment New Comment New Comment New Comment New Comment New Comment",
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
  const navigate = useNavigate();
  const { showRealTimeNotification } = useShowNotification();
  const { updateDetailedRequirementModalData, updateDetailedOfferModalData } =
    useContext(ModalsContext);
  const downloadPdfOrder = useDownloadPdfOrder();
  const [notificationList, setNotificationList] = useState<NotificationData[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  /** Conectar con socket */
  useEffect(() => {
    if (!notifSocketAPI) {
      notifSocketAPI = io(import.meta.env.VITE_NOTIF_SOCKET_URL);

      notifSocketAPI.on("connect", () => {
        console.log("Connected notificaciones");
      });

      // setTimeout(() => {
      //   showRealTimeNotification({
      //     type: RTNotificationType.NOTIFICATION,
      //     content: notifications[0],
      //     onClickCallback: redirectFromNotification,
      //   });
      // }, 3000);
      // setTimeout(() => {
      //   showRealTimeNotification({
      //     type: RTNotificationType.NOTIFICATION,
      //     content: notifications[1],
      //     onClickCallback: redirectFromNotification,
      //   });
      // }, 6000);
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

  /** Funciones */

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

  function redirectFromNotification(notification: NotificationData) {
    console.log(notification);
    const { result, val } = isRequirementType(notification.targetType);
    if (notification.action == Action.VIEW_REQUIREMENT && result && val) {
      updateDetailedRequirementModalData({
        requirement: undefined,
        requirementId: notification.targetId,
        requirementType: val,
      });
      navigate(pageRoutes.myRequirements);
    } else if (notification.action == Action.VIEW_OFFER && result && val) {
      updateDetailedOfferModalData({
        offerId: notification.targetId,
        offerType: val,
        offer: undefined,
      });
      navigate(pageRoutes.myOffers);
    } else if (
      notification.action == Action.DOWNLOAD_PURCHASE_ORDER &&
      result &&
      val
    ) {
      downloadPdfOrder(notification.targetId, val);
    }
  }

  return {
    notificationList,
    getMoreNotifications,
    resetNotificationList,
    notificationLoading: loading,
    redirectFromNotification,
  };
}
