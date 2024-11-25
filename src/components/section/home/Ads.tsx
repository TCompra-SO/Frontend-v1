import { useTranslation } from "react-i18next";

export default function Ads() {
  const { t } = useTranslation();

  return (
    <div className="t-flex f-column gap-20 home-2">
      <div className="t-flex f-column gap-20 col-publicidad">
        <div className="card-white t-flex f-column gap-30 back-pub-6">
          <div className="tpub-1">{t("TCompra")}</div>
          <div className="tpub-2">{t("immerseYourselfInBusiness")}</div>
        </div>
        <div className="card-white t-flex f-column gap-30 back-pub-1">
          <div className="tpub-1">{t("membership")}</div>
          <button className="btn btn-white wd-100">{t("viewPlans")}</button>
        </div>
        <div className="card-white t-flex f-column gap-30 back-pub-2">
          <div className="tpub-1">{t("howToBuy")}</div>
          <div className="tpub-2">{t("exchangeGoodsAndServices")}</div>
        </div>
        <div className="card-white t-flex f-column gap-30 back-pub-3">
          <div className="tpub-1">{t("howToSell")}</div>
          <div className="tpub-2">{t("findYourBestSupplier")}</div>
        </div>
        <div className="card-white t-flex f-column gap-30 back-pub-4">
          <div className="tpub-3">
            ¿{t("needTo")} <span>{t("buy")}?</span>
          </div>
          <div className="tpub-2">{t("supliersOnlineReady")}</div>
        </div>
        <div className="card-white t-flex f-column gap-30 back-pub-5">
          <div className="tpub-3">
            ¡{t("liquidateYour")} <span>{t("lotsAndStocks")}!</span>
          </div>
          <div className="tpub-2">{t("supliersOnlineReady")}</div>
        </div>
      </div>
      <div className="titulo req-t">{t("advertising")}</div>
      <div className="t-flex f-column gap-20 col-publicidad-2">
        <img
          src="/src/assets/images/publicidad-01.jpg"
          alt="Publicidad"
          className="wd-100 pub-emp"
        />
        <a href="https://enlinea.indecopi.gob.pe/miraaquienlecompras">
          <img
            src="/src/assets/images/publicidad-02.jpg"
            alt="Publicidad"
            className="wd-100 pub-emp"
          />
        </a>
        <img
          src="/src/assets/images/publicidad-03.jpg"
          alt="Publicidad"
          className="wd-100 pub-emp"
        />
      </div>
    </div>
  );
}
