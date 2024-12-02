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

interface SidebarProps {
  showMenu: boolean;
  onShowMenu: (show: boolean) => void;
}

export default function Sidebar(props: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const typeID = useSelector((state: MainState) => state.user.typeID);
  const [menuStyle] = useState<CSSProperties>({ display: "block" });
  const menuReq: string = "menuReq";
  const menuOff: string = "menuOff";
  const menuPurch: string = "menuPurch";
  const menuSales: string = "menuSales";
  const menuAllReq: string = "menuAllReq";
  const menuAllOff: string = "menuAllOff";
  const menuAllPurch: string = "menuAllPurch";
  const menuAllSales: string = "menuAllSales";
  const menuCert: string = "menuCert";
  const buttonClass: string = "btn btn-transparent wd-100 text-left";
  const [menuVisibility, setMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [menuFocus, setMenuFocus] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    console.log(location.pathname);
    console.log(
      getSectionFromRoute(location.pathname),
      getLastSegmentFromRoute(location.pathname)
    );
  }, [location]);

  /** Funciones */

  function toggleMenu(menuId: string) {
    setMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [menuId]: !prevVisibility[menuId],
    }));
  }

  function focusMenu(menuId: string) {
    setMenuFocus((prev) => {
      const updatedMenuFocus: { [key: string]: string } = {};
      for (const key in prev) {
        updatedMenuFocus[key] = key === menuId ? "focus" : "";
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
              onClick={() => toggleMenu(menuReq)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuReq] ? "block" : "none" }}
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
              onClick={() => toggleMenu(menuOff)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuOff] ? "block" : "none" }}
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
              onClick={() => toggleMenu(menuPurch)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuPurch] ? "block" : "none" }}
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
              onClick={() => toggleMenu(menuSales)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuSales] ? "block" : "none" }}
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
                {t("chat")} <div className="chat-notf">10</div>
              </>
            }
            common
            className={buttonClass}
          />
        )}
        {RolesForSection.users[typeID] && (
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
        {RolesForSection.allRequirements[typeID] && (
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
              onClick={() => toggleMenu(menuAllReq)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuAllReq] ? "block" : "none" }}
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
        {RolesForSection.allOffers[typeID] && (
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
              onClick={() => toggleMenu(menuAllOff)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuAllOff] ? "block" : "none" }}
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
                  menuFocus[`${pageRoutes.allOffers}/${pageSubRoutes.services}`]
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
        {RolesForSection.certificates[typeID] && (
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
              onClick={() => toggleMenu(menuCert)}
            />
            <div
              className="sub-menu t-flex"
              style={{ display: menuVisibility[menuCert] ? "block" : "none" }}
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
                  menuFocus[`${pageRoutes.certificates}/${pageSubRoutes.sent}`]
                }`}
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.certificates}/${pageSubRoutes.sent}`)
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
        {RolesForSection.allPurchaseOrders[typeID] && (
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
              onClick={() => toggleMenu(menuAllPurch)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[menuAllPurch] ? "block" : "none",
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
        {RolesForSection.allSalesOrders[typeID] && (
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
              onClick={() => toggleMenu(menuAllSales)}
            />
            <div
              className="sub-menu t-flex"
              style={{
                display: menuVisibility[menuAllSales] ? "block" : "none",
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
        {RolesForSection.statistics[typeID] && (
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
