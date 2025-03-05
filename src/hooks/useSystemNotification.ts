//Notificaciones generadas por usuario logueado después de realizar las siguientes acciones:

import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  Action,
  RequirementType,
  SystemNotificationType,
} from "../utilities/types";
import { BasicNotificationData } from "../models/MainInterfaces";
import { useEffect, useState } from "react";

type SystemNotificationMap = {
  [SystemNotificationType.MAKE_OFFER]: (
    reqName: string
  ) => BasicNotificationData;
  [SystemNotificationType.CERTIFICATE_COMPANY]: (
    rejected: boolean
  ) => BasicNotificationData;
  [SystemNotificationType.CANCEL_MY_OFFER]: (
    reqName: string,
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.FINISH_OFFER]: (
    confirmation: boolean,
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.DISPUTE_OFFER_CREATOR]: (
    offerName: string,
    creatorReqName: string
  ) => BasicNotificationData;
  [SystemNotificationType.DISPUTE_REQ_CREATOR]: (
    reqName: string,
    creatorOfferName: string,
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.CANCEL_AN_OFFER]: (
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.FINISH_REQUIREMENT]: (
    confirmation: boolean,
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.SELECT_OFFER]: (
    type: RequirementType
  ) => BasicNotificationData;
  [SystemNotificationType.RECEIVED_DOCS_FOR_CERT]: () => BasicNotificationData;
};

export default function useSystemNotification() {
  const mainSenderName = useSelector((state: MainState) => state.mainUser.name);
  const userSenderName = useSelector((state: MainState) => state.user.name);
  const [senderName, setSenderName] = useState(
    `${userSenderName}${
      userSenderName !== mainSenderName ? ` (${mainSenderName})` : ""
    }`
  );

  useEffect(() => {
    setSenderName(
      `${userSenderName}${
        userSenderName !== mainSenderName ? ` (${mainSenderName})` : ""
      }`
    );
  }, [mainSenderName, userSenderName]);

  const notifications: SystemNotificationMap = {
    [SystemNotificationType.MAKE_OFFER]: (reqName) => ({
      title: `Nueva oferta para ${reqName}`,
      body: `Tienes una oferta de ${senderName}, ¡revísala ahora!`,
      action: Action.VIEW_REQUIREMENT,
    }),

    [SystemNotificationType.CERTIFICATE_COMPANY]: (confirmation) => ({
      title: `Certificación ${!confirmation ? "rechazada" : "aceptada"}`,
      body: !confirmation
        ? `${senderName} acaba de rechazar tus documentos de certificación.`
        : `${senderName} te acaba de certificar.`,
      action: Action.VIEW_CERTIFICATION,
    }),

    [SystemNotificationType.CANCEL_MY_OFFER]: (reqName, type) => ({
      title: `Orden de ${
        type === RequirementType.SALE ? "venta" : "compra"
      } cancelada`,
      body: `La orden de ${
        type === RequirementType.SALE ? "venta" : "compra"
      } para ${reqName} fue cancelada`,
      action: Action.VIEW_REQUIREMENT,
    }),

    [SystemNotificationType.FINISH_OFFER]: (confirmation, type) => ({
      title:
        type === RequirementType.GOOD
          ? `Envío ${confirmation ? "confirmado" : "no realizado"}`
          : type === RequirementType.SERVICE
          ? `Servicio ${confirmation ? "realizado" : "no realizado"}`
          : `Recepción ${confirmation ? "confirmada" : "no confirmada"}`,
      body:
        type === RequirementType.GOOD
          ? `${senderName} indicó que ${
              confirmation ? "" : "no"
            } envió su requerimiento.`
          : type === RequirementType.SERVICE
          ? `${senderName} indicó que ${
              confirmation ? "prestó" : "no prestó"
            } el servicio.`
          : `${senderName} ${
              confirmation
                ? "confirmó la recepción del requerimiento."
                : "indicó que no recibió el requerimiento"
            }`,
      action: Action.VIEW_REQUIREMENT,
    }),

    [SystemNotificationType.DISPUTE_OFFER_CREATOR]: (
      offerName,
      creatorReqName
    ) => ({
      title: `Nueva disputa`,
      body: `Tienes una disputa con ${creatorReqName} por tu oferta ${offerName}`,
      action: Action.VIEW_HISTORY,
    }),

    [SystemNotificationType.DISPUTE_REQ_CREATOR]: (
      reqName,
      creatorOfferName,
      type
    ) => ({
      title: `Nueva disputa`,
      body: `Tienes una disputa con ${creatorOfferName} por tu ${
        type === RequirementType.SALE ? "liquidación" : "requerimiento"
      } ${reqName}`,
      action: Action.VIEW_HISTORY,
    }),

    [SystemNotificationType.CANCEL_AN_OFFER]: (type) => ({
      title: `Orden de ${
        type === RequirementType.SALE ? "venta" : "compra"
      } cancelada`,
      body: `${senderName} canceló tu oferta y orden de ${
        type === RequirementType.SALE ? "venta" : "compra"
      }.`,
      action: Action.VIEW_OFFER,
    }),

    [SystemNotificationType.FINISH_REQUIREMENT]: (confirmation, type) => ({
      title:
        type === RequirementType.GOOD
          ? `Recepción ${confirmation ? "confirmada" : "no confirmada"}`
          : type === RequirementType.SERVICE
          ? `Servicio ${confirmation ? "realizado" : "no realizado"}`
          : `Envío ${confirmation ? "confirmado" : "no confirmado"}`,
      body:
        type === RequirementType.GOOD
          ? `${senderName} ${
              confirmation
                ? "confirmó la recepción del requerimiento."
                : "indicó que no recibió el requerimiento"
            } `
          : type === RequirementType.SERVICE
          ? `${senderName} indicó que el servicio ${
              confirmation ? "" : "no"
            } fue realizado.`
          : `${senderName} indicó que ${
              confirmation ? "" : "no"
            } envió su requerimiento.`,
      action: Action.VIEW_OFFER,
    }),

    [SystemNotificationType.SELECT_OFFER]: (type) => ({
      title: `Oferta seleccionada`,
      body: `Has recibido una orden de ${
        type === RequirementType.SALE ? "venta" : "compra"
      } de ${senderName}.`,
      action: Action.DOWNLOAD_PURCHASE_ORDER,
    }),

    [SystemNotificationType.RECEIVED_DOCS_FOR_CERT]: () => ({
      title: `Solicitud de certificación`,
      body: `${senderName} ha enviado documentos para ser certificado.`,
      action: Action.VIEW_CERTIFICATION,
    }),
  };

  function getSystemNotification<T extends SystemNotificationType>(
    type: T
  ): SystemNotificationMap[T] {
    return notifications[type];
  }

  return {
    getSystemNotification,
  };
}

//eliminar oferta  en ver ofertas
