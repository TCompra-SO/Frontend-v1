import { ModalTypes, ModalWidth } from "../../utilities/types";
import RequirementDetail from "../section/requirements/requirementDetail/RequirementDetail";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";
import { ModalProps } from "antd/lib";
import RequirementOfferSummary from "../section/requirements/requirementOfferSummary/RequirementOfferSummary";
import RequirementModalRepublish from "../section/requirements/RequirementModalRepublish";
import {
  CommonModalProps,
  ModalContent,
  useApiParams,
} from "../../models/Interfaces";
import RatingCanceledModal from "../common/modals/RatingCanceledModal";
import CancelPurchaseOrderModal from "../common/modals/CancelPurchaseOrderModal";
import RatingModal from "../common/modals/RatingModal";
import ConfirmationModal from "../common/modals/ConfirmationModal";
import InputEmailModal from "../common/modals/InputEmailModal";
import NoContentModalContainer from "./NoContentModalContainer";
import OfferDetailModal from "../section/offers/offerDetail/OfferDetailModal";
import UserInfoModal from "../common/modals/UserInfoModal";
import AddCertificatesModal from "../common/modals/AddCertificatesModal";
import EditDocumentListToRequestModal from "../common/modals/EditDocumentListToRequestModal";
import ViewDocsReceivedCertificate from "../common/modals/ViewDocsReceivedCertificate";
import SelectDocumentsToSendCertificateModal from "../common/modals/SelectDocumentsToSendCertificateModal";
import SendMessageModal from "../common/modals/SendMessageModal";
import { useEffect, useState } from "react";
import useApi, { UseApiType } from "../../hooks/useApi";
import { App } from "antd";
import { showLoadingMessage } from "../../utilities/notification/showNotification";

interface ModalContainerProps extends ModalProps {
  content: ModalContent;
  isOpen: boolean;
  showFooter?: boolean;
  className?: string;
  maskClosable?: boolean;
  onClose: (e?: React.SyntheticEvent<Element, Event>) => any;
}

export default function ModalContainer(props: ModalContainerProps) {
  const { message } = App.useApp();

  /** Variables para solicitud */

  const [additionalApiParams, setAdditionalApiParams] = useState<UseApiType>({
    functionToExecute: () => {},
  });

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const useApiHook = useApi(apiParams, additionalApiParams);

  const [commonModalProps] = useState<CommonModalProps>({
    useApiHook: useApiHook,
    setApiParams: setApiParams,
    setAdditionalApiParams: setAdditionalApiParams,
  });

  /** Acciones para solicitud */

  useEffect(() => {
    showLoadingMessage(message, useApiHook.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApiHook.loading]);

  useEffect(() => {
    if (apiParams.service) useApiHook.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  /** Funciones */

  function getContent() {
    switch (props.content.type) {
      case ModalTypes.DETAILED_REQUIREMENT: {
        return (
          <RequirementDetail
            offerList={props.content.data.offerList}
            requirement={props.content.data.requirement}
            forPurchaseOrder={props.content.data.forPurchaseOrder}
            filters={props.content.data.filters}
            onClose={props.onClose}
          />
        );
      }
      case ModalTypes.CANCEL_PURCHASE_ORDER: {
        return (
          <CancelPurchaseOrderModal
            onClose={props.onClose}
            offerId={props.content.data.offerId}
            requirementId={props.content.data.requirementId}
            fromRequirementTable={props.content.data.fromRequirementTable}
            canceledByCreator={props.content.data.canceledByCreator}
            onCancelSuccess={props.content.data.onCancelSuccess}
          />
        );
      }
      case ModalTypes.SELECT_OFFER: {
        return (
          <RequirementModalOfferSelected
            offer={props.content.data.offer}
            requirement={props.content.data.requirement}
            onSucces={props.content.data.onSuccess}
            onClose={props.onClose}
          />
        );
      }
      case ModalTypes.OFFER_SUMMARY: {
        return (
          <RequirementOfferSummary
            offer={props.content.data.offer}
            user={props.content.data.user}
          />
        );
      }
      case ModalTypes.REPUBLISH_REQUIREMENT: {
        return (
          <RequirementModalRepublish
            requirementId={props.content.data.requirementId}
            onClose={props.onClose}
            type={props.content.data.type}
          />
        );
      }
      case ModalTypes.RATE_CANCELED: {
        return (
          <RatingCanceledModal
            basicRateData={props.content.data.basicRateData}
            type={props.content.data.type}
            isOffer={props.content.data.isOffer}
            onClose={props.onClose}
          />
        );
      }
      case ModalTypes.RATE_USER: {
        return (
          <RatingModal
            onClose={props.onClose}
            basicRateData={props.content.data.basicRateData}
            type={props.content.data.type}
            isOffer={props.content.data.isOffer}
            requirementOrOfferId={props.content.data.requirementOrOfferId}
          />
        );
      }
      case ModalTypes.CONFIRM: {
        return (
          <ConfirmationModal
            text={props.content.data.text}
            onClose={props.onClose}
            onAnswer={props.content.data.onAnswer}
            loading={props.content.data.loading}
            icon={props.content.data.icon}
            showOnlyAcceptButton={props.content.data.showOnlyAcceptButton}
          />
        );
      }
      case ModalTypes.INPUT_EMAIL: {
        return (
          <InputEmailModal
            text={props.content.data.text}
            onClose={props.onClose}
            onAnswer={props.content.data.onAnswer}
            title={props.content.title}
          />
        );
      }
      case ModalTypes.OFFER_DETAIL: {
        return (
          <OfferDetailModal
            offer={props.content.data.offer}
            basicRateData={props.content.data.basicRateData}
          />
        );
      }
      case ModalTypes.USER_INFO: {
        return <UserInfoModal user={props.content.data.user} />;
      }
      case ModalTypes.ADD_CERTIFICATES: {
        return (
          <AddCertificatesModal
            onDocumentAdded={props.content.data?.onDocumentAdded}
            onClose={props.onClose}
            {...commonModalProps}
          />
        );
      }
      case ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST: {
        return (
          <EditDocumentListToRequestModal
            text={props.content.data.text}
            onClose={props.onClose}
          />
        );
      }
      case ModalTypes.VIEW_DOCS_RECEIVED_CERT:
      case ModalTypes.VIEW_DOCS_SENT_CERT: {
        return (
          <ViewDocsReceivedCertificate
            data={props.content.data.data}
            docs={props.content.data.docs}
            readOnly={props.content.data.readonly}
            onClose={props.onClose}
          />
        );
      }
      case ModalTypes.SELECT_DOCS_CERT: {
        return (
          <SelectDocumentsToSendCertificateModal
            data={props.content.data.data}
            certificationId={props.content.data.certificationId}
            onClose={props.onClose}
            onRequestSent={props.content.data.onRequestSent}
            {...commonModalProps}
          />
        );
      }
      case ModalTypes.SEND_MESSAGE: {
        return (
          <SendMessageModal
            onClose={props.onClose}
            requirementId={props.content.data.requirementId}
            userId={props.content.data.userId}
          />
        );
      }
    }
  }

  return (
    <NoContentModalContainer
      {...props}
      destroyOnClose={true}
      width={ModalWidth[props.content.type]}
      open={props.isOpen}
      showFooter={props.showFooter}
    >
      {getContent()}
    </NoContentModalContainer>
  );
}
