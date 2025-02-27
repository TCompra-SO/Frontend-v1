import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  NotificationData,
  NotificationDataNoSender,
  NotificationSenderData,
} from "../models/MainInterfaces";
import {
  Action,
  CertificationTableType,
  RequirementType,
  RTNotificationType,
} from "../utilities/types";
import useShowNotification, { useDownloadPdfOrder } from "../hooks/utilHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import {
  getCertificationTableTypeSubRoute,
  getRequirementTypeSubRoute,
  isCertificationTableTypes,
  isRequirementType,
} from "../utilities/globalFunctions";
import { pageRoutes } from "../utilities/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";

const notifications: NotificationData[] = [
  {
    title:
      "Ver requerimiento Ver requerimiento Ver requerimiento Ver requerimiento",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    timestamp: "2025-01-09T10:30:00.000Z",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    title: "Descargar orden de compra",
    body: "John Doe started following you.",
    timestamp: "2026-01-09T20:45:00.000Z",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.DOWNLOAD_PURCHASE_ORDER,
    targetId: "bm9PdrQ5mGhtdvbGEPg5",
    targetType: RequirementType.GOOD,
  },
  {
    title: "Ver oferta",
    body: "John Doe started following you.",
    timestamp: "2025-01-08T15:15:00.000Z",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_OFFER,
    targetId: "4T0umjVzDazp0rlK3wcm",
    targetType: RequirementType.GOOD,
  },
  {
    title: "Certificado recibido",
    body: "John Doe started following you.",
    timestamp: "2025-01-08T15:15:00.000Z",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_CERTIFICATION,
    targetId: "x8JXBNMUgdn4ihTedBL4",
    targetType: CertificationTableType.RECEIVED,
  },
  {
    title: "Certificado enviado",
    body: "John Doe started following you.",
    timestamp: "2025-01-08T15:15:00.000Z",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_CERTIFICATION,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: CertificationTableType.SENT,
  },
  {
    title: "New Follower",
    body: "John Doe started following you.",
    timestamp: "2025-01-08T15:15:00.000Z",
    senderImage: "https://dummyimage.com/300",
    senderId: "EOuyocZiTZVT91ZOo0rW",
    receiverId: "5AM89Ku44FQ9S7qrmwol",
    senderName: "Soluciones oonline sac",
    action: Action.VIEW_REQUIREMENT,
    targetId: "IXTsSCZ4weL9Mq82gSoN",
    targetType: RequirementType.GOOD,
  },
  {
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    timestamp: "2025-01-09T10:30:00.000Z",
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
  const senderName = useSelector((state: MainState) => state.mainUser.name);
  const uid = useSelector((state: MainState) => state.user.uid);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const mainSenderImage = useSelector(
    (state: MainState) => state.mainUser.image
  );
  const navigate = useNavigate();
  const { showRealTimeNotification } = useShowNotification();
  const {
    updateDetailedRequirementModalData,
    updateDetailedOfferModalData,
    updateViewCertificationData,
  } = useContext(ModalsContext);
  const downloadPdfOrder = useDownloadPdfOrder();
  const [notificationList, setNotificationList] = useState<NotificationData[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  /** Conectar con socket */
  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function connect() {
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
  }

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
    if (result && val !== null) {
      if (notification.action == Action.VIEW_REQUIREMENT) {
        updateDetailedRequirementModalData({
          requirement: undefined,
          requirementId: notification.targetId,
          requirementType: val,
        });
        navigate(
          `${pageRoutes.myRequirements}/${getRequirementTypeSubRoute(val)}`
        );
        return;
      } else if (notification.action == Action.VIEW_OFFER) {
        updateDetailedOfferModalData({
          offerId: notification.targetId,
          offerType: val,
          offer: undefined,
        });
        navigate(`${pageRoutes.myOffers}/${getRequirementTypeSubRoute(val)}`);
        return;
      } else if (notification.action == Action.DOWNLOAD_PURCHASE_ORDER) {
        downloadPdfOrder(notification.targetId, val);
        return;
      }
    }
    const { result: resultCert, val: valCert } = isCertificationTableTypes(
      notification.targetType
    );
    if (resultCert && valCert !== null) {
      if (notification.action == Action.VIEW_CERTIFICATION) {
        updateViewCertificationData({
          certificationId: notification.targetId,
          certificationTableType: valCert,
          certificationItem: undefined,
        });
        navigate(
          `${pageRoutes.certificates}/${getCertificationTableTypeSubRoute(
            valCert
          )}`
        );
      }
    }
  }

  function sendNotification(notification: NotificationDataNoSender) {
    if (notifSocketAPI) {
      const senderData: NotificationSenderData = {
        senderId: uid,
        senderName: senderName,
        senderImage: mainSenderImage,
      };
      const notif: NotificationData = { ...senderData, ...notification };
      console.log(notif);
      // notifSocketAPI.emit("eventName", notif);
    }
  }

  function disconnect() {
    if (notifSocketAPI) {
      console.log("Disconnected notificaciones");
      notifSocketAPI.disconnect();
      notifSocketAPI = null;
    }
    setNotificationList([]);
  }

  return {
    notificationList,
    getMoreNotifications,
    resetNotificationList,
    notificationLoading: loading,
    redirectFromNotification,
    sendNotification,
    disconnectNotificationSocket: disconnect,
    connectNotificationSocket: connect,
  };
}
