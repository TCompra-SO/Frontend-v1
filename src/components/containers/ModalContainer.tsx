import { Action, ModalTypes, ModalWidth } from "../../utilities/types";
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
import OfferDetailModal from "../section/offers/OfferDetailModal";
import UserInfoModal from "../common/modals/UserInfoModal";
import AddCertificatesModal from "../common/modals/AddCertificatesModal";
import EditDocumentListToRequestModal from "../common/modals/EditDocumentListToRequestModal";
import ViewDocsReceivedCertificate from "../common/modals/ViewDocsReceivedCertificate";
import SelectDocumentsToSendCertificateModal from "../common/modals/SelectDocumentsToSendCertificateModal";
import SendMessageModal from "../common/modals/SendMessageModal";
import { useContext, useEffect, useState } from "react";
import useApi, { UseApiType } from "../../hooks/useApi";
import {
  useCancelOffer,
  useCancelRequirement,
} from "../../hooks/requirementHooks";
import { useShowLoadingMessage } from "../../hooks/utilHooks";
import { LoadingDataContext } from "../../contexts/LoadingDataContext";

interface ModalContainerProps extends ModalProps {
  content: ModalContent;
  isOpen: boolean;
  showFooter?: boolean;
  className?: string;
  maskClosable?: boolean;
  onClose: (e?: React.SyntheticEvent<Element, Event>) => any;
  loadingConfirm?: boolean;
}

export default function ModalContainer(props: ModalContainerProps) {
  const { showLoadingMessage } = useShowLoadingMessage();
  const [blockedIds, setBlockedIds] = useState<string[]>([]);
  const { updateIdAndActionQueue, deleteFromIdAndActionQueue } =
    useContext(LoadingDataContext);

  /** Para CancelPurchaseOrderModal */

  const useCancelRequirementHook = useCancelRequirement();
  const useCancelOfferHook = useCancelOffer();

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
    apiParams,
  });

  /** Acciones para solicitud */

  useEffect(() => {
    showLoadingMessage(useApiHook.loading);
    if (useApiHook.loading) {
      let id: string = "";
      switch (props.content.type) {
        case ModalTypes.REPUBLISH_REQUIREMENT:
          id = props.content.data.requirementId;
          break;
        case ModalTypes.RATE_USER:
        case ModalTypes.RATE_CANCELED:
          id = props.content.data.rowId;
          break;
        case ModalTypes.VIEW_DOCS_RECEIVED_CERT:
          id = props.content.data.data.key;
          break;
        case ModalTypes.SELECT_OFFER:
          id = props.content.data.requirement.key;
          break;
      }
      if (id) {
        setBlockedIds((prev) => [...prev, id]);
        updateIdAndActionQueue(id, props.content.action);
      }
    } else {
      let currentId: string = "";
      switch (props.content.type) {
        case ModalTypes.REPUBLISH_REQUIREMENT:
          currentId = props.content.data.requirementId;
          break;
        case ModalTypes.RATE_CANCELED:
        case ModalTypes.RATE_USER:
          currentId = props.content.data.rowId;
          break;
        case ModalTypes.VIEW_DOCS_RECEIVED_CERT:
          currentId = props.content.data.data.key;
          break;
        case ModalTypes.SELECT_OFFER:
          currentId = props.content.data.requirement.key;
          break;
      }
      if (currentId) {
        deleteFromIdAndActionQueue(currentId);
        setBlockedIds((prev) => prev.filter((id) => id != currentId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApiHook.loading]);

  useEffect(() => {
    if (apiParams.service) useApiHook.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  /** Modal de confirmación */

  useEffect(() => {
    if (
      props.content.type == ModalTypes.CONFIRM &&
      props.content.data.id &&
      props.content.action != Action.NONE
    ) {
      const id = props.content.data.id;
      if (props.loadingConfirm) {
        setBlockedIds((prev) => [...prev, id]);
        updateIdAndActionQueue(id, props.content.action);
      } else {
        setBlockedIds((prev) => prev.filter((idn) => idn != id));
        deleteFromIdAndActionQueue(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loadingConfirm]);

  /** CancelPurchaseOrderModal */

  useEffect(() => {
    if (
      props.content.type == ModalTypes.CANCEL_PURCHASE_ORDER &&
      (props.content.action == Action.CANCEL_REQUIREMENT ||
        props.content.action == Action.CANCEL)
    ) {
      const id = props.content.data.rowId;
      if (useCancelRequirementHook.loadingCancelRequirement) {
        setBlockedIds((prev) => [...prev, id]);
        updateIdAndActionQueue(id, props.content.action);
      } else {
        setBlockedIds((prev) => prev.filter((idn) => idn != id));
        deleteFromIdAndActionQueue(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCancelRequirementHook.loadingCancelRequirement]);

  useEffect(() => {
    if (
      props.content.type == ModalTypes.CANCEL_PURCHASE_ORDER &&
      (props.content.action == Action.CANCEL_OFFER ||
        props.content.action == Action.CANCEL)
    ) {
      const id = props.content.data.rowId;
      if (useCancelOfferHook.loadingCancelOffer) {
        setBlockedIds((prev) => [...prev, id]);
        updateIdAndActionQueue(id, props.content.action);
      } else {
        setBlockedIds((prev) => prev.filter((idn) => idn != id));
        deleteFromIdAndActionQueue(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCancelOfferHook.loadingCancelOffer]);

  /** Realizar acción al cancelar exitosamente */

  useEffect(() => {
    if (
      props.content.type == ModalTypes.CANCEL_PURCHASE_ORDER &&
      useCancelOfferHook.responseDataCancelOffer
    )
      props.content.data.onCancelSuccess?.(props.content.data.offerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCancelOfferHook.responseDataCancelOffer]);

  useEffect(() => {
    if (
      props.content.type == ModalTypes.CANCEL_PURCHASE_ORDER &&
      useCancelRequirementHook.responseDataCancelReq
    )
      props.content.data.onCancelSuccess?.(props.content.data.offerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCancelRequirementHook.responseDataCancelReq]);

  /** Cleanup */

  useEffect(() => {
    return () => {
      blockedIds.forEach((id) => deleteFromIdAndActionQueue(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            setDataModalSelectOffer={
              props.content.selectOffer?.setDataModalSelectOffer
            }
            setIsOpenModalSelectOffer={
              props.content.selectOffer?.setIsOpenModalSelectOffer
            }
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
            useCancelRequirementHook={useCancelRequirementHook}
            useCancelOfferHook={useCancelOfferHook}
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
            filterNames={props.content.data.filterNames}
            filters={props.content.data.filters}
            {...commonModalProps}
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
            {...commonModalProps}
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
            onSuccess={props.content.data.onSuccess}
            onExecute={props.content.data.onExecute}
            onError={props.content.data.onError}
            {...commonModalProps}
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
            {...commonModalProps}
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
            {...commonModalProps}
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
            {...commonModalProps}
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
