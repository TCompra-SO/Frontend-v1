import { Divider } from "antd";
import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";
import Title from "antd/es/typography/Title";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { SyntheticEvent, useState } from "react";
import { OfferFilters } from "../../../../models/Interfaces";
import {
  DeliveryTimeFilter,
  LocationFilter,
  OfferFilterTypes,
  PriceFilter,
  WarrantyFilter,
} from "../../../../utilities/types";
import { requirementDetailContext } from "../../../../contexts/requirementDetailContext";
import { useTranslation } from "react-i18next";

interface RequirementDetailProps {
  offerList: OfferListItem[];
  requirement: RequirementTableItem;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementDetail(props: RequirementDetailProps) {
  const { t } = useTranslation();
  const [offerFilters, setOfferFilters] = useState<OfferFilters>({
    price: PriceFilter.ALL,
    deliveryTime: DeliveryTimeFilter.ALL,
    location: LocationFilter.ALL,
    warranty: WarrantyFilter.ALL,
  });

  function updateFilters(newFilters: OfferFilters) {
    console.log("updateFilters");
    setOfferFilters(newFilters);
  }

  function HandleonFilterChange(filterType: OfferFilterTypes, value: any) {
    console.log("Cambio en filtro", filterType, value);
  }

  return (
    <requirementDetailContext.Provider
      value={{ filters: offerFilters, updateFilters }}
    >
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
          <Divider style={{ margin: "15px 0" }} />
          <Title style={{ textAlign: "center", marginTop: "0" }} level={4}>
            {t("receivedOffers")}
          </Title>
          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
          />
        </div>
      </div>
    </requirementDetailContext.Provider>
  );
}
