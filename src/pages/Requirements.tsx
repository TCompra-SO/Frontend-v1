import ModalContainer from "../components/containers/ModalContainer";
import {
  Action,
  ModalTypes,
  OfferState,
  RequirementState,
  TableColumns,
  RequirementType,
  UserTable,
  TableTypes,
  TimeMeasurement,
} from "../utilities/types";
import { OfferListItem, RequirementTableItem } from "../models/MainInterfaces";
import { ChangeEvent, useState } from "react";
import { ModalContent, TableTypeRequirement } from "../models/Interfaces";
import RateModalTitleContainer from "../components/containers/RateModalTitleContainer";
import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";

const requirements: RequirementTableItem[] = [
  {
    key: "1",
    title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    category: 1,
    coin: 1,
    price: 5500,
    numberOffers: 999,
    state: RequirementState.CANCELED,
    type: RequirementType.GOOD,
    location: 2,
    publishDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
    image: [
      "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
    ],
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",

      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 3,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "9898989",
    },
    subUser: {
      uid: "subuser1",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "998989898",
      userType: 0,
    },
  },
  {
    key: "2",
    title:
      "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
    category: 2,
    coin: 2,
    price: 234,
    numberOffers: 0,
    state: RequirementState.EXPIRED,
    type: RequirementType.GOOD,
    location: 4,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "22222222",
    },
  },
  {
    key: "3",
    title:
      "Se requiere un ordenador portátil resistente para uso en exteriores",
    category: 3,
    coin: 1,
    price: 230,
    numberOffers: 0,
    state: RequirementState.DISPUTE,
    type: RequirementType.GOOD,
    location: 6,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "44444444",
    },
  },
  {
    key: "4",
    title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
    category: 4,
    coin: 1,
    price: 2323,
    numberOffers: 3,
    state: RequirementState.FINISHED,
    type: RequirementType.GOOD,
    location: 10,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 5,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "54533133",
    },
  },
  {
    key: "5",
    title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
    category: 5,
    coin: 2,
    price: 455,
    numberOffers: 0,
    state: RequirementState.PUBLISHED,
    type: RequirementType.GOOD,
    location: 7,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      document: "987654321",
      tenure: 15,
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "543434242",
    },
  },
  {
    key: "6",
    title: "Se requiere comprar muebles para la sala de espera",
    category: 6,
    coin: 2,
    price: 500,
    numberOffers: 1,
    state: RequirementState.SELECTED,
    type: RequirementType.GOOD,
    location: 5,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      document: "987654321",
      tenure: 24,
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "1233133213",
    },
  },
  {
    key: "7",
    title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    category: 7,
    coin: 1,
    price: 5500,
    numberOffers: 999,
    state: RequirementState.CANCELED,
    type: RequirementType.GOOD,
    location: 11,
    publishDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
    image: [
      "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
    ],
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "44454435",
    },
    subUser: {
      uid: "subuser1",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "123231",
    },
  },
  {
    key: "8",
    title:
      "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
    category: 8,
    coin: 2,
    price: 234,
    numberOffers: 0,
    state: RequirementState.EXPIRED,
    type: RequirementType.GOOD,
    location: 12,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "9",
    title:
      "Se requiere un ordenador portátil resistente para uso en exteriores",
    category: 9,
    coin: 1,
    price: 230,
    numberOffers: 0,
    state: RequirementState.DISPUTE,
    type: RequirementType.GOOD,
    location: 2,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "10",
    title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
    category: 10,
    coin: 2,
    price: 2323,
    numberOffers: 3,
    state: RequirementState.FINISHED,
    type: RequirementType.GOOD,
    location: 13,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "11",
    title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
    category: 11,
    coin: 2,
    price: 455,
    numberOffers: 0,
    state: RequirementState.PUBLISHED,
    type: RequirementType.GOOD,
    location: 7,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "12",
    title: "Se requiere comprar muebles para la sala de espera",
    category: 12,
    coin: 2,
    price: 500,
    numberOffers: 1,
    state: RequirementState.SELECTED,
    type: RequirementType.GOOD,
    location: 8,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "13",
    title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    category: 13,
    coin: 2,
    price: 5500,
    numberOffers: 999,
    state: RequirementState.CANCELED,
    type: RequirementType.GOOD,
    location: 2,
    publishDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
    image: [
      "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
    ],
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
    subUser: {
      uid: "subuser1",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "1111111",
    },
  },
  {
    key: "14",
    title:
      "Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas",
    category: 14,
    coin: 2,
    price: 234,
    numberOffers: 0,
    state: RequirementState.EXPIRED,
    type: RequirementType.GOOD,
    location: 12,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "15",
    title:
      "Se requiere un ordenador portátil resistente para uso en exteriores",
    category: 15,
    coin: 2,
    price: 230,
    numberOffers: 0,
    state: RequirementState.DISPUTE,
    type: RequirementType.GOOD,
    location: 8,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "16",
    title: "Necesito 10 Monitores de PC con Variedad en Marca y Tamaño",
    category: 15,
    coin: 1,
    price: 2323,
    numberOffers: 3,
    state: RequirementState.FINISHED,
    type: RequirementType.GOOD,
    location: 9,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "17",
    title: "Requiero 15 Escritorios de Oficina con Variedad en Marca y Color",
    category: 6,
    coin: 1,
    price: 455,
    numberOffers: 0,
    state: RequirementState.PUBLISHED,
    type: RequirementType.GOOD,
    location: 10,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
  {
    key: "18",
    title: "Se requiere comprar muebles para la sala de espera",
    category: 9,
    coin: 2,
    price: 500,
    numberOffers: 1,
    state: RequirementState.SELECTED,
    type: RequirementType.GOOD,
    location: 1,
    publishDate: new Date(),
    description: "Desription",
    user: {
      uid: "user1",
      name: "Soluciones Online  S. A. C.",
      email: "john.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 6,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "894859430",
    },
  },
];

const offerList: OfferListItem[] = [
  {
    key: "1",
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RGB keyboard",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 2,
    price: 150089.56,
    warranty: "1 year",
    deliveryTime: "2-3 weeks",
    location: 12,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.ACTIVE,
    publishDate: new Date(),
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
    },
    subUser: {
      uid: "user1",
      name: "Javier Alberto Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
    },
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
    warranty: "2 years",
    deliveryTime: "1-2 weeks",
    location: 12,
    warrantyTime: TimeMeasurement.MONTHS,
    selectionDate: new Date(),
    publishDate: new Date(),
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
    },
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
    warranty: "6 months",
    deliveryTime: "1 week",
    publishDate: new Date(),
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "1 year",
    deliveryTime: "3-4 weeks",
    publishDate: new Date(),
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "2 years",
    deliveryTime: "2-3 weeks",
    location: 5,
    warrantyTime: TimeMeasurement.YEARS,
    publishDate: new Date(),
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "1 year",
    deliveryTime: "1-2 weeks",
    publishDate: new Date(),
    location: 5,
    warrantyTime: TimeMeasurement.DAYS,
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "2 years",
    publishDate: new Date(),
    deliveryTime: "2-3 weeks",
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "3 years",
    deliveryTime: "3-4 weeks",
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    publishDate: new Date(),
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
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
    warranty: "1 year",
    deliveryTime: "2-3 weeks",
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    publishDate: new Date(),
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user9",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      document: "098765432",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "7878978799",
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
    warranty: "2 years",
    deliveryTime: "2-3 weeks",
    publishDate: new Date(),
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user9",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      document: "098765432",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "7878978799",
    },
  },
];

export default function Requirements() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<React.ReactNode>("");
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: requirements,
    subType: RequirementType.GOOD,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t("goods"),
    onButtonClick: handleOnButtonClick,
  });

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnButtonClick(
    action: Action,
    requirement: RequirementTableItem
  ) {
    // const requirement = prevRequirement as RequirementTableItem;
    switch (action) {
      case Action.SHOW_OFFERS: {
        setDataModal({
          type: ModalTypes.DETAILED_REQUIREMENT,
          data: { offerList, requirement: requirement },
        });
        setIsOpenModal(true);
        setModalTitle(requirement.title);
        break;
      }
      case Action.SHOW_SUMMARY: {
        setDataModal({
          type: ModalTypes.OFFER_SUMMARY,
          data: { offer: offerList[0] },
        });
        setIsOpenModal(true);
        setModalTitle(
          <>
            {t("summary")}
            <br />
            <div style={{ fontWeight: "normal" }}>{t("winnigOfferDetail")}</div>
          </>
        );
        break;
      }
      case Action.REPUBLISH: {
        setDataModal({
          type: ModalTypes.REPUBLISH_REQUIREMENT,
          data: { requirementId: requirement.key },
        });
        setIsOpenModal(true);
        setModalTitle(t("republish"));
        break;
      }
      case Action.FINISH: {
        setDataModal({
          type: ModalTypes.RATE_USER,
          data: {
            user: requirement.user,
            type: requirement.type,
            isOffer: false, //r3v
            requirementOffertitle: requirement.title,
          },
        });
        setIsOpenModal(true);
        setModalTitle(
          <RateModalTitleContainer isOffer={false} type={requirement.type} /> //r3v
        );
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
        setModalTitle("");
        setIsOpenModal(true);
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

  return (
    <>
      <ModalContainer
        destroyOnClose
        title={modalTitle}
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        className="custom-scroll"
        style={{
          maxHeight: "75vh",
          overflowY: "scroll",
          paddingBottom: "0",
        }}
      />
      <TablePageContent
        title={t("myRequirements")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t("goods")}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
      />
    </>
  );
}
