import { RuleObject } from "antd/es/form";
import { RequirementType, UserClass } from "./types";

export function validateNumber(_: RuleObject, value: string) {
  if (value && isNaN(Number(value))) {
    return Promise.reject(new Error("Ingresa un número válido"));
  }
  return Promise.resolve();
}

export function getUserClass(isOffer: boolean, type: RequirementType) {
  const userClass: UserClass =
    (isOffer && type == RequirementType.SALE) ||
    (!isOffer && type !== RequirementType.SALE)
      ? UserClass.CUSTOMER
      : UserClass.SELLER;
  return userClass;
}
