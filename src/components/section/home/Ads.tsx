import { useTranslation } from "react-i18next";
import sampleVideo from "../../../assets/videos/video.mp4";
// import pub1 from "../../../assets/images/publicidad-01.jpg";
import pub2 from "../../../assets/images/publicidad-02.jpg";
import pub3 from "../../../assets/images/publicidad-03.jpg";

export default function Ads() {
  const { t } = useTranslation();

  return (
    <div className="t-flex f-column gap-20 home-2">
      <div className="titulo req-t m-0">{t("video")}</div>
      <video
        src={sampleVideo}
        width="100%"
        controls
        className="video-pub"
      ></video>
      <div className="titulo req-t">{t("how")}</div>
      <div className="t-flex f-column gap-20 col-publicidad text-center">
        <div className="card-white t-flex f-column gap-5 back-pub-4 j-items">
          <div className="tpub-1">{t("howToBuy")}</div>
          <div className="tpub-2">{t("exchangeGoodsAndServices")}</div>
          <a
            href={`${import.meta.env.VITE_LANDING_PAGE}howPay/`}
            target="_blank"
            className="btn btn-border-white btn-sm t-flex seleccionar-tb"
          >
            {t("seeMore")}
            <i className="fa-regular fa-right"></i>
          </a>
        </div>
        <div className="card-white t-flex f-column gap-5 back-pub-3 j-items">
          <div className="tpub-1">{t("howToSell")}</div>
          <div className="tpub-2">{t("findYourBestSupplier")}</div>
          <a
            href={`${import.meta.env.VITE_LANDING_PAGE}howSale/`}
            target="_blank"
            className="btn btn-border-white btn-sm t-flex seleccionar-tb"
          >
            {t("seeMore")}
            <i className="fa-regular fa-right"></i>
          </a>
        </div>
        <div
          className="card-white t-flex f-column gap-5 back-pub-7"
          style={{ cursor: "default" }}
        >
          <div className="tpub-1">
            ¿{t("needTo")} {t("buy")}?
          </div>
          <div className="tpub-2">{t("supliersOnlineReady")}</div>
        </div>
        <div className="card-white t-flex f-column gap-5 back-pub-8 j-items">
          <div className="tpub-1">
            ¡{t("liquidateYour")} {t("lotsAndStocks")}!
          </div>
          <div className="tpub-2">{t("supliersOnlineReady")}</div>
          <i
            className="fa-solid fa-bag-shopping"
            style={{ fontSize: "40px", marginTop: "10px" }}
          ></i>
          <a
            href={`${import.meta.env.VITE_LANDING_PAGE}liquidations/`}
            target="_blank"
            className="btn btn-border-white btn-sm t-flex seleccionar-tb"
          >
            {t("seeMore")}
            <i className="fa-regular fa-right"></i>
          </a>
        </div>
        {/* <div className="card-white t-flex f-column gap-5 back-pub-1 j-items">
          <div className="tpub-1">{t("membership")}</div>
          <a className="btn btn-border-white btn-sm t-flex seleccionar-tb">
            {t("seeMore")}
            <i className="fa-regular fa-right"></i>
          </a>
        </div> */}
      </div>
      <div className="titulo req-t">{t("advertising")}</div>
      <div className="t-flex f-column gap-20 col-publicidad-2">
        {/* <img src={pub1} alt="Publicidad" className="wd-100 pub-emp" /> */}
        <a
          href="https://enlinea.indecopi.gob.pe/miraaquienlecompras"
          target="_blank"
        >
          <img src={pub2} alt="Publicidad" className="wd-100 pub-emp" />
        </a>
        <img src={pub3} alt="Publicidad" className="wd-100 pub-emp" />
      </div>
    </div>
  );
}
