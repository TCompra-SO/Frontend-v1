import {
  OfferListItem,
  RequirementTableItem,
  TableRecordType,
} from "../models/MainInterfaces";

export function isRequirement(
  data: TableRecordType
): data is RequirementTableItem {
  return (data as RequirementTableItem).numberOffers !== undefined;
}

export function isOffer(data: TableRecordType): data is OfferListItem {
  return (data as OfferListItem).deliveryTime !== undefined;
}
