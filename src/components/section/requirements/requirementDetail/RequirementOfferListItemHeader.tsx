import { Dropdown, Popover, Tooltip } from "antd";
import {
  BasicRateData,
  Offer,
  Requirement,
} from "../../../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  ModalTypes,
  OfferState,
  RequirementState,
  RequirementType,
  EntityType,
  RateStartCountType,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ModalContent } from "../../../../models/Interfaces";
import ModalContainer from "../../../containers/ModalContainer";
import FrontImage from "../../../common/utils/FrontImage";
import RateStarCount from "../../../common/utils/RateStarCount";

interface RequirementOfferListItemProps {
  requirementId: string;
  offer: Offer;
  style?: React.CSSProperties;
  onClose: () => any;
  showStateAndActions:
    | {
        show: true;
        requirement: Requirement;
        onSuccessfulSelection: (offerId: string) => void;
        onCancelSuccess?: (offerId: string) => void;
      }
    | { show: false };
}

export default function RequirementOfferListItemHeader({
  ...props
}: RequirementOfferListItemProps) {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const items = [
    {
      key: Action.CHAT,
      label: t("chat"),
      onClick: () => {
        console.log("go to chat");
      },
    },
  ];

  if (props.showStateAndActions.show) {
    if (props.offer.state == OfferState.WINNER)
      items.push({
        label: t(ActionLabel[Action.CANCEL_PURCHASE_ORDER]),
        key: Action.CANCEL_PURCHASE_ORDER,
        onClick: () => onOpenModal(Action.CANCEL_PURCHASE_ORDER), // r3v completar
      });
    if (
      props.offer.state == OfferState.ACTIVE &&
      props.showStateAndActions.requirement.state == RequirementState.PUBLISHED
    ) {
      items.push({
        label: t(ActionLabel[Action.SELECT_OFFER]),
        key: Action.SELECT_OFFER,
        onClick: () => onOpenModal(Action.SELECT_OFFER),
      });
    }
    if (
      props.offer.state == OfferState.CANCELED &&
      props.offer.canceledByCreator // r3v
    )
      items.push({
        label: t(ActionLabel[Action.RATE_CANCELED]),
        key: Action.RATE_CANCELED,
        onClick: () => onOpenModal(Action.RATE_CANCELED),
      });
  }

  function handleOnCloseModal() {
    setIsOpenModal(false);
  }

  function onOpenModal(action: Action) {
    if (props.showStateAndActions.show) {
      switch (action) {
        case Action.CANCEL_PURCHASE_ORDER:
          setDataModal({
            type: ModalTypes.CANCEL_PURCHASE_ORDER,
            data: {
              offerId: props.offer.key,
              requirementId: props.showStateAndActions.requirement.key,
              fromRequirementTable: false,
              canceledByCreator: false,
              onCancelSuccess: props.showStateAndActions.onCancelSuccess,
              rowId: props.showStateAndActions.requirement.key,
            },
            action,
          });
          setIsOpenModal(true);
          break;
        case Action.SELECT_OFFER:
          setDataModal({
            type: ModalTypes.SELECT_OFFER,
            data: {
              offer: props.offer,
              requirement: props.showStateAndActions.requirement,
              onSuccess: handleSuccessfulSelection,
            },
            action,
          });
          setIsOpenModal(true);
          break;
        case Action.RATE_CANCELED: {
          const data: BasicRateData = {
            uid: props.offer.key,
            title: props.offer.title,
            userId: props.offer.user.uid,
            userName: props.offer.user.name,
            userImage: props.offer.user.image,
          };
          setDataModal({
            type: ModalTypes.RATE_CANCELED,
            data: {
              basicRateData: data,
              type: props.offer.type,
              isOffer: true,
              requirementOrOfferId: props.requirementId,
              rowId: props.requirementId,
            },
            action,
          });
          setIsOpenModal(true);
        }
      }
    }
  }

  function handleSuccessfulSelection(offerId: string) {
    if (props.showStateAndActions.show) {
      props.showStateAndActions.onSuccessfulSelection(offerId);
      props.onClose();
    }
  }

  return (
    <>
      <ModalContainer
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleOnCloseModal}
      />
      <div className="t-flex head-oferta">
        <div className="t-flex oferta-titulo">
          <FrontImage small image={props.offer.user.image} isUser={true} />
          <div className="oferta-usuario">
            <div className="oferta-datos t-wrap">
              <div className="usuario-name text-truncate">
                <Tooltip
                  title={props.offer.user.name}
                  trigger={["click", "hover"]}
                >
                  {props.offer.user.name}
                </Tooltip>
              </div>

              {props.offer.subUser && props.offer.subUser.name.length > 0 && (
                <div className="user-empresa-2">
                  <Tooltip
                    title={props.offer.subUser.name}
                    trigger={["click", "hover"]}
                  >
                    {props.offer.subUser.name[0].toLocaleUpperCase()}
                  </Tooltip>
                </div>
              )}
              <div className="usuario-badge">
                {props.offer.user.typeEntity == EntityType.COMPANY
                  ? t("company")
                  : t("person")}
              </div>
              <RateStarCount
                score={
                  props.offer.type == RequirementType.SALE
                    ? props.offer.user.customerScore
                    : props.offer.user.sellerScore
                }
                count={
                  props.offer.type == RequirementType.SALE
                    ? props.offer.user.sellerCount
                    : props.offer.user.customerCount
                }
                type={RateStartCountType.OFFER_LIST}
              />
            </div>
            <div className="t-flex oferta-descripcion">
              <div className="text-truncate detalles-oferta">
                {props.offer.title}
              </div>
              <Popover
                trigger="click"
                title={
                  <div
                    style={{
                      marginBottom: props.offer.description ? "0" : "-8px",
                    }}
                  >
                    {props.offer.title}
                  </div>
                }
                content={props.offer.description}
              >
                <i className="fa-solid fa-ellipsis mas-detalle"></i>
              </Popover>
            </div>
          </div>
        </div>
        {props.showStateAndActions.show && (
          <div className="oferta-acciones">
            {props.offer.state == OfferState.WINNER && (
              <div className="badge-green">
                <i className="fa-regular fa-circle-check"></i>{" "}
                <span className="req-btn-info">{t("selectedOffer")}</span>
              </div>
            )}
            {props.offer.state == OfferState.CANCELED && (
              <div className="badge-warning">
                <i className="fa-regular fa-ban"></i>{" "}
                <span className="req-btn-info">{t("canceledOffer")}</span>
              </div>
            )}
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              placement="bottomRight"
            >
              <i className="fa-solid fa-ellipsis-vertical mas-acciones"></i>
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
}
