//Notificaciones generadas por usuario logueado después de realizar las siguientes acciones:

import { NotificationData } from "../models/MainInterfaces";
import { Action, RequirementType } from "./types";

type NotData = Partial<NotificationData>;

export const SystemNotifications = {
  makeOffer: (reqName: string, senderName: string): NotData => ({
    title: `Nueva oferta para ${reqName}`,
    body: `Tienes una oferta de ${senderName}, ¡revísala ahora!`,
    action: Action.VIEW_REQUIREMENT,
  }),

  certificateCompany: (senderName: string, rejected: boolean): NotData => ({
    title: `Certificación ${rejected ? "rechazada" : "aceptada"}`,
    body: rejected
      ? `${senderName} acaba de de rechazar tus documentos de certificación.`
      : `${senderName} te acaba de certificar.`,
    action: Action.VIEW_CERTIFICATION,
  }),

  cancelMyOffer: (reqName: string, type: RequirementType): NotData => ({
    title: `Orden de ${
      type == RequirementType.SALE ? "venta" : "compra"
    } cancelada`,
    body: `La orden de ${
      type == RequirementType.SALE ? "venta" : "compra"
    } para ${reqName} fue cancelada`,
    action: Action.VIEW_REQUIREMENT,
  }),

  finishOffer: (
    senderName: string,
    confirmation: boolean,
    type: RequirementType
  ): NotData => ({
    title:
      type == RequirementType.GOOD
        ? `Envío ${confirmation ? "confirmado" : "no realizado"}`
        : type == RequirementType.SERVICE
        ? `Servicio ${confirmation ? "realizado" : "no realizado"}`
        : `Recepción ${confirmation ? "confirmada" : "no confirmada"}`,
    body:
      type == RequirementType.GOOD
        ? `${senderName} indicó que ${
            confirmation ? "" : "no"
          } envió su requerimiento.`
        : type == RequirementType.SERVICE
        ? `${senderName} indicó que ${
            confirmation ? "prestó" : "no prestó"
          } el servicio.`
        : `${senderName} ${
            confirmation ? "confirmó" : "negó"
          } la recepción del requerimiento.`,
    action: Action.VIEW_HISTORY, // r3v cambiar por view_ re?
  }),

  disputeOfferCreator: (
    offerName: string,
    creatorReqName: string
  ): NotData => ({
    title: `Nueva disputa`,
    body: `Tienes una disputa con ${creatorReqName} por tu oferta ${offerName}`,
    action: Action.VIEW_HISTORY, // r3v cambiar por view_ re?
  }),

  disputeReqCreator: (
    reqName: string,
    creatorOfferName: string,
    type: RequirementType
  ): NotData => ({
    title: `Nueva disputa`,
    body: `Tienes una disputa con ${creatorOfferName} por tu ${
      type == RequirementType.SALE ? "liquidación" : "requerimiento"
    } ${reqName}`,
    action: Action.VIEW_HISTORY, // r3v cambiar por view_ re?
  }),

  cancelAnOffer: (senderName: string, type: RequirementType): NotData => ({
    title: `Orden de ${
      type == RequirementType.SALE ? "venta" : "compra"
    } cancelada`,
    body: `${senderName} canceló tu oferta y orden de ${
      type == RequirementType.SALE ? "venta" : "compra"
    }.`,
    action: Action.VIEW_OFFER,
  }),

  finishRequirement: (
    senderName: string,
    confirmation: boolean,
    type: RequirementType
  ): NotData => ({
    title:
      type == RequirementType.GOOD
        ? `Recepción ${confirmation ? "confirmada" : "no confirmada"}`
        : type == RequirementType.SERVICE
        ? `Servicio ${confirmation ? "realizado" : "no realizado"}`
        : `Envío ${confirmation ? "confirmado" : "no confirmado"}`,
    body:
      type == RequirementType.GOOD
        ? `${senderName} ${
            confirmation ? "confirmó" : "negó"
          } la recepción del requerimiento.`
        : type == RequirementType.SERVICE
        ? `${senderName} indicó que el servicio ${
            confirmation ? "" : "no"
          } fue realizado.`
        : `${senderName} indicó que ${
            confirmation ? "" : "no"
          } envió su requerimiento.`,
    action: Action.VIEW_HISTORY, // r3v cambiar por view_ re?
  }),

  selectOffer: (senderName: string, type: RequirementType): NotData => ({
    title: `Oferta seleccionada`,
    body: `${senderName} te ha generado una orden de ${
      type == RequirementType.SALE ? "venta" : "compra"
    }.`,
    action: Action.DOWNLOAD_PURCHASE_ORDER,
  }),

  receivedDocsForCertification: (senderName: string): NotData => ({
    title: `Solicitud de certificación`,
    body: `${senderName} ha enviado documentos para ser certificado.`,
    action: Action.VIEW_CERTIFICATION,
  }),
};

//eliminar oferta  en ver ofertas
