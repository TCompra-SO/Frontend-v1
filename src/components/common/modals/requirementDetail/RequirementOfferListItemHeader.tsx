import { Dropdown, Popover, Tooltip } from "antd";
import {
  BasicRateData,
  NotificationTargetData,
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
  RequirementDetailType,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ModalContent } from "../../../../models/Interfaces";
import ModalContainer from "../../../containers/ModalContainer";
import FrontImage from "../../utils/FrontImage";
import RateStarCount from "../../utils/RateStarCount";
import { requirementDetailContext } from "../../../../contexts/RequirementDetailContext";
import {
  useDownloadPdfOrder,
  useRedirectToChat,
} from "../../../../hooks/utilHooks";
import { primaryColor } from "../../../../utilities/colors";

interface RequirementOfferListItemProps {
  requirementId: string;
  requirementTitle: string;
  offer: Offer;
  style?: React.CSSProperties;
  onClose: () => any;
  showActions:
    | {
        type: RequirementDetailType.REQUIREMENT;
        requirement: Requirement;
        onSelectionSuccess: (offerId: string) => void;
        onCancelSuccess?: (offerId: string) => void;
        onRateCancel?: (offerId: string, showOption?: boolean) => void;
        notificationTargetData: NotificationTargetData;
        requirementTitle: string;
      }
    | { type: RequirementDetailType.ORDER; orderId?: string }
    | { type: RequirementDetailType.ADMIN };
  setDataModalSelectOffer?: (val: ModalContent) => void;
  setIsOpenModalSelectOffer?: (val: boolean) => void;
}

export default function RequirementOfferListItemHeader({
  ...props
}: RequirementOfferListItemProps) {
  const { t } = useTranslation();
  const { filters, filterNames } = useContext(requirementDetailContext);
  const { redirectToChat } = useRedirectToChat();
  const downloadPdfOrder = useDownloadPdfOrder();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const items = [];

  if (props.showActions.type != RequirementDetailType.ADMIN) {
    items.push({
      key: Action.CHAT,
      label: t("chat"),
      onClick: () => {
        redirectToChat({
          userName: props.offer.subUser?.name ?? props.offer.user.name,
          userId: props.offer.subUser?.uid ?? props.offer.user.uid,
          title: props.requirementTitle,
          requirementId: props.requirementId,
          type: props.offer.type,
          userImage: props.offer.subUser?.image ?? props.offer.user.image,
        });
      },
      icon: <i className="fa-regular fa-comment"></i>,
    });

    if (props.showActions.type != RequirementDetailType.ORDER) {
      if (props.offer.state == OfferState.WINNER)
        items.push({
          label: t(ActionLabel[Action.CANCEL_PURCHASE_ORDER]),
          key: Action.CANCEL_PURCHASE_ORDER,
          onClick: () => onOpenModal(Action.CANCEL_PURCHASE_ORDER),
          icon: <i className="fa-regular fa-ban"></i>,
        });
      if (
        props.offer.state == OfferState.ACTIVE &&
        props.showActions.requirement.state == RequirementState.PUBLISHED
      ) {
        items.push({
          label: t(ActionLabel[Action.SELECT_OFFER]),
          key: Action.SELECT_OFFER,
          onClick: () => onOpenModal(Action.SELECT_OFFER),
          icon: <i className="fa-regular fa-circle-check"></i>,
        });
      }
      if (
        props.offer.state == OfferState.CANCELED &&
        props.offer.canceledByCreator &&
        !props.offer.cancelRated
      )
        items.push({
          label: t(ActionLabel[Action.RATE_CANCELED]),
          key: Action.RATE_CANCELED,
          onClick: () => onOpenModal(Action.RATE_CANCELED),
          icon: <i className="fa-regular fa-star"></i>,
        });
    } else if (props.showActions.orderId) {
      const oi = props.showActions.orderId;
      items.push({
        label: t(ActionLabel[Action.DOWNLOAD_PURCHASE_ORDER]),
        key: Action.DOWNLOAD_PURCHASE_ORDER,
        onClick: () => {
          downloadPdfOrder(oi, props.offer.type);
        },
        icon: <i className="fa-regular fa-arrow-down-to-line"></i>,
      });
    }
  }

  function handleOnCloseModal() {
    setIsOpenModal(false);
  }

  function onRateCancelError(id: string) {
    if (props.showActions.type == RequirementDetailType.REQUIREMENT) {
      props.showActions.onRateCancel?.(id, true);
    }
  }

  function onOpenModal(action: Action) {
    if (props.showActions.type == RequirementDetailType.REQUIREMENT) {
      switch (action) {
        case Action.CANCEL_PURCHASE_ORDER:
          setDataModal({
            type: ModalTypes.CANCEL_PURCHASE_ORDER,
            data: {
              offerId: props.offer.key,
              requirementId: props.showActions.requirement.key,
              fromRequirementTable: false,
              canceledByCreator: false,
              onCancelSuccess: props.showActions.onCancelSuccess,
              rowId: props.showActions.requirement.key,
              type: props.offer.type,
              notificationTargetData: props.showActions.notificationTargetData,
              requirementTitle: props.showActions.requirementTitle,
            },
            action,
          });
          setIsOpenModal(true);
          break;
        case Action.SELECT_OFFER:
          props.setDataModalSelectOffer?.({
            type: ModalTypes.SELECT_OFFER,
            data: {
              offer: props.offer,
              requirement: props.showActions.requirement,
              onSuccess: props.showActions.onSelectionSuccess,
              filterNames,
              filters,
            },
            action,
          });
          props.setIsOpenModalSelectOffer?.(true);
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
              requirementOrOfferTitle: props.requirementTitle,
              rowId: props.requirementId,
              onExecute: props.showActions.onRateCancel,
              onError: onRateCancelError,
            },
            action,
          });
          setIsOpenModal(true);
          break;
        }
      }
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
                    ? props.offer.user.customerCount
                    : props.offer.user.sellerCount
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
          {props.offer.state == OfferState.DISPUTE && (
            <div className="badge-dispute">
              <i className="fa-regular fa-swords"></i>{" "}
              <span className="req-btn-info">{t("disputeOffer")}</span>
            </div>
          )}
          {props.offer.state == OfferState.FINISHED && (
            <div className="badge-finish">
              <i className="fa-regular fa-clipboard-list-check"></i>{" "}
              <span className="req-btn-info">{t("finishedOffer")}</span>
            </div>
          )}
          {props.showActions.type != RequirementDetailType.ADMIN && (
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              placement="bottomRight"
            >
              <Tooltip title={t("options")}>
                <i
                  className="fa-solid fa-ellipsis-vertical mas-acciones"
                  style={{ color: "#fff", background: primaryColor }}
                ></i>
              </Tooltip>
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}
