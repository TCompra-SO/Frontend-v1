import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";

import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { SyntheticEvent } from "react";
import { OfferFilterTypes } from "../../../../utilities/types";
import { RequirementDetailProvider } from "../../../../contexts/requirementDetailContext";
import { useTranslation } from "react-i18next";

interface RequirementDetailProps {
  offerList: OfferListItem[];
  requirement: RequirementTableItem;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementDetail(props: RequirementDetailProps) {
  const { t } = useTranslation();

  function HandleonFilterChange(filterType: OfferFilterTypes, value: any) {
    console.log("Cambio en filtro", filterType, value);
  }

  return (
    <RequirementDetailProvider>
      <div className="modal-card">
        <div className="detalle-oferta">
          <RequirementInfo requirement={props.requirement}></RequirementInfo>
          <div
            style={{
              textAlign: "center",
              margin: "15px 0",
              padding: "10px",
              boxShadow: "0 2px 18px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <b>{t("searchFilters")}: </b> {t("searchFiltersDesc")}
          </div>
          <RequirementOfferFilters
            onFilterChange={HandleonFilterChange}
          ></RequirementOfferFilters>

          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
          />
        </div>
      </div>
    </RequirementDetailProvider>
  );
}
