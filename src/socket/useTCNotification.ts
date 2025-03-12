import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  NotificationData,
  NotificationDataFromServer,
  NotificationDataNoSender,
  NotificationSenderData,
} from "../models/MainInterfaces";
import {
  Action,
  NotificationType,
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
import { SocketResponse } from "../models/Interfaces";
import { getNotifications } from "../services/general/generalServices";
import { notificationPageSize } from "../utilities/globals";

let notifSocketAPI: Socket | null = null;

export function useTCNotification() {
  const senderName = useSelector((state: MainState) => state.user.name);
  const mainSenderName = useSelector((state: MainState) => state.mainUser.name);
  const uid = useSelector((state: MainState) => state.user.uid);
  // const mainUid = useSelector((state: MainState) => state.mainUser.uid);
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
  const [notificationList, setNotificationList] = useState<
    NotificationDataFromServer[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        notifSocketAPI?.emit("joinRoom", `notification${uid}`);
      });

      notifSocketAPI.on("joinedRoom", (message) => {
        console.log(message);
      });

      notifSocketAPI.on("updateRoom", (payload: SocketResponse) => {
        console.log("notificación recibida:", payload);
        if (payload.dataPack.data && payload.dataPack.data.length > 0)
          showRealTimeNotification({
            type: RTNotificationType.NOTIFICATION,
            content: payload.dataPack.data[0] as NotificationDataFromServer,
            onClickCallback: redirectFromNotification,
          });
      });
    }
  }

  async function getMoreNotifications(page: number) {
    setLoading(true);
    const notificationData = await getNotifications(
      uid,
      page,
      notificationPageSize
    );
    if (notificationData.notifications) {
      if (notificationData.notifications.length > 0) {
        const newList = [
          ...notificationList,
          ...notificationData.notifications,
        ];
        setNotificationList(newList);
        if (newList.length < notificationPageSize) setHasMore(false);
      } else setHasMore(false);
    } else setHasMore(false);
    setLoading(false);
  }

  function resetNotificationList() {
    setNotificationList([]);
    setHasMore(true);
    setLoading(false);
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

  function getNotification(notification: NotificationDataNoSender) {
    if (notifSocketAPI && notification.receiverId) {
      const senderData: NotificationSenderData = {
        senderId: uid,
        senderName:
          senderName != mainSenderName
            ? `${senderName} (${mainSenderName})`
            : senderName,
        senderImage: mainSenderImage,
      };
      const notif: NotificationData = {
        ...senderData,
        ...notification,
        type: NotificationType.DIRECT,
      };
      return notif;
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
    getNotification,
    disconnectNotificationSocket: disconnect,
    connectNotificationSocket: connect,
    hasMore,
  };
}
