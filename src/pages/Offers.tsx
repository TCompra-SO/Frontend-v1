import { useTranslation } from "react-i18next";
import { OfferListItem } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  OfferState,
  RequirementType,
  TableTypes,
  UserTable,
} from "../utilities/types";
import ModalContainer from "../components/containers/ModalContainer";
import { ChangeEvent, useState } from "react";
import { ModalContent, TableTypeOffer } from "../models/Interfaces";
import TablePageContent from "../components/section/table-page/TablePageContent";

const offerList: OfferListItem[] = [
  {
    key: "1",
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RGB keyboard",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    price: 150089.56,
    publishDate: new Date(),
    warranty: "1 year",
    deliveryTime: "2-3 weeks",
    location: "Madre de dios",
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      password: "password123",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: "Más de 10 años",
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
    subUser: {
      uid: "user1",
      name: "Javier Alberto Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      password: "password123",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "2",
    title:
      "Smartphone Latest model smartphone with dual cameras Latest model smartphone with dual cameras",
    description:
      "Latest model smartphone with dual cameras, Waterproof fitness tracker with heart rate monitor",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    price: 800,
    warranty: "2 years",
    publishDate: new Date(),
    deliveryTime: "1-2 weeks",
    location: "Madre de dios",
    selectionDate: new Date(),
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
      document: "987654321",
      tenure: "15 años",
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "3",
    title: "Fitness Tracker",
    description: "",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "s/.",
    price: 100,
    warranty: "6 months",
    deliveryTime: "1 week",
    publishDate: new Date(),
    location: "Loreto",
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user3",
      name: "Fitness Pro Tech Co.",
      email: "fitnesspro@example.com",
      password: "password789",
      document: "246810975",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "4",
    title: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with Bluetooth",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "S/.",
    price: 120,
    warranty: "1 year",
    deliveryTime: "3-4 weeks",
    publishDate: new Date(),
    location: "Loreto",
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user4",
      name: "SoundTech Solutions Ltd.",
      email: "info@soundtech.example.com",
      password: "passwordabc",
      document: "135792468",
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "5",
    title: "Coffee Machine",
    description: "Espresso coffee machine with milk frother",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    price: 200,
    warranty: "2 years",
    deliveryTime: "2-3 weeks",
    publishDate: new Date(),
    location: "Loreto",
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user5",
      name: "Coffee Experts Inc.",
      email: "info@coffeeexperts.example.com",
      password: "passwordxyz",
      document: "864209753",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "6",
    title: "Portable Speaker",
    description: "Portable Bluetooth speaker with waterproof design",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    price: 80,
    warranty: "1 year",
    deliveryTime: "1-2 weeks",
    publishDate: new Date(),
    location: "Arequipa",
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "user6",
      name: "AudioTech Corp.",
      email: "info@auditech.example.com",
      password: "password123",
      document: "975310864",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "7",
    title: "Smartwatch",
    description: "Fitness-focused smartwatch with GPS and heart rate monitor",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "S/.",
    price: 300,
    warranty: "2 years",
    deliveryTime: "2-3 weeks",
    location: "Arequipa",
    state: OfferState.CANCELED,
    publishDate: new Date(),
    type: RequirementType.GOOD,
    user: {
      uid: "user7",
      name: "FitGear Solutions",
      email: "info@fitgear.example.com",
      password: "password456",
      document: "531086479",
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "8",
    title: "Desktop Computer",
    description: "High-end desktop computer for gaming and professional use",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    publishDate: new Date(),
    price: 2500,
    warranty: "3 years",
    deliveryTime: "3-4 weeks",
    location: "Arequipa",
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user8",
      name: "TechSavvy Inc.",
      email: "info@techsavvy.example.com",
      password: "password789",
      document: "123098765",
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "9",
    title: "Camera Kit",
    description: "Professional camera kit with multiple lenses and accessories",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "$",
    price: 1800,
    warranty: "1 year",
    publishDate: new Date(),
    deliveryTime: "2-3 weeks",
    location: "Lima",
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user9",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      password: "passwordabc",
      document: "098765432",
      userTable: 0,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    key: "10",
    title: "Electric Scooter",
    description: "Foldable electric scooter with long battery life",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    coin: "S/.",
    price: 600,
    warranty: "2 years",
    deliveryTime: "2-3 weeks",
    publishDate: new Date(),
    location: "Lima",
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user10",
      name: "EcoWheels Ltd.",
      email: "info@ecowheels.example.com",
      password: "passwordxyz",
      document: "456789012",
      userTable: 1,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
];

export default function Offers() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTitle] = useState<React.ReactNode>("");
  const [dataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent] = useState<TableTypeOffer>({
    type: TableTypes.OFFER,
    data: offerList,
    hiddenColumns: [],
    nameColumnHeader: t("offer") + "s",
    onButtonClick: handleOnButtonClick,
  });

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnButtonClick(_: Action, offer: OfferListItem) {
    console.log(offer);
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
        title={t("myOffers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t("goods")}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
      />
    </>
  );
}
