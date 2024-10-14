import { ModalTypes, ModalWidth } from "../../utilities/types";
import RequirementDetail from "../section/requirements/requirementDetail/RequirementDetail";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";
import { ModalProps } from "antd/lib";
import RequirementOfferSummary from "../section/requirements/requirementOfferSummary/RequirementOfferSummary";
import RequirementModalRepublish from "../section/requirements/RequirementModalRepublish";
import { ModalContent } from "../../models/Interfaces";
import RatingCanceledModal from "../common/RatingCanceledModal";
import CancelPurchaseOrderModal from "../common/CancelPurchaseOrderModal";
import RatingModal from "../common/RatingModal";
import ConfirmationModal from "../common/ConfirmationModal";
import InputEmailModal from "../common/InputEmailModal";
import NoContentModalContainer from "./NoContentModalContainer";
import OfferDetailModal from "../section/offers/offerDetail/OfferDetailModal";
import UserInfoModal from "../common/UserInfoModal";

interface ModalContainerProps extends ModalProps {
  content: ModalContent;
  isOpen: boolean;
  showFooter?: boolean;
  className?: string;
  maskClosable?: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function ModalContainer(props: ModalContainerProps) {
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
          />
        );
      }
      case ModalTypes.SELECT_OFFER: {
        return (
          <RequirementModalOfferSelected
            offer={props.content.data.offer}
            requirement={props.content.data.requirement}
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
          />
        );
      }
      case ModalTypes.RATE_CANCELED: {
        return (
          <RatingCanceledModal
            user={props.content.data.user}
            subUser={props.content.data.subUser}
            requirementOfferTitle={props.content.data.requirementOfferTitle}
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
            user={props.content.data.user}
            subUser={props.content.data.subUser}
            requirementOfferTitle={props.content.data.requirementOfferTitle}
            type={props.content.data.type}
            isOffer={props.content.data.isOffer}
          />
        );
      }
      case ModalTypes.CONFIRM: {
        return (
          <ConfirmationModal
            text={props.content.data.text}
            onClose={props.onClose}
            onAnswer={props.content.data.onAnswer}
            icon={props.content.data.icon}
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
        return <OfferDetailModal offer={props.content.data.offer} />;
      }
      case ModalTypes.USER_INFO: {
        return <UserInfoModal user={props.content.data.user} />;
      }
      case ModalTypes.ADD_CERTIFICATES: {
        return null;
      }
      case ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST: {
        return null;
      }
    }
  }

  return (
    <NoContentModalContainer
      {...props}
      width={ModalWidth[props.content.type]}
      open={props.isOpen}
      showFooter={props.showFooter}
    >
      {getContent()}
    </NoContentModalContainer>
  );
}
