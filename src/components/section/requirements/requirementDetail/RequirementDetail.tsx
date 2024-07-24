import { Divider } from "antd";
import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";
import Title from "antd/es/typography/Title";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { useState } from "react";
import { OfferFilters } from "../../../../models/Interfaces";
import {
  DeliveryTimeFilter,
  LocationFilter,
  OfferFilterTypes,
  PriceFilter,
  WarrantyFilter,
} from "../../../../utilities/types";
import { requirementDetailContext } from "../../../../contexts/requirementDetailContext";

interface RequirementDetailProps {
  offerList: OfferListItem[];
  requirement: RequirementTableItem;
}

export default function RequirementDetail(props: RequirementDetailProps) {
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
      <Divider style={{ margin: "10px 0" }} />
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
        <b>Filtros de búsqueda: </b> Puede seleccionar opciones para ordenar y
        filtrar ofertas
      </div>
      <RequirementOfferFilters
        onFilterChange={HandleonFilterChange}
      ></RequirementOfferFilters>
      <Divider style={{ margin: "15px 0" }} />
      <Title style={{ textAlign: "center", marginTop: "0" }} level={4}>
        Ofertas recibidas
      </Title>
      <RequirementOfferList
        offers={props.offerList}
        requirement={props.requirement}
      />
    </requirementDetailContext.Provider>
  );
}
