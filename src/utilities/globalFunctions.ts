import { HttpService } from "../models/Interfaces";
import { maxImageSizeMb } from "./globals";
import { RequirementType, UserClass } from "./types";

// Determina  si el usuario es proveedor o cliente
export function getUserClass(isOffer: boolean, type: RequirementType) {
  const userClass: UserClass =
    (isOffer && type == RequirementType.SALE) ||
    (!isOffer && type !== RequirementType.SALE)
      ? UserClass.CUSTOMER
      : UserClass.SELLER;
  return userClass;
}

// Check image size
export function checkImage(image: File) {
  const fileSizeMB = image.size / (1024 * 1024);
  return {
    validImage: image.type.startsWith("image/"),
    validSize: fileSizeMB <= maxImageSizeMb,
  };
}

// Determina si dos servicios http son iguales
export function equalServices(
  serv1: HttpService | null,
  serv2: HttpService | null
) {
  if (serv1 && serv2)
    return serv1.type === serv2.type && serv1.url === serv2.url;
  if (!serv1 && !serv2) return true;
  return false;
}
