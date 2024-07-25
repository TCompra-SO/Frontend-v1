import { Modal } from "antd";
import { ModalTypes } from "../../utilities/types";
import RequirementDetail from "../section/requirements/requirementDetail/RequirementDetail";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";
import { ModalProps } from "antd/lib";
import RequirementOfferSummary from "../section/requirements/requirementOfferSummary/RequirementOfferSummary";
import RequirementModalRepublish from "../section/requirements/RequirementModalRepublish";
import { ModalContent } from "../../models/Interfaces";
import RatingCanceledModal from "../common/RatingCanceledModal";
import CancelPurchaseOrderModal from "../common/CancelPurchaseOrderModal";
import RatingModal from "../common/RatingModal";

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
        return <RequirementOfferSummary offer={props.content.data.offer} />;
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
            requirementOffertitle={props.content.data.requirementOffertitle}
            type={props.content.data.type}
            userClass={props.content.data.userClass}
            isOffer={props.content.data.isOffer}
            onClose={props.onClose}
          />
        );
      }
      // case ModalTypes.RATE_USER: {
      //   return (
      //     <RatingModal userClass={"c:/Users/ardn_/Documents/soluciones/Frontend-v1/src/utilities/types".CUSTOMER} type={RequirementType.GOOD} />
      //   )
      // }
    }
  }

  if (props.showFooter)
    return (
      <Modal
        {...props}
        destroyOnClose
        centered
        open={props.isOpen}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      >
        {getContent()}
      </Modal>
    );
  else
    return (
      <Modal
        {...props}
        destroyOnClose
        centered
        open={props.isOpen}
        footer={null}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      >
        {getContent()}
      </Modal>
    );
}
