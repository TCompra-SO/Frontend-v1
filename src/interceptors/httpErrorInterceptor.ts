import {
  loginService,
  profileCompanyService,
  profileUserService,
  recoverPasswordService,
  registerService,
  sendCodeRecoveryService,
  sendCodeService,
  validateCodeService,
} from "../services/authService";
import { getNameReniecService } from "../services/utilService";

export default function httpErrorInterceptor(error: any, type: string): string {
  let erroMsg: string = "errorOccurred";
  const code = error.response?.status;

  switch (type) {
    case loginService().type:
      switch (code) {
        case 400:
        case 401:
          erroMsg = "incorrectEmailPassword";
          break;
        case 403:
          erroMsg = "userNoValidated";
          break;
        case 409:
          erroMsg = "userIncompleteProfile";
          break;
      }
      break;
    case profileUserService().type:
      switch (code) {
        case 409:
          erroMsg = "existingProfile";
          break;
      }
      break;
    case profileCompanyService().type:
      switch (code) {
        case 409:
          erroMsg = "existingProfile";
          break;
      }
      break;
    case registerService().type:
      switch (code) {
        case 422:
          erroMsg = "invalidDocNumber";
          break;
        case 409:
          erroMsg = "existingEmail";
          break;
        case 403:
          erroMsg = "existingDocNumber";
          break;
      }
      break;
    case sendCodeService().type:
      switch (code) {
        case 403:
          erroMsg = "userAlreadyValidated";
          break;
        case 404:
          erroMsg = "userNotFound";
          break;
        case 409:
          erroMsg = "generateCodeAgainInAFewSeconds";
          break;
        case 410:
          erroMsg = "completeProfile";
          break;
      }
      break;
    case sendCodeRecoveryService().type:
      switch (code) {
        case 404:
          erroMsg = "userNotFound";
          break;
        case 409:
          erroMsg = "generateCodeAgainInAFewSeconds";
          break;
      }
      break;
    case validateCodeService().type:
      switch (code) {
        case 400:
          erroMsg = "generateCodeFirst";
          break;
        case 410:
          erroMsg = "expiredCode";
          break;
        case 401:
          erroMsg = "incorrectCode";
          break;
      }
      break;
    case getNameReniecService("").type:
      switch (code) {
        // case 400:
        //   erroMsg = "noDNIorRUCprovided";
        //   break;
        case 400:
          erroMsg = "invalidDocNumber";
          break;
        case 404:
          erroMsg = "docNumberNotFound";
          break;
      }
      break;
    case recoverPasswordService().type:
      switch (code) {
        case 404:
          erroMsg = "userNotFound";
          break;
        case 400:
          erroMsg = "noRecoveryCodeForUser";
          break;
        case 410:
          erroMsg = "expiredCode";
          break;
        case 401:
          erroMsg = "incorrectCode";
          break;
      }
      break;
    case "": // No mostrar mensaje
      erroMsg = "";
      break;
    default:
      break;
  }
  return erroMsg;
}
