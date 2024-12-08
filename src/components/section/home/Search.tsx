import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import ButtonContainer from "../../containers/ButtonContainer";

export default function Search() {
  const { t } = useTranslation(); // r3v check numbers

  return (
    <>
      <div className="text-center t-flex f-column gap-20 slider-desc">
        <div className="home-t ht-s1">
          <h2 className="m-0">{t("homeTitle")}</h2>
          <h3 className="m-0">{t("homeSubtitle")}</h3>
        </div>
        <div className="t-flex gap-10 ht-s2">
          <InputContainer
            type="text"
            className="form-control form-buscar"
            placeholder={t("search")}
          />
          <ButtonContainer className="btn btn-default">
            <i className="fa-regular fa-search"></i>
          </ButtonContainer>
        </div>
        <div className="text-left t-flex gap-10 ht-s3">
          <div className="t-flex count-req gap-10">
            <div className="icon-home">
              <i className="fa-regular fa-dolly"></i>
            </div>
            <div className="oferta-usuario col-documento-2">
              <div className="text-truncate ti-1">100</div>
              <div className="text-truncate ti-2">{t("goods")}</div>
            </div>
          </div>
          <div className="t-flex count-req gap-10">
            <div className="icon-home">
              <i className="fa-regular fa-hand-holding-magic"></i>
            </div>
            <div className="oferta-usuario col-documento-2">
              <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                100
              </div>
              <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                {t("services")}
              </div>
            </div>
          </div>
          <div className="t-flex count-req gap-10">
            <div className="icon-home">
              <i className="fa-regular fa-basket-shopping"></i>
            </div>
            <div className="oferta-usuario col-documento-2">
              <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                100
              </div>
              <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                {t("sales")}
              </div>
            </div>
          </div>
          {/* <div className="t-flex count-req gap-10">
            <div className="icon-home">
              <i className="fa-regular fa-user-tie"></i>
            </div>
            <div className="oferta-usuario col-documento-2">
              <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                100
              </div>
              <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                RR.HH
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="section-slider t-flex j-conten j-items"></div>
    </>
  );
}
