import {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { pageRoutes, pageSubRoutes } from "../../../utilities/routes";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { RolesForSection } from "../../../utilities/roles";
import {
  getLastSegmentFromRoute,
  getPenultimateSegmentFromRoute,
  getSectionFromRoute,
} from "../../../utilities/globalFunctions";
import { EntityType, RequirementType } from "../../../utilities/types";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import { sectionIcons } from "../../../utilities/colors";

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
  changeShowMenu: (show: boolean) => void;
}

export default function Sidebar(props: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const typeID = useSelector((state: MainState) => state.user.typeID);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const { globalNumUnreadMessages } = useContext(MainSocketsContext);
  const [menuStyle] = useState<CSSProperties>({ display: "inherit" });
  const [focusExists, setFocusExists] = useState(false);
  const [pathname, setPathname] = useState("");
  const buttonClass: string = "btn btn-transparent wd-100 text-left";
  const [menuVisibility, setMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [menuFocus, setMenuFocus] = useState<{
    [key: string]: string;
  }>({});

  /** Mostrar en sidebar sección actual */

  useEffect(() => {
    if (!focusExists || location.pathname != pathname) {
      const section = getSectionFromRoute(location.pathname);
      let middleSegment: string | undefined = getPenultimateSegmentFromRoute(
        location.pathname
      );
      if (Object.values(pageRoutes).includes("/" + middleSegment))
        middleSegment = undefined;
      const segment = getLastSegmentFromRoute(location.pathname);
      if (section in menuToggles) {
        if (menuToggles[section]?.hasSubsection)
          toggleMenu(section, true, middleSegment);
        focusMenu(
          `${section}${
            menuToggles[section]?.hasSubsection
              ? middleSegment
                ? `/${middleSegment}/${segment}`
                : `/${segment}`
              : ""
          }`
        );
      }
      setFocusExists(true);
    }
    setPathname(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  /** Funciones */

  function toggleMenu(
    menuId: string,
    firstRender?: boolean,
    middleSegment?: string
  ) {
    setFocusExists(true);
    setMenuVisibility((prevVisibility) => {
      if (middleSegment)
        return {
          ...prevVisibility,
          [`${menuId}/${middleSegment}`]: firstRender
            ? true
            : !prevVisibility[`${menuId}/${middleSegment}`],
          [menuId]: firstRender ? true : !prevVisibility[menuId],
        };
      else
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

  function getMenuButton(
    forDropdown: boolean,
    route: string,
    icon: ReactNode,
    text: string,
    icon2?: ReactNode,
    numberToShow?: number
  ) {
    return (
      <ButtonContainer
        className={`${buttonClass} ${forDropdown ? "" : menuFocus[route]}`}
        common
        onClick={() => {
          forDropdown ? toggleMenu(route) : redirectTo(route);
        }}
      >
        {icon} {text} {icon2}{" "}
        {numberToShow && numberToShow > 0 ? (
          <div className="chat-notf">
            {numberToShow > 100 ? "99+" : numberToShow}
          </div>
        ) : null}
      </ButtonContainer>
    );
  }

  return (
    <div
      className="col-menu t-flex"
      style={props.showMenu ? menuStyle : undefined}
    >
      {props.showMenu && (
        <i
          className="fa-solid fa-circle-xmark btn-close"
          onClick={() => props.changeShowMenu(false)}
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
        {RolesForSection.profile[typeID] &&
          getMenuButton(
            false,
            pageRoutes.profile,
            <i className="fa-regular fa-user-pen text-center i-btn" />,
            t("myProfile")
          )}
        {RolesForSection.myRequirements[typeID] && (
          <>
            {getMenuButton(
              true,
              pageRoutes.myRequirements,
              <i
                className={`${sectionIcons["requirement"]} text-center i-btn`}
              ></i>,
              t("myRequirements"),
              <i className="fa-solid fa-chevron-down i-sub text-center"></i>
            )}
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myRequirements]
                  ? "block"
                  : "none",
              }}
            >
              {getMenuButton(
                false,
                `${pageRoutes.myRequirements}/${pageSubRoutes.goods}`,
                <i
                  className={`${
                    sectionIcons[RequirementType.GOOD]
                  } text-center i-btn`}
                ></i>,
                t("goods")
              )}
              {getMenuButton(
                false,
                `${pageRoutes.myRequirements}/${pageSubRoutes.services}`,
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                t("services")
              )}
              {getMenuButton(
                false,
                `${pageRoutes.myRequirements}/${pageSubRoutes.sales}`,
                <i className="fa-regular fa-basket-shopping text-center i-btn"></i>,
                t("sales")
              )}
            </div>
          </>
        )}
        {RolesForSection.myOffers[typeID] && (
          <>
            {getMenuButton(
              true,
              pageRoutes.myOffers,
              <i className={`${sectionIcons["offer"]} text-center i-btn`}></i>,
              t("myOffers"),
              <i className="fa-solid fa-chevron-down i-sub text-center"></i>
            )}
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myOffers] ? "block" : "none",
              }}
            >
              {getMenuButton(
                false,
                `${pageRoutes.myOffers}/${pageSubRoutes.goods}`,
                <i
                  className={`${
                    sectionIcons[RequirementType.GOOD]
                  } text-center i-btn`}
                ></i>,
                t("goods")
              )}
              {getMenuButton(
                false,
                `${pageRoutes.myOffers}/${pageSubRoutes.services}`,
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                t("services")
              )}
              {getMenuButton(
                false,
                `${pageRoutes.myOffers}/${pageSubRoutes.sales}`,
                <i className="fa-regular fa-basket-shopping text-center i-btn"></i>,
                t("sales")
              )}
            </div>
          </>
        )}
        {RolesForSection.myPurchaseOrders[typeID] && (
          <>
            {getMenuButton(
              true,
              pageRoutes.myPurchaseOrders,
              <i className="fa-regular fa-file-contract text-center i-btn"></i>,
              t("myPurchaseOrdersAbb"),
              <i className="fa-solid fa-chevron-down i-sub text-center"></i>
            )}
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.myPurchaseOrders]
                  ? "block"
                  : "none",
              }}
            >
              {getMenuButton(
                true,
                `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}`,
                <i className={`${sectionIcons["sent"]} text-center i-btn`}></i>,
                t("issuedPl"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}`
                  ]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}/${pageSubRoutes.goods}`,
                  <i
                    className={`${
                      sectionIcons[RequirementType.GOOD]
                    } text-center i-btn`}
                  ></i>,
                  t("goods")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}/${pageSubRoutes.services}`,
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                  t("services")
                )}
              </div>
              {getMenuButton(
                true,
                `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}`,
                <i
                  className={`${sectionIcons["received"]} text-center i-btn`}
                ></i>,
                t("receivedPl"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}`
                  ]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}/${pageSubRoutes.goods}`,
                  <i
                    className={`${
                      sectionIcons[RequirementType.GOOD]
                    } text-center i-btn`}
                  ></i>,
                  t("goods")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.received}/${pageSubRoutes.services}`,
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                  t("services")
                )}
              </div>
            </div>
          </>
        )}
        {RolesForSection.mySalesOrders[typeID] && (
          <>
            {getMenuButton(
              true,
              pageRoutes.mySalesOrders,
              <i className="fa-regular fa-file-invoice text-center i-btn"></i>,
              t("mySalesOrdersAbb"),
              <i className="fa-solid fa-chevron-down i-sub text-center"></i>
            )}
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[pageRoutes.mySalesOrders]
                  ? "block"
                  : "none",
              }}
            >
              {getMenuButton(
                false,
                `${pageRoutes.mySalesOrders}/${pageSubRoutes.issued}`,
                <i
                  className={`${
                    sectionIcons[RequirementType.GOOD]
                  } text-center i-btn`}
                ></i>,
                t("issuedPl")
              )}
              {getMenuButton(
                false,
                `${pageRoutes.mySalesOrders}/${pageSubRoutes.received}`,
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                t("receivedPl")
              )}
            </div>
          </>
        )}
        {RolesForSection.chat[typeID] &&
          getMenuButton(
            false,
            `${pageRoutes.chat}`,
            <i className="fa-regular fa-comment text-center i-btn"></i>,
            t("chatSection"),
            undefined,
            globalNumUnreadMessages
          )}
        {RolesForSection.users[typeID] &&
          entityType != EntityType.PERSON &&
          getMenuButton(
            false,
            `${pageRoutes.users}`,
            <i className="fa-regular fa-users text-center i-btn"></i>,
            t("createUsers")
          )}
        {RolesForSection.allRequirements[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              {getMenuButton(
                true,
                pageRoutes.allRequirements,
                <i className="fa-regular fa-paste text-center i-btn"></i>,
                t("requirements"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allRequirements]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.allRequirements}/${pageSubRoutes.goods}`,
                  <i
                    className={`${
                      sectionIcons[RequirementType.GOOD]
                    } text-center i-btn`}
                  ></i>,
                  t("goods")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.allRequirements}/${pageSubRoutes.services}`,
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                  t("services")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.allRequirements}/${pageSubRoutes.sales}`,
                  <i className="fa-regular fa-basket-shopping text-center i-btn"></i>,
                  t("sales")
                )}
              </div>
            </>
          )}
        {RolesForSection.allOffers[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              {getMenuButton(
                true,
                pageRoutes.allOffers,
                <i className="fa-regular fa-ballot-check text-center i-btn"></i>,
                t("offers"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allOffers]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.allOffers}/${pageSubRoutes.goods}`,
                  <i
                    className={`${
                      sectionIcons[RequirementType.GOOD]
                    } text-center i-btn`}
                  ></i>,
                  t("goods")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.allOffers}/${pageSubRoutes.services}`,
                  <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                  t("services")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.allOffers}/${pageSubRoutes.sales}`,
                  <i className="fa-regular fa-basket-shopping text-center i-btn"></i>,
                  t("sales")
                )}
              </div>
            </>
          )}
        {RolesForSection.certificates[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              {getMenuButton(
                true,
                pageRoutes.certificates,
                <i
                  className={`${sectionIcons["certificate"]} text-center i-btn`}
                ></i>,
                t("certificates"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.certificates]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.certificates}/${pageSubRoutes.documents}`,
                  <i
                    className={`${sectionIcons["myCertificates"]} text-center i-btn`}
                  ></i>,
                  t("myDocuments")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.certificates}/${pageSubRoutes.sent}`,
                  <i
                    className={`${sectionIcons["sent"]} text-center i-btn`}
                  ></i>,
                  t("sentPl")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.certificates}/${pageSubRoutes.received}`,
                  <i
                    className={`${sectionIcons["received"]} text-center i-btn`}
                  ></i>,
                  t("receivedPlMasc")
                )}
              </div>
            </>
          )}
        {RolesForSection.allPurchaseOrders[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              {getMenuButton(
                true,
                pageRoutes.allPurchaseOrders,
                <i
                  className="fa-regular fa-money-check-pen text-center"
                  style={{ width: "25px" }}
                ></i>,
                t("purchaseOrders"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allPurchaseOrders]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  true,
                  `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}`,
                  <i
                    className={`${sectionIcons["sent"]} text-center i-btn`}
                  ></i>,
                  t("issuedPl"),
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                )}
                <div
                  className="sub-menu t-flex"
                  style={{
                    display: menuVisibility[
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}`
                    ]
                      ? "block"
                      : "none",
                  }}
                >
                  {getMenuButton(
                    false,
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}/${pageSubRoutes.goods}`,
                    <i
                      className={`${
                        sectionIcons[RequirementType.GOOD]
                      } text-center i-btn`}
                    ></i>,
                    t("goods")
                  )}
                  {getMenuButton(
                    false,
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}/${pageSubRoutes.services}`,
                    <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                    t("services")
                  )}
                </div>
                {getMenuButton(
                  true,
                  `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}`,
                  <i
                    className={`${sectionIcons["received"]} text-center i-btn`}
                  ></i>,
                  t("receivedPl"),
                  <i className="fa-solid fa-chevron-down i-sub text-center"></i>
                )}
                <div
                  className="sub-menu t-flex"
                  style={{
                    display: menuVisibility[
                      `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}`
                    ]
                      ? "block"
                      : "none",
                  }}
                >
                  {getMenuButton(
                    false,
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}/${pageSubRoutes.goods}`,
                    <i
                      className={`${
                        sectionIcons[RequirementType.GOOD]
                      } text-center i-btn`}
                    ></i>,
                    t("goods")
                  )}
                  {getMenuButton(
                    false,
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.received}/${pageSubRoutes.services}`,
                    <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>,
                    t("services")
                  )}
                </div>
              </div>
            </>
          )}
        {RolesForSection.allSalesOrders[typeID] &&
          entityType != EntityType.PERSON && (
            <>
              {getMenuButton(
                true,
                pageRoutes.allSalesOrders,
                <i
                  className="fa-regular fa-money-check-dollar-pen text-center"
                  style={{ width: "25px" }}
                ></i>,
                t("salesOrders"),
                <i className="fa-solid fa-chevron-down i-sub text-center"></i>
              )}
              <div
                className="sub-menu t-flex"
                style={{
                  display: menuVisibility[pageRoutes.allSalesOrders]
                    ? "block"
                    : "none",
                }}
              >
                {getMenuButton(
                  false,
                  `${pageRoutes.allSalesOrders}/${pageSubRoutes.issued}`,
                  <i
                    className={`${sectionIcons["sent"]} text-center i-btn`}
                  ></i>,
                  t("issuedPl")
                )}
                {getMenuButton(
                  false,
                  `${pageRoutes.allSalesOrders}/${pageSubRoutes.received}`,
                  <i
                    className={`${sectionIcons["received"]} text-center i-btn`}
                  ></i>,
                  t("receivedPl")
                )}
              </div>
            </>
          )}
        {RolesForSection.statistics[typeID] &&
          entityType != EntityType.PERSON &&
          getMenuButton(
            false,
            `${pageRoutes.statistics}`,
            <i className="fa-regular fa-chart-line text-center i-btn"></i>,
            t("statistics")
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
      {/* <div className="menu-tc-3 t-flex"> */}
      {/* <ButtonContainer
          children={
            <>
              <i className="fa-solid fa-circle-question text-center i-btn"></i>{" "}
              {t("support")}
            </>
          }
          common
          className={"btn btn-white wd-100"}
        /> */}
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
      {/* </div> */}
    </div>
  );
}
