import { CSSProperties, useEffect, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { pageRoutes, pageSubRoutes } from "../../../utilities/routes";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { RolesForSection } from "../../../utilities/roles";
import {
  getLastSegmentFromRoute,
  getSectionFromRoute,
} from "../../../utilities/globalFunctions";
import { EntityType } from "../../../utilities/types";

const menuToggles: {
  [key in (typeof pageRoutes)[keyof typeof pageRoutes]]: {
    hasSubsection: boolean;
  };
} = {
  [pageRoutes.home]: { hasSubsection: false },
  [pageRoutes.profile]: { hasSubsection: false },
  [pageRoutes.productDetail]: {
    hasSubsection: false,
  },
  [pageRoutes.myRequirements]: {
    hasSubsection: true,
  },
  [pageRoutes.myOffers]: { hasSubsection: true },
  [pageRoutes.myPurchaseOrders]: {
    hasSubsection: true,
  },
  [pageRoutes.mySalesOrders]: {
    hasSubsection: true,
  },
  [pageRoutes.chat]: { hasSubsection: false },
  [pageRoutes.users]: { hasSubsection: false },
  [pageRoutes.allRequirements]: {
    hasSubsection: true,
  },
  [pageRoutes.allOffers]: { hasSubsection: true },
  [pageRoutes.certificates]: {
    hasSubsection: true,
  },
  [pageRoutes.allPurchaseOrders]: {
    hasSubsection: true,
  },
  [pageRoutes.allSalesOrders]: {
    hasSubsection: true,
  },
  [pageRoutes.statistics]: { hasSubsection: false },
};

interface SidebarProps {
  showMenu: boolean;
  onShowMenu: (show: boolean) => void;
}

export default function Sidebar(props: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const typeID = useSelector((state: MainState) => state.user.typeID);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const [menuStyle] = useState<CSSProperties>({ display: "block" });
  const [focusExists, setFocusExists] = useState(false);
  const buttonClass: string = "btn btn-transparent wd-100 text-left";
  const [menuVisibility, setMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [menuFocus, setMenuFocus] = useState<{
    [key: string]: string;
  }>({});

  /** Mostrar en sidebar sección actual */

  useEffect(() => {
    if (!focusExists) {
      const section = getSectionFromRoute(location.pathname);
      const segment = getLastSegmentFromRoute(location.pathname);
      if (section in menuToggles) {
        if (menuToggles[section]?.hasSubsection) toggleMenu(section, true);
        focusMenu(
          `${section}${
            menuToggles[section]?.hasSubsection ? `/${segment}` : ""
          }`
        );
      }
      setFocusExists(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  /** Funciones */

  function toggleMenu(menuId: string, firstRender?: boolean) {
    setFocusExists(true);
    setMenuVisibility((prevVisibility) => {
      return {
        ...prevVisibility,
        [menuId]: firstRender ? true : !prevVisibility[menuId],
      };
    });
  }

  function focusMenu(menuId: string) {
    setMenuFocus((prev) => {
      const updatedMenuFocus: { [key: string]: string } = {};
      updatedMenuFocus[menuId] = "focus";
      for (const key in prev) {
        if (key !== menuId) updatedMenuFocus[key] = "";
      }
      return updatedMenuFocus;
    });
  }

  function redirectTo(route: string) {
    focusMenu(route);
    navigate(route);
  }

  return (
    <div
      className="col-menu t-flex"
      style={props.showMenu ? menuStyle : undefined}
    >
      {props.showMenu && (
        <i
          className="fa-solid fa-circle-xmark btn-close"
          onClick={() => props.onShowMenu(false)}
        ></i>
      )}
      <div>
        <img
          src="/src/assets/images/logo-white.svg"
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => redirectTo(pageRoutes.home)}
        ></img>
      </div>

      <div className="menu-tc-1 t-flex scroll-y">
        {RolesForSection.profile[typeID] && (
          <ButtonContainer
            children={
              <>
                <i className="fa-regular fa-user-pen text-center i-btn"></i>{" "}
                {t("myProfile")}
              </>
            }
            common
            className={`${buttonClass} ${menuFocus[pageRoutes.profile]}`}
            onClick={() => redirectTo(`${pageRoutes.profile}`)}
          />
        )}
        {RolesForSection.myRequirements[typeID] && (
          <>
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-arrow-down-short-wide text-center i-btn"></i>{" "}
                  {t("myRequirements")}{" "}
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                </>
              }
              common
              className={buttonClass}
              onClick={() => toggleMenu(pageRoutes.myRequirements)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myRequirements]
                  ? "block"
                  : "none",
              }}
            >
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.myRequirements}/${pageSubRoutes.goods}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myRequirements}/${pageSubRoutes.goods}`
                  )
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("goods")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.myRequirements}/${pageSubRoutes.services}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myRequirements}/${pageSubRoutes.services}`
                  )
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("services")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.myRequirements}/${pageSubRoutes.sales}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myRequirements}/${pageSubRoutes.sales}`
                  )
                }
              >
                <i className="fa-regular fa-basket-shopping text-center i-btn"></i>{" "}
                {t("sales")}
              </ButtonContainer>
            </div>
          </>
        )}
        {RolesForSection.myOffers[typeID] && (
          <>
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-arrow-up-wide-short text-center i-btn"></i>{" "}
                  {t("myOffers")}{" "}
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                </>
              }
              common
              className={buttonClass}
              onClick={() => toggleMenu(pageRoutes.myOffers)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myOffers] ? "block" : "none",
              }}
            >
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[`${pageRoutes.myOffers}/${pageSubRoutes.goods}`]
                }`}
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.myOffers}/${pageSubRoutes.goods}`)
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("goods")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[`${pageRoutes.myOffers}/${pageSubRoutes.services}`]
                }`}
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.myOffers}/${pageSubRoutes.services}`)
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("services")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[`${pageRoutes.myOffers}/${pageSubRoutes.sales}`]
                }`}
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.myOffers}/${pageSubRoutes.sales}`)
                }
              >
                <i className="fa-regular fa-basket-shopping text-center i-btn"></i>{" "}
                {t("sales")}
              </ButtonContainer>
            </div>
          </>
        )}
        {RolesForSection.myPurchaseOrders[typeID] && (
          <>
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-file-contract text-center i-btn"></i>{" "}
                  {t("myPurchaseOrdersAbb")}{" "}
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                </>
              }
              common
              className={buttonClass}
              onClick={() => toggleMenu(pageRoutes.myPurchaseOrders)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myPurchaseOrders]
                  ? "block"
                  : "none",
              }}
            >
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}`
                  )
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("issuedPl")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}`
                  )
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("receivedPl")}
              </ButtonContainer>
            </div>
          </>
        )}
        {RolesForSection.mySalesOrders[typeID] && (
          <>
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-file-contract text-center i-btn"></i>{" "}
                  {t("mySalesOrdersAbb")}{" "}
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                </>
              }
              common
              className={buttonClass}
              onClick={() => toggleMenu(pageRoutes.mySalesOrders)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.mySalesOrders]
                  ? "block"
                  : "none",
              }}
            >
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.mySalesOrders}/${pageSubRoutes.issued}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.mySalesOrders}/${pageSubRoutes.issued}`
                  )
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("issuedPl")}
              </ButtonContainer>
              <ButtonContainer
                className={`${buttonClass} ${
                  menuFocus[
                    `${pageRoutes.mySalesOrders}/${pageSubRoutes.received}`
                  ]
                }`}
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.mySalesOrders}/${pageSubRoutes.received}`
                  )
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("receivedPl")}
              </ButtonContainer>
            </div>
          </>
        )}
        {RolesForSection.chat[typeID] && (
          <ButtonContainer
            children={
              <>
                <i className="fa-regular fa-comment text-center i-btn"></i>{" "}
                {t("chatSection")} <div className="chat-notf">10</div>
              </>
            }
            common
            className={`${buttonClass} ${menuFocus[pageRoutes.chat]}`}
            onClick={() => redirectTo(`${pageRoutes.chat}`)}
          />
        )}
        {RolesForSection.users[typeID] && entityType != EntityType.PERSON && (
          <>
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-users text-center i-btn"></i>{" "}
                  {t("createUsers")}
                </>
              }
              common
              className={`${buttonClass} ${menuFocus[pageRoutes.users]}`}
              onClick={() => redirectTo(`${pageRoutes.users}`)}
            />
          </>
        )}
        {RolesForSection.allRequirements[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              <ButtonContainer
                children={
                  <>
                    <i className="fa-regular fa-paste text-center i-btn"></i>{" "}
                    {t("requirements")}{" "}
                    <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                  </>
                }
                common
                className={buttonClass}
                onClick={() => toggleMenu(pageRoutes.allRequirements)}
              />
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allRequirements]
                    ? "block"
                    : "none",
                }}
              >
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allRequirements}/${pageSubRoutes.goods}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allRequirements}/${pageSubRoutes.goods}`
                    )
                  }
                >
                  <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                  {t("goods")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allRequirements}/${pageSubRoutes.services}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allRequirements}/${pageSubRoutes.services}`
                    )
                  }
                >
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                  {t("services")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allRequirements}/${pageSubRoutes.sales}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allRequirements}/${pageSubRoutes.sales}`
                    )
                  }
                >
                  <i className="fa-regular fa-basket-shopping text-center i-btn"></i>{" "}
                  {t("sales")}
                </ButtonContainer>
              </div>
            </>
          )}
        {RolesForSection.allOffers[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              <ButtonContainer
                children={
                  <>
                    <i className="fa-regular fa-ballot-check text-center i-btn"></i>{" "}
                    {t("offers")}{" "}
                    <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                  </>
                }
                common
                className={buttonClass}
                onClick={() => toggleMenu(pageRoutes.allOffers)}
              />
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allOffers]
                    ? "block"
                    : "none",
                }}
              >
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[`${pageRoutes.allOffers}/${pageSubRoutes.goods}`]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(`${pageRoutes.allOffers}/${pageSubRoutes.goods}`)
                  }
                >
                  <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                  {t("goods")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allOffers}/${pageSubRoutes.services}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allOffers}/${pageSubRoutes.services}`
                    )
                  }
                >
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                  {t("services")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[`${pageRoutes.allOffers}/${pageSubRoutes.sales}`]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(`${pageRoutes.allOffers}/${pageSubRoutes.sales}`)
                  }
                >
                  <i className="fa-regular fa-basket-shopping text-center i-btn"></i>{" "}
                  {t("sales")}
                </ButtonContainer>
              </div>
            </>
          )}
        {RolesForSection.certificates[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              <ButtonContainer
                children={
                  <>
                    <i className="fa-regular fa-file-certificate text-center i-btn"></i>{" "}
                    {t("certificates")}{" "}
                    <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                  </>
                }
                common
                className={buttonClass}
                onClick={() => toggleMenu(pageRoutes.certificates)}
              />
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.certificates]
                    ? "block"
                    : "none",
                }}
              >
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.certificates}/${pageSubRoutes.documents}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.certificates}/${pageSubRoutes.documents}`
                    )
                  }
                >
                  <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                  {t("myDocuments")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.certificates}/${pageSubRoutes.sent}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.certificates}/${pageSubRoutes.sent}`
                    )
                  }
                >
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                  {t("sentPl")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.certificates}/${pageSubRoutes.received}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.certificates}/${pageSubRoutes.received}`
                    )
                  }
                >
                  <i className="fa-regular fa-basket-shopping text-center i-btn"></i>{" "}
                  {t("receivedPlMasc")}
                </ButtonContainer>
              </div>
            </>
          )}
        {RolesForSection.allPurchaseOrders[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              <ButtonContainer
                children={
                  <>
                    <i
                      className="fa-regular fa-money-check-pen text-center"
                      style={{ width: "25px" }}
                    ></i>{" "}
                    {t("purchaseOrders")}{" "}
                    <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                  </>
                }
                common
                className={buttonClass}
                onClick={() => toggleMenu(pageRoutes.allPurchaseOrders)}
              />
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allPurchaseOrders]
                    ? "block"
                    : "none",
                }}
              >
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}`
                    )
                  }
                >
                  <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                  {t("issuedPl")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}`
                    )
                  }
                >
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                  {t("receivedPl")}
                </ButtonContainer>
              </div>
            </>
          )}
        {RolesForSection.allSalesOrders[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              <ButtonContainer
                children={
                  <>
                    <i
                      className="fa-regular fa-money-check-pen text-center"
                      style={{ width: "25px" }}
                    ></i>{" "}
                    {t("salesOrders")}{" "}
                    <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                  </>
                }
                common
                className={buttonClass}
                onClick={() => toggleMenu(pageRoutes.allSalesOrders)}
              />
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allSalesOrders]
                    ? "block"
                    : "none",
                }}
              >
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allSalesOrders}/${pageSubRoutes.issued}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allSalesOrders}/${pageSubRoutes.issued}`
                    )
                  }
                >
                  <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                  {t("issuedPl")}
                </ButtonContainer>
                <ButtonContainer
                  className={`${buttonClass} ${
                    menuFocus[
                      `${pageRoutes.allSalesOrders}/${pageSubRoutes.received}`
                    ]
                  }`}
                  common
                  onClick={() =>
                    redirectTo(
                      `${pageRoutes.allSalesOrders}/${pageSubRoutes.received}`
                    )
                  }
                >
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                  {t("receivedPl")}
                </ButtonContainer>
              </div>
            </>
          )}
        {RolesForSection.statistics[typeID] &&
          entityType != EntityType.PERSON && (
            <ButtonContainer
              children={
                <>
                  <i className="fa-regular fa-chart-line text-center i-btn"></i>{" "}
                  {t("statistics")}
                </>
              }
              common
              className={`${buttonClass} ${menuFocus[pageRoutes.statistics]}`}
              onClick={() => redirectTo(`${pageRoutes.statistics}`)}
            />
          )}
      </div>
      {/* <div className="menu-tc-2 t-flex">
        <ButtonContainer
          children={
            <>
              <i className="fa-regular fa-crown"></i> {t("premium")}
            </>
          }
          common
          className="btn btn-default wd-100"
        />
        <ButtonContainer
          children={
            <>
              <i className="fa-regular fa-plus"></i> {t("add")}
            </>
          }
          common
          className="btn btn-white wd-100"
        />
      </div> */}
      <div className="menu-tc-3 t-flex">
        <ButtonContainer
          children={
            <>
              <i className="fa-solid fa-circle-question text-center i-btn"></i>{" "}
              {t("support")}
            </>
          }
          common
          className={"btn btn-white wd-100"}
        />
        {/* <ButtonContainer
          children={
            <>
              <i className="fa-regular fa-gear text-center i-btn"></i>{" "}
              {t("settings")}
            </>
          }
          common
          className={buttonClass}
        /> */}
      </div>
    </div>
  );
}
