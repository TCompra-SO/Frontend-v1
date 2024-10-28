import { useTranslation } from "react-i18next";
import { Offer } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  OfferState,
  RequirementType,
  TableTypes,
  TimeMeasurement,
  EntityType,
} from "../utilities/types";
import ModalContainer from "../components/containers/ModalContainer";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeOffer,
  useApiParams,
} from "../models/Interfaces";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import {
  equalServices,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { getBaseUserForUserSubUser } from "../services/complete/general";
import { getOffersService } from "../services/requests/offerService";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { transformToOffer } from "../utilities/transform";

const offerList: Offer[] = [
  {
    key: "1",
    title: "Gaming Laptop",
    description:
      "Se requiere comprar muebles start para la sala de espera empresarialSe requiere comprar muebles start para la sala de esperamuebles start para la sala de ",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 150089.56,
    publishDate: "2024-09-12T20:36:45.673Z",
    warranty: 3,
    deliveryTime: 1,
    deliveryDate: "2024-09-12T20:36:45.673Z",
    location: 12,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",

      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 10,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",

      phone: "998989898",

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
      tenure: 3,
      phone: "998989898",

      customerCount: 0,
      sellerCount: 0,
    },
    image: [
      "https://img.freepik.com/foto-gratis/belleza-otonal-abstracta-patron-venas-hoja-multicolor-generado-ia_188544-9871.jpg",
      "https://img.freepik.com/foto-gratis/belleza-otonal-abstracta-patron-venas-hoja-multicolor-generado-ia_188544-9871.jpg",
    ],
    document: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    canceledByCreator: false,
  },
  {
    key: "2",
    title:
      "Smartphone Latest model smartphone with dual cameras Latest model smartphone with dual cameras",
    description:
      "Latest model smartphone with dual cameras, Waterproof fitness tracker with heart rate monitor",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 800,
    warranty: 3,
    publishDate: "2024-09-12T20:36:45.673Z",
    deliveryTime: 2,
    location: 11,
    warrantyTime: TimeMeasurement.MONTHS,
    selectionDate: "2024-09-12T20:36:45.673Z",
    state: OfferState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      document: "987654321",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",
      customerCount: 0,
      sellerCount: 0,
    },
    subUser: {
      uid: "subuser1",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "998989898",
      customerCount: 0,
      sellerCount: 0,
    },
    canceledByCreator: true,
  },
  {
    key: "3",
    title: "Fitness Tracker",
    description: "",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 1,
    price: 100,
    warranty: 12,
    deliveryTime: 3,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 3,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user3",
      name: "Fitness Pro Tech Co.",
      email: "fitnesspro@example.com",
      document: "246810975",
      typeEntity: EntityType.PERSON,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    warranty: 4,
    deliveryTime: 4,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 7,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user4",
      name: "SoundTech Solutions Ltd.",
      email: "info@soundtech.example.com",
      document: "135792468",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    coin: 2,
    price: 200,
    warranty: 1.5,
    deliveryTime: 5,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 1,
    warrantyTime: TimeMeasurement.DAYS,
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user5",
      name: "Coffee Experts Inc.",
      email: "info@coffeeexperts.example.com",
      document: "864209753",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

      customerCount: 0,
      sellerCount: 0,
    },
    subUser: {
      uid: "user6",
      name: "AudioTech Corp.",
      email: "info@auditech.example.com",

      document: "975310864",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    coin: 2,
    price: 80,
    warranty: 12,
    deliveryTime: 6,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 9,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.ACTIVE,
    type: RequirementType.GOOD,
    user: {
      uid: "user6",
      name: "AudioTech Corp.",
      email: "info@auditech.example.com",

      document: "975310864",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

      customerCount: 0,
      sellerCount: 0,
    },
    subUser: {
      uid: "user6",
      name: "AudioTech Corp.",
      email: "info@auditech.example.com",

      document: "975310864",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    coin: 2,
    price: 300,
    warranty: 64,
    deliveryTime: 6,
    location: 12,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.CANCELED,
    publishDate: "2024-09-12T20:36:45.673Z",
    type: RequirementType.GOOD,
    user: {
      uid: "user7",
      name: "FitGear Solutions",
      email: "info@fitgear.example.com",
      document: "531086479",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

      customerCount: 0,
      sellerCount: 0,
    },
    canceledByCreator: false,
  },
  {
    key: "8",
    title: "Desktop Computer",
    description: "High-end desktop computer for gaming and professional use",
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    requirementId: "1",
    coin: 2,
    publishDate: "2024-09-12T20:36:45.673Z",
    price: 2500,
    warranty: 43,
    deliveryTime: 6,
    location: 7,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.DISPUTE,
    type: RequirementType.GOOD,
    user: {
      uid: "user8",
      name: "TechSavvy Inc.",
      email: "info@techsavvy.example.com",
      document: "123098765",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    coin: 2,
    price: 1800,
    warranty: 1,
    publishDate: "2024-09-12T20:36:45.673Z",
    deliveryTime: 1,
    location: 6,
    warrantyTime: TimeMeasurement.MONTHS,
    state: OfferState.FINISHED,
    type: RequirementType.GOOD,
    user: {
      uid: "user9",
      name: "SnapLens Co.",
      email: "info@snaplens.example.com",
      document: "098765432",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      tenure: 3,
      phone: "998989898",

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
    coin: 2,
    price: 600,
    warranty: 2,
    deliveryTime: 2,
    publishDate: "2024-09-12T20:36:45.673Z",
    location: 10,
    warrantyTime: TimeMeasurement.YEARS,
    state: OfferState.WINNER,
    type: RequirementType.GOOD,
    user: {
      uid: "user10",
      name: "EcoWheels Ltd.",
      email: "info@ecowheels.example.com",

      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,

      tenure: 3,
      customerCount: 0,
      sellerCount: 0,
    },
  },
];

export default function Offers() {
  const { t } = useTranslation();
  const location = useLocation();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeOffer>({
    type: TableTypes.OFFER,
    data: [], //offerList,
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
  });

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getOffersService(),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getOffersService())) setData();
    }
  }, [responseData, error]);

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
        data: offerList,
      };
    });
  }, [type]);

  async function setData() {
    if (responseData) {
      const data = await Promise.all(
        responseData.data.map(
          async (e: any) =>
            await transformToOffer(e, type, dataUser, mainDataUser)
        )
      );

      setTableContent({
        type: TableTypes.OFFER,
        data: data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer(offerId: string) {
    console.log("deleteOffer", offerId);
  }

  function goToChat(offer: Offer) {
    console.log("goToChat", offer.key, offer.requirementId);
  }

  function handleOnButtonClick(action: Action, offer: Offer) {
    switch (action) {
      case Action.OFFER_DETAIL:
        setDataModal({
          type: ModalTypes.OFFER_DETAIL,
          data: {
            offer,
          },
        });
        setIsOpenModal(true);
        break;

      case Action.DELETE: {
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteOffer(offer.key);
            },
            text: t("deleteOfferConfirmation"),
          },
        });
        setIsOpenModal(true);
        break;
      }

      case Action.CHAT: {
        goToChat(offer);
        break;
      }

      case Action.RATE_CANCELED: {
        /* r3v get user subuser from requirement */
        // getBaseUserForUserSubUser(offer.);
        setDataModal({
          type: ModalTypes.RATE_CANCELED,
          data: {
            user: offer.user,
            subUser: offer.subUser,
            requirementOfferTitle: offer.requirementTitle,
            type: offer.type,
            isOffer: false,
          },
        });
        setIsOpenModal(true);
        break;
      }

      case Action.CANCEL_OFFER: {
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: offer.key,
            requirementId: offer.requirementId,
            fromRequirementTable: false,
          },
        });
        setIsOpenModal(true);
        break;
      }

      case Action.FINISH: {
        /* r3v get user subuser from requirement */
        setDataModal({
          type: ModalTypes.RATE_USER,
          data: {
            user: offer.user,
            subUser: offer.subUser,
            type: offer.type,
            isOffer: false,
            requirementOfferTitle: offer.requirementTitle,
          },
        });
        setIsOpenModal(true);
        break;
      }
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
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
        title={t("myOffers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={
          equalServices(apiParams.service, getOffersService())
            ? loading
            : undefined
        }
      />
    </>
  );
}
