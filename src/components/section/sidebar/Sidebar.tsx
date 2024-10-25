import { CSSProperties, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import ImageContainer from "../../containers/ImageContainer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pageRoutes, pageSubRoutes } from "../../../utilities/routes";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { RolesForSection } from "../../../utilities/roles";

interface SidebarProps {
  showMenu: boolean;
  onShowMenu: (show: boolean) => void;
}

export default function Sidebar(props: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const typeID = useSelector((state: MainState) => state.user.typeID);
  const [menuStyle] = useState<CSSProperties>({ display: "block" });
  const menuReq: string = "menuReq";
  const menuOff: string = "menuOff";
  const menuPurch: string = "menuPurch";
  const menuAllReq: string = "menuAllReq";
  const menuAllOff: string = "menuAllOff";
  const menuAllPurch: string = "menuAllPurch";
  const menuCert: string = "menuCert";
  const [menuVisibility, setMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const buttonClass: string = "btn btn-transparent wd-100 text-left";

  function toggleMenu(menuId: string) {
    setMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [menuId]: !prevVisibility[menuId],
    }));
  }

  function redirectTo(route: string) {
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
        <ImageContainer
          src="/src/assets/images/logo-white.svg"
          style={{ width: "100%" }}
          preview={false}
          // onClick={() => redirectTo(pageRoutes.home)}
        ></ImageContainer>
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
            className={buttonClass}
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.myOffers}/${pageSubRoutes.goods}`)
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("goods")}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.myOffers}/${pageSubRoutes.services}`)
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("services")}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
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
                  {t("purchaseOrder")}{" "}
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issuedSales}`
                  )
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {`${t("issuedPl")} - ${t("salesAbbrev")}`}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.myPurchaseOrders}/${pageSubRoutes.receivedSales}`
                  )
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {`${t("receivedPl")} - ${t("salesAbbrev")}`}
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
              className={buttonClass}
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.allOffers}/${pageSubRoutes.goods}`)
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {t("goods")}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(`${pageRoutes.certificates}/${pageSubRoutes.sent}`)
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {t("sentPl")}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
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
                    style={{ width: "25px;" }}
                  ></i>{" "}
                  {t("finishedPurchaseOrders")}{" "}
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
                className="btn btn-transparent wd-100 text-left"
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
                className="btn btn-transparent wd-100 text-left"
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
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issuedSales}`
                  )
                }
              >
                <i className="fa-regular fa-dolly text-center i-btn"></i>{" "}
                {`${t("issuedPl")} - ${t("salesAbbrev")}`}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-transparent wd-100 text-left"
                common
                onClick={() =>
                  redirectTo(
                    `${pageRoutes.allPurchaseOrders}/${pageSubRoutes.receivedSales}`
                  )
                }
              >
                <i className="fa-regular fa-hand-holding-magic text-center i-btn"></i>{" "}
                {`${t("receivedPl")} - ${t("salesAbbrev")}`}
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
            className={buttonClass}
            onClick={() => redirectTo(`${pageRoutes.statistics}`)}
          />
        )}
      </div>
      <div className="menu-tc-2 t-flex">
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
      </div>
      <div className="menu-tc-3 t-flex">
        <ButtonContainer
          children={
            <>
              <i className="fa-solid fa-question text-center i-btn"></i>{" "}
              {t("support")}
            </>
          }
          common
          className={buttonClass}
        />
        <ButtonContainer
          children={
            <>
              <i className="fa-regular fa-gear text-center i-btn"></i>{" "}
              {t("settings")}
            </>
          }
          common
          className={buttonClass}
        />
      </div>
    </div>
  );
}
