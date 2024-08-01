import { Routes } from "../utilities/routes";

export default function httpErrorInterceptor(error: any, type: string): string {
  let erroMsg: string = "errorOccurred";
  const code = error.response?.status;

  switch (type) {
    case Routes.auth.login:
      switch (code) {
        case 400:
        case 401:
          erroMsg = "incorrectEmailPassword";
          break;
      }
      break;
    case Routes.auth.profile:
      switch (code) {
        case 409:
          erroMsg = "existingProfile";
          break;
      }
      break;
    case Routes.auth.register:
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
    case Routes.auth.sendCode:
      switch (code) {
        case 403:
          erroMsg = "completeProfile";
          break;
        case 409:
          erroMsg = "generateCodeAgain";
          break;
        case 410:
          erroMsg = "userAlreadyValidated";
          break;
      }
      break;
    case Routes.auth.validateCode:
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
    case "": // No mostrar mensaje
      erroMsg = "";
      break;
    default:
      break;
  }
  return erroMsg;
}
