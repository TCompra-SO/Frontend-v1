import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import {
  CantOfferMotives,
  RequirementType,
} from "../../../../../utilities/types";
import { useEffect, useState } from "react";

interface CantOfferMessageProps {
  offerId: string;
  motive: CantOfferMotives;
  type: RequirementType | undefined;
}

export default function CantOfferMessage(props: CantOfferMessageProps) {
  const { t } = useTranslation();
  const [mainText, setMainText] = useState("");
  const [optionalText, setOptionalText] = useState("");

  useEffect(() => {
    switch (props.motive) {
      case CantOfferMotives.ALREADY_MADE_OFFER:
        setMainText("alreadyMadeOffer");
        setOptionalText("ifYouWantToEliminateYourOfferClickOnDelete");
        break;
      case CantOfferMotives.NOT_LOGGED_IN:
        setMainText("mustLoginToOffer");
        setOptionalText("");
        break;
      case CantOfferMotives.IS_CREATOR:
        setMainText(
          `${
            props.type && props.type == RequirementType.SALE
              ? "yourSaleHas"
              : "yourRequirementHas"
          }`
        );
        setOptionalText("");
        break;
    }
  }, [props.motive]);

  function deleteOffer() {
    console.log("deleting", props.offerId);
  }

  return (
    <div className="t-flex f-column j-conten j-items oferta-check gap-10">
      <i className="fa-regular fa-clipboard-check fa-3x"></i>
      <div className="aviso-h">
        <div className="cantidad-estd">{t(mainText)}</div>
        {optionalText && <div className="detalles-estd">{t(optionalText)}</div>}
      </div>
      {props.motive == CantOfferMotives.ALREADY_MADE_OFFER && (
        <ButtonContainer
          className="btn btn-default btn-sm"
          icon={<i className="fa-regular fa-trash"></i>}
          onClick={deleteOffer}
        >
          {t("deleteOffer")}
        </ButtonContainer>
      )}
    </div>
  );
}
