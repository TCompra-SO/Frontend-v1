import {
  loginService,
  newPasswordService,
  profileCompanyService,
  profileUserService,
  recoverPasswordService,
  registerService,
  sendCodeRecoveryService,
  sendCodeService,
  validateCodeService,
} from "../services/requests/authService";
import { uploadDocsRequirementService } from "../services/requests/documentService";
import { uploadImagesRequirementService } from "../services/requests/imageService";
import { createOfferService } from "../services/requests/offerService";
import { selectOfferService } from "../services/requests/requirementService";
import { registerScoreService } from "../services/requests/scoreService";
import {
  changeRoleSubUserService,
  registerSubUserService,
  updateProfileSubUserService,
} from "../services/requests/subUserService";
import { getNameReniecService } from "../services/requests/utilService";

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
    case registerSubUserService().type:
      switch (code) {
        case 404:
          erroMsg = "noCompanyFoundForSubUser";
          break;
        case 403:
          erroMsg = "emailDocAlreadyRegistered";
          break;
      }
      break;
    case changeRoleSubUserService().type:
      switch (code) {
        case 401:
          erroMsg = "cantAssignAdmintoSubUser";
          break;
        case 404:
          erroMsg = "subUserNotFoundInAnyCompany";
          break;
      }
      break;
    case updateProfileSubUserService().type:
      switch (code) {
        case 409:
          erroMsg = "profileDoesNotExist";
          break;
      }
      break;
    case newPasswordService().type:
      switch (code) {
        case 404:
          erroMsg = "userNotFound";
          break;
      }
      break;
    case createOfferService().type:
      switch (code) {
        case 403:
          erroMsg = "errorOccurredLoginAgain";
          break;
        case 409:
          erroMsg = "alreadyMadeOffer";
          break;
        case 404:
          erroMsg = "cantOfferToYourOwnRequirement";
          break;
        case 401:
          erroMsg = "requirementNotFound";
          break;
      }
      break;
    case uploadDocsRequirementService().type:
      erroMsg = "errorOccurredUploadingDocs";
      break;
    case uploadImagesRequirementService().type:
      erroMsg = "errorOccurredUploadingImgs";
      break;
    case registerScoreService().type:
      switch (code) {
        case 401:
          erroMsg = "cantRateSameEntity";
          break;
      }
      break;
    case selectOfferService().type:
      switch (code) {
        case 400:
          erroMsg = "requirementDoesNotExist";
          break;
        case 403:
          erroMsg = "reqOfferNotFound";
          break;
        case 404:
          erroMsg = "offerWasAlreadySelected";
          break;
        case 405:
          erroMsg = "cantOfferToRequirement";
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
