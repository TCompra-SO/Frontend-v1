import ModalContainer from "../components/containers/ModalContainer";
import {
  Action,
  ModalTypes,
  OfferState,
  RequirementState,
  TableColumns,
  RequirementType,
  EntityType,
  TableTypes,
  TimeMeasurement,
} from "../utilities/types";
import { FullUser, Offer, Requirement } from "../models/MainInterfaces";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeRequirement,
  useApiParams,
} from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import useApi from "../hooks/useApi";
import { getRequirementsService } from "../services/requests/requirementService";
import { transformDataToRequirement } from "../utilities/transform";
import { useLocation } from "react-router-dom";
import { equalServices, getRouteType } from "../utilities/globalFunctions";
import { useSelector } from "react-redux";
import { MainState, UserState } from "../models/Redux";
import { getUserService } from "../services/requests/authService";
import { getFullUser } from "../services/complete/general";
import {
  destroyMessage,
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";

// const requirements: Requirement[] = [
//   {
//     key: "1",
//     title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
//     category: 1,
//     coin: 1,
//     price: 5500,
//     numberOffers: 999,
//     state: RequirementState.CANCELED,
//     type: RequirementType.GOOD,
//     location: 2,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     deliveryTime: 1,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
//     image: [
//       "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
//     ],
//     user: {
//       uid: "user1",
//       name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
//       email: "john.doejohn.doejohn.doejohn.doe@example.com",

//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 3,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "9898989",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//     subUser: {
//       uid: "subuser1",
//       name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
//       email: "javiersolis@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",
//       phone: "998989898",

//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "2",
//     title:
//       "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
//     category: 2,
//     coin: 2,
//     price: 234,
//     numberOffers: 0,
//     state: RequirementState.EXPIRED,
//     type: RequirementType.GOOD,
//     location: 4,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 2,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 2,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "22222222",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "3",
//     title:
//       "Se requiere un ordenador portátil resistente para uso en exteriores",
//     category: 3,
//     coin: 1,
//     price: 230,
//     numberOffers: 0,
//     state: RequirementState.DISPUTE,
//     type: RequirementType.GOOD,
//     location: 6,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 3,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 1,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "44444444",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "4",
//     title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
//     category: 4,
//     coin: 1,
//     price: 2323,
//     numberOffers: 3,
//     state: RequirementState.FINISHED,
//     type: RequirementType.GOOD,
//     location: 10,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 4,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 5,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "54533133",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "5",
//     title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
//     category: 5,
//     coin: 2,
//     price: 455,
//     numberOffers: 0,
//     state: RequirementState.PUBLISHED,
//     type: RequirementType.GOOD,
//     location: 7,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 5,
//     user: {
//       uid: "user2",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       document: "987654321",
//       tenure: 15,
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "543434242",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//     subUser: {
//       uid: "subuser1",
//       name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
//       email: "javiersolis@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",
//       phone: "998989898",

//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "6",
//     title: "Se requiere comprar muebles para la sala de espera",
//     category: 6,
//     coin: 2,
//     price: 500,
//     numberOffers: 1,
//     state: RequirementState.SELECTED,
//     type: RequirementType.GOOD,
//     location: 5,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 6,
//     user: {
//       uid: "user2",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       document: "987654321",
//       tenure: 24,
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "1233133213",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//     subUser: {
//       uid: "subuser1",
//       name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
//       email: "javiersolis@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",
//       phone: "998989898",

//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "7",
//     title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
//     category: 7,
//     coin: 1,
//     price: 5500,
//     numberOffers: 999,
//     state: RequirementState.CANCELED,
//     type: RequirementType.GOOD,
//     location: 11,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     deliveryTime: 6,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
//     image: [
//       "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
//     ],
//     user: {
//       uid: "user1",
//       name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
//       email: "john.doejohn.doejohn.doejohn.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 2,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "44454435",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//     subUser: {
//       uid: "subuser1",
//       name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
//       email: "javiersolis@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "123231",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "8",
//     title:
//       "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
//     category: 8,
//     coin: 2,
//     price: 234,
//     numberOffers: 0,
//     state: RequirementState.EXPIRED,
//     type: RequirementType.GOOD,
//     location: 12,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 6,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "9",
//     title:
//       "Se requiere un ordenador portátil resistente para uso en exteriores",
//     category: 9,
//     coin: 1,
//     price: 230,
//     numberOffers: 0,
//     state: RequirementState.DISPUTE,
//     type: RequirementType.GOOD,
//     location: 2,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 5,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "10",
//     title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
//     category: 10,
//     coin: 2,
//     price: 2323,
//     numberOffers: 3,
//     state: RequirementState.FINISHED,
//     type: RequirementType.GOOD,
//     location: 13,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 4,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "11",
//     title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
//     category: 11,
//     coin: 2,
//     price: 455,
//     numberOffers: 0,
//     state: RequirementState.PUBLISHED,
//     type: RequirementType.GOOD,
//     location: 7,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 3,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "12",
//     title: "Se requiere comprar muebles para la sala de espera",
//     category: 12,
//     coin: 2,
//     price: 500,
//     numberOffers: 1,
//     state: RequirementState.SELECTED,
//     type: RequirementType.GOOD,
//     location: 8,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 2,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "13",
//     title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
//     category: 13,
//     coin: 2,
//     price: 5500,
//     numberOffers: 999,
//     state: RequirementState.CANCELED,
//     type: RequirementType.GOOD,
//     location: 2,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     deliveryTime: 1,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
//     image: [
//       "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
//     ],
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//     subUser: {
//       uid: "subuser1",
//       name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
//       email: "javiersolis@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "1111111",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "14",
//     title:
//       "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
//     category: 14,
//     coin: 2,
//     price: 234,
//     numberOffers: 0,
//     state: RequirementState.EXPIRED,
//     type: RequirementType.GOOD,
//     location: 12,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 2,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "15",
//     title:
//       "Se requiere un ordenador portátil resistente para uso en exteriores",
//     category: 15,
//     coin: 2,
//     price: 230,
//     numberOffers: 0,
//     state: RequirementState.DISPUTE,
//     type: RequirementType.GOOD,
//     location: 8,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 3,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "16",
//     title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
//     category: 15,
//     coin: 1,
//     price: 2323,
//     numberOffers: 3,
//     state: RequirementState.FINISHED,
//     type: RequirementType.GOOD,
//     location: 9,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     deliveryTime: 6,
//     description: "Desription",
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "17",
//     title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
//     category: 6,
//     coin: 1,
//     price: 455,
//     numberOffers: 0,
//     state: RequirementState.PUBLISHED,
//     type: RequirementType.GOOD,
//     location: 10,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     deliveryTime: 6,
//     description: "Desription",
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
//   {
//     key: "18",
//     title: "Se requiere comprar muebles para la sala de espera",
//     category: 9,
//     coin: 2,
//     price: 500,
//     numberOffers: 1,
//     state: RequirementState.SELECTED,
//     type: RequirementType.GOOD,
//     location: 1,
//     publishDate: "2024-09-12T20:36:45.673Z",
//     expirationDate: "2024-09-12T20:36:45.673Z",
//     description: "Desription",
//     deliveryTime: 1,
//     user: {
//       uid: "user1",
//       name: "Soluciones Online  S. A. C.",
//       email: "john.doe@example.com",
//       document: "123456789",
//       typeEntity: EntityType.COMPANY,
//       tenure: 6,
//       customerScore: 0,
//       sellerScore: 0,
//       address: "Calle San Agustin 107 - Cercado - Arequipa",

//       phone: "894859430",
//       customerCount: 0,
//       sellerCount: 0,
//     },
//   },
// ];

const offerList: Offer[] = [
  {
    key: "1",
    title: "Gaming Laptop",
    description:
      "High-performance gaming laptop with RGB keyboard High-performance gaming laptop with RGB keyboard High-performance gaming laptop with RGB keyboard High-performance gaming laptop with RGB keyboard High-performance gaming laptop with RGB keyboard",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 2,
    price: 150089.56,
    warranty: 1,
    deliveryTime: 1,
    location: 12,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.WINNER,
    publishDate: "2024-09-12T20:36:45.673Z",
    selectionDate: "2024-09-12T20:36:45.673Z",
    type: RequirementType.GOOD,
    user: {
      uid: "9i2lEIp4rFRnQXkM5GLv",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      customerCount: 0,
      sellerCount: 0,
    },
    subUser: {
      uid: "user1",
      name: "Javier Alberto Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
    image: [
      "https://img.freepik.com/foto-gratis/belleza-otonal-abstracta-patron-venas-hoja-multicolor-generado-ia_188544-9871.jpg",
    ],
    document: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "https://filesamples.com/samples/document/docx/sample2.docx",
    ],
  },
  {
    key: "2",
    title:
      "Smartphone Latest model smartphone with dual cameras Latest model smartphone with dual cameras",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    description:
      "Latest model smartphone with dual cameras, Waterproof fitness tracker with heart rate monitor",
    requirementId: "1",
    coin: 2,
    price: 800,
    warranty: 2,
    deliveryTime: 2,
    location: 12,
    warrantyTime: TimeMeasurement.MONTHS,
    publishDate: "2024-09-12T20:36:45.673Z",
    selectionDate: "2024-09-12T20:36:45.673Z",
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Aaaaaa bbbbbbbbb ccccccccc ddddddddddd S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      customerCount: 0,
      sellerCount: 0,
      phone: "90909090",
    },
    subUser: {
      uid: "user1",
      name: "Silvia Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
    image: [
      "https://img.freepik.com/foto-gratis/persona-que-sostiene-marco-concepto-paisaje-naturaleza-abierta_23-2150063228.jpg?t=st=1727120950~exp=1727124550~hmac=fde0521fde5a1669d826da23ef62b9f7804f51b67739b6d42ecb84eb7cab4b3f&w=826",
      "https://img.freepik.com/premium-photo/hyperrealistic-rain-drops-leaf-hd-vibrant-colors_926796-9124.jpg",
      "https://img.freepik.com/premium-photo/water-droplets-branch-tree-early-morning_867442-11940.jpg",
    ],
  },
  {
    key: "3",
    title: "Fitness Tracker",
    description: "",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 2,
    price: 100,
    warranty: 32,
    deliveryTime: 3,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "4",
    title: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with Bluetooth",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 2,
    price: 120,
    warranty: 7,
    deliveryTime: 4,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "5",
    title: "Coffee Machine",
    description: "Espresso coffee machine with milk frother",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 200,
    warranty: 8,
    deliveryTime: 5,
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    publishDate: "2024-09-12T20:36:45.673Z",
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "6",
    title: "Portable Speaker",
    description: "Portable Bluetooth speaker with waterproof design",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 80,
    warranty: 12,
    deliveryTime: 6,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 5,
    warrantyTime: TimeMeasurement.DAYS,
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "7",
    title: "Smartwatch",
    description: "Fitness-focused smartwatch with GPS and heart rate monitor",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 300,
    warranty: 7,
    publishDate: "2024-09-12T20:36:45.673Z",
    deliveryTime: 1,
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "8",
    title: "Desktop Computer",
    description: "High-end desktop computer for gaming and professional use",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 2500,
    warranty: 8,
    deliveryTime: 2,
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    publishDate: "2024-09-12T20:36:45.673Z",
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "9",
    title: "Camera Kit",
    description: "Professional camera kit with multiple lenses and accessories",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 1800,
    warranty: 1,
    deliveryTime: 3,
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    publishDate: "2024-09-12T20:36:45.673Z",
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      document: "098765432",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "7878978799",
      customerCount: 0,
      sellerCount: 0,
    },
  },
  {
    key: "10",
    title: "Electric Scooter",
    description: "Foldable electric scooter with long battery life",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 600,
    warranty: 3,
    deliveryTime: 4,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "WpIPS18MYqNWegvx5REP",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      document: "098765432",
      typeEntity: EntityType.PERSON,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "7878978799",
      customerCount: 0,
      sellerCount: 0,
    },
  },
];

export default function Requirements() {
  const location = useLocation();
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [type] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);

  console.log(dataUser, mainDataUser);

  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: [], //requirements
    subType: RequirementType.GOOD,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t("goods"),
    onButtonClick: handleOnButtonClick,
  });

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getRequirementsService(),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getRequirementsService())) setData();
    }
  }, [responseData, error]);

  async function setData() {
    if (responseData) {
      const data = await Promise.all(
        responseData.data.map(
          async (e: any) =>
            await transformDataToRequirement(
              e,
              RequirementType.GOOD,
              dataUser,
              mainDataUser
            )
        )
      );

      setTableContent({
        type: TableTypes.REQUIREMENT,
        data,
        subType: RequirementType.GOOD,
        hiddenColumns: [TableColumns.CATEGORY],
        nameColumnHeader: t("goods"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  async function handleOnButtonClick(action: Action, requirement: Requirement) {
    switch (action) {
      case Action.SHOW_OFFERS: {
        setDataModal({
          type: ModalTypes.DETAILED_REQUIREMENT,
          data: {
            offerList,
            requirement: requirement,
            forPurchaseOrder: false,
          }, //r3v
        });
        setIsOpenModal(true);

        break;
      }
      case Action.SHOW_SUMMARY: {
        showLoadingMessage(message);
        const user: FullUser | null = await getFullUser(offerList[0].user.uid);
        if (user) {
          setDataModal({
            type: ModalTypes.OFFER_SUMMARY,
            data: { offer: offerList[0], requirement: requirement, user },
          });
          setIsOpenModal(true);
        }
        destroyMessage(message);
        break;
      }
      case Action.REPUBLISH: {
        setDataModal({
          type: ModalTypes.REPUBLISH_REQUIREMENT,
          data: { requirementId: requirement.key },
        });
        setIsOpenModal(true);

        break;
      }
      case Action.FINISH: {
        setDataModal({
          type: ModalTypes.RATE_USER,
          data: {
            user: requirement.user,
            type: requirement.type,
            isOffer: true,
            requirementOfferTitle: requirement.title, // r3v obtener datos title user subuser de oferta ganadora
            subUser: requirement.subUser,
          },
        });
        setIsOpenModal(true);

        break;
      }
      case Action.DELETE: {
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteRequirement(requirement.key);
            },
            text: t("deleteRequirementConfirmation"),
          },
        });
        setIsOpenModal(true);
        break;
      }
      case Action.CANCEL_REQUIREMENT: {
        if (requirement.state == RequirementState.SELECTED) {
          //r3v get offerId
          setDataModal({
            type: ModalTypes.CANCEL_PURCHASE_ORDER,
            data: {
              offerId: "",
              requirementId: requirement.key,
              fromRequirementTable: true,
            },
          });
          setIsOpenModal(true);
        } else if (requirement.state == RequirementState.PUBLISHED)
          cancelRequirement(requirement.key);
        break;
      }
    }
  }

  function deleteRequirement(requirementId: string) {
    console.log("eliminarreq", requirementId);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function cancelRequirement(requirementId: string) {
    console.log("cancelRequirement", requirementId);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />
      <TablePageContent
        title={t("myRequirements")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(
          type == RequirementType.GOOD
            ? "goods"
            : type == RequirementType.SERVICE
            ? "services"
            : "sales"
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
      />
    </>
  );
}
