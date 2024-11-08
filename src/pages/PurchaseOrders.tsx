import { Offer, PurchaseOrder, Requirement } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderState,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
  EntityType,
  OfferState,
  TimeMeasurement,
  RequirementState,
  CommonFilter,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  TableTypePurchaseOrder,
  useApiParams,
} from "../models/Interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import { getUserService } from "../services/requests/authService";
import { App } from "antd";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import {
  equalServices,
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
} from "../utilities/globalFunctions";
import {
  transformToBasicRateData,
  transformToFullUser,
  transformToPurchaseOrder,
} from "../utilities/transform";
import { mainModalScrollStyle } from "../utilities/globals";
import { useLocation } from "react-router-dom";
import { getReqIssuedPurchaseOrderByUserService } from "../services/requests/purchaseOrderService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { getBasicRateDataOfferService } from "../services/requests/offerService";
import { getBasicRateDataReqService } from "../services/requests/requirementService";

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
      uid: "user1",
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

      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,

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
      uid: "user1",
      name: "Aaaaaa bbbbbbbbb ccccccccc ddddddddddd S. A. C.",
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
      name: "Silvia Solís Calcina",
      email: "javiersolis@example.com",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",

      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

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
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,

      customerCount: 0,
      sellerCount: 0,
    },
  },
];

const req: Requirement = {
  key: "1",
  title: "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
  category: 1,
  coin: 1,
  price: 5500,
  numberOffers: 999,
  state: RequirementState.CANCELED,
  type: RequirementType.GOOD,
  location: 2,
  publishDate: "2024-09-12T20:36:45.673Z",
  expirationDate: "2024-09-12T20:36:45.673Z",
  deliveryTime: 1,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis convallis metus a faucibus. Phasellus tristique nec lorem a vulputate. Morbi varius volutpat orci, in viverra risus venenatis sit amet. Duis convallis nisi nec ligula luctus, in elementum orci ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quam ante, aliquam rhoncus sollicitudin a, lacinia vitae odio. Aenean quis facilisis augue. Donec iaculis aliquam odio, nec fermentum lectus eleifend ac. Sed fermentum nisl eu aliquet pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar elit ac volutpat elementum. Donec interdum id turpis ac ultrices. Vivamus et nunc iaculis, suscipit libero nec, lobortis ex. Vestibulum vitae gravida tortor, eleifend placerat mi. Integer mauris nunc, elementum et dui non, posuere malesuada erat. Aliquam semper aliquet interdum.",
  image: [
    "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
  ],
  user: {
    uid: "user1",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",

    typeEntity: EntityType.COMPANY,
    tenure: 3,
    customerScore: 0,
    sellerScore: 0,

    customerCount: 0,
    sellerCount: 0,
  },
  subUser: {
    uid: "subuser1",
    name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
    email: "javiersolis@example.com",

    typeEntity: EntityType.COMPANY,
    customerScore: 0,
    sellerScore: 0,

    customerCount: 0,
    sellerCount: 0,
  },
};

export default function PurchaseOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { notification, message } = App.useApp();
  const [currentPurchaseOrder, setCurrentPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener datos iniciales */
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getReqIssuedPurchaseOrderByUserService(uid),
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
      };
    });
  }, [type]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (equalServices(apiParams.service, getUserService("")))
      showLoadingMessage(message, loading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      if (
        equalServices(
          apiParams.service,
          getReqIssuedPurchaseOrderByUserService("")
        )
      )
        setTableData();
      if (equalServices(apiParams.service, getUserService("")))
        showUserInfo(responseData);
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Obtener datos para culminar */
  const [apiParamsRate, setApiParamsRate] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingRate,
    responseData: responseDataRate,
    error: errorRate,
    errorMsg: errorMsgRate,
    fetchData: fetchDataRate,
  } = useApi({
    service: apiParamsRate.service,
    method: apiParamsRate.method,
    dataToSend: apiParamsRate.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingRate]);

  useEffect(() => {
    if (apiParamsRate.service) fetchDataRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsRate]);

  useEffect(() => {
    if (responseDataRate) {
      openRateModal(responseDataRate);
    } else if (errorRate) {
      showNotification(notification, "error", errorMsgRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataRate, errorRate]);

  /** Funciones */

  async function setTableData() {
    if (responseData) {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );

      setTableContent({
        type: TableTypes.PURCHASE_ORDER,
        data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function openRateModal(responseData: any) {
    const data = transformToBasicRateData(responseData.data[0]);
    console.log(currentPurchaseOrder);
    if (currentPurchaseOrder) {
      setDataModal({
        type: ModalTypes.RATE_USER,
        data: {
          basicRateData: data,
          type: currentPurchaseOrder.type,
          isOffer:
            type == PurchaseOrderTableTypes.ISSUED ||
            type == PurchaseOrderTableTypes.RECEIVED_SALES,
        },
      });
      setIsOpenModal(true);
    }
  }

  function showUserInfo(responseData: any) {
    const user = transformToFullUser(responseData.data[0]);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
    });
    setIsOpenModal(true);
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    setCurrentPurchaseOrder(purchaseOrder);

    switch (action) {
      case Action.VIEW_CUSTOMER:
        setApiParams({
          service: getUserService(purchaseOrder.userClientId),
          method: "get",
        });
        break;
      case Action.VIEW_SUPPLIER:
        setApiParams({
          service: getUserService(purchaseOrder.userProviderId),
          method: "get",
        });
        break;
      case Action.DOWNLOAD_PURCHASE_ORDER:
        console.log("pdf", purchaseOrder.key);
        break;
      case Action.FINISH:
        // if (tableSubType == PurchaseOrderTableTypes.RECEIVED_SALES) // buscar en ofertas liquidaciones r3v
        // if (tableSubType == PurchaseOrderTableTypes.ISSUED_SALES) // buscar en liquidaciones
        if (type == PurchaseOrderTableTypes.ISSUED) {
          // Buscar en oferta de requerimiento
          if (purchaseOrder.type == RequirementType.GOOD)
            setApiParamsRate({
              service: getBasicRateDataOfferService(purchaseOrder.offerId),
              method: "get",
            });
          break;
        } else if (type == PurchaseOrderTableTypes.RECEIVED)
          if (purchaseOrder.type == RequirementType.GOOD)
            // Buscar en requerimiento
            setApiParamsRate({
              service: getBasicRateDataReqService(purchaseOrder.requirementId),
              method: "get",
            });
        break;
      case Action.VIEW_HISTORY:
        setDataModal({
          type: ModalTypes.DETAILED_REQUIREMENT,
          data: {
            offerList,
            requirement: req,
            forPurchaseOrder: true,
            filters: purchaseOrder.filters,
          }, // r3v
        });
        setIsOpenModal(true);
        break;
      case Action.CANCEL:
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: purchaseOrder.offerId,
            requirementId: purchaseOrder.requirementId,
            fromRequirementTable: false,
          },
        });
        setIsOpenModal(true);
        break;
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
        title={t("myPurchaseOrders")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(
          getLabelFromPurchaseOrderType(type, true, false)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        // loading={
        //   equalServices(apiParams.service, getRequirementsService())
        //     ? loading
        //     : undefined
        // }
      />
    </>
  );
}
