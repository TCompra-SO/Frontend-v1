import { Dropdown, Popover, Tooltip } from "antd";
import { Offer, Requirement } from "../../../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  ModalTypes,
  OfferState,
  RequirementState,
  RequirementType,
  EntityType,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { getScore } from "../../../../utilities/globalFunctions";
import { useState } from "react";
import { ModalContent } from "../../../../models/Interfaces";
import ModalContainer from "../../../containers/ModalContainer";
import FrontImage from "../../../common/FrontImage";

interface RequirementOfferListItemProps {
  offer: Offer;
  style?: React.CSSProperties;
  showStateAndActions:
    | { show: true; requirement: Requirement }
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
        onClick: () => onOpenModal(Action.CANCEL_PURCHASE_ORDER),
      });
    if (
      props.offer.state == OfferState.ACTIVE &&
      props.showStateAndActions.requirement.state == RequirementState.PUBLISHED
    )
      items.push({
        label: t(ActionLabel[Action.SELECT_OFFER]),
        key: Action.SELECT_OFFER,
        onClick: () => onOpenModal(Action.SELECT_OFFER),
      });
    if (props.offer.state == OfferState.CANCELED)
      // r3v creador de ofera canceló la oferta)
      items.push({
        label: t(ActionLabel[Action.RATE_CANCELED]),
        key: Action.RATE_CANCELED,
        onClick: () => onOpenModal(Action.RATE_CANCELED),
      });
  }

  function onOpenModal(action: Action) {
    if (props.showStateAndActions.show) {
      switch (action) {
        case Action.CANCEL_PURCHASE_ORDER:
          setIsOpenModal(true);
          setDataModal({
            type: ModalTypes.CANCEL_PURCHASE_ORDER,
            data: {
              offerId: props.offer.key,
              requirementId: props.showStateAndActions.requirement.key,
              fromRequirementTable: false,
            },
          });
          break;
        case Action.SELECT_OFFER:
          setIsOpenModal(true);

          setDataModal({
            type: ModalTypes.SELECT_OFFER,
            data: {
              offer: props.offer,
              requirement: props.showStateAndActions.requirement,
            },
          });
          break;
        case Action.RATE_CANCELED:
          setDataModal({
            type: ModalTypes.RATE_CANCELED,
            data: {
              user: props.offer.user,
              subUser: props.offer.subUser,
              requirementOffertitle: props.offer.title,
              type: props.offer.type,
              isOffer: true,
            },
          });
          setIsOpenModal(true);
      }
    }
  }

  function handleOnCloseModal() {
    setIsOpenModal(false);
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
                  : t("persona")}
              </div>
              <div className="usuario-puntuacion">
                <i className="fa-solid fa-star user-start"></i>
                <div className="valor-start-2">
                  {getScore(
                    props.offer.type == RequirementType.SALE
                      ? props.offer.user.customerScore
                      : props.offer.user.sellerScore
                  )}
                </div>
                <b className="user-cantidad">(41.5k)</b>
              </div>
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
        {props.showStateAndActions && (
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
