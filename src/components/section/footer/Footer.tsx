import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import logoWhite from "../../../assets/images/logo-white.svg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer-h t-flex f-column j-items gap-10">
      <div className="wd-100 cont-prime">
        <div className="footer-s2">
          <div className="min-menu t-flex gap-5">
            <img src={logoWhite} alt="" height="55" />
          </div>

          <div className="copyright" style={{ opacity: 1 }}>
            <a href={`${import.meta.env.VITE_LANDING_PAGE}`} target="_blank">
              <button className="btn btn-default">
                <span className="req-btn-info">{t("start")}</span>{" "}
                <i className="far fa-arrow-right"></i>
              </button>
            </a>
          </div>
        </div>
        <hr className="wd-100 hr-cl-fo"></hr>
        <div className="footer-s1">
          <div className="t-flex f-column gap-20 f-redes">
            <div className="t-filtro">
              <i className="fa-regular fa-arrow-right-from-arc"></i>{" "}
              {t("aboutUs")}
            </div>

            <div className="nos-item">{t("footerText")}</div>

            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <a href="https://www.facebook.com/Tcompra/" target="redes">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="https://www.instagram.com/tcompralatam/" target="redes">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="https://www.tiktok.com/@tcompra" target="redes">
                <i className="fab fa-tiktok"></i>
              </a>

              <a
                href="https://www.youtube.com/channel/UCMllmt4Yz6googZOS9qPlLA"
                target="redes"
              >
                <i className="fab fa-youtube"></i>
              </a>

              <a href="https://www.linkedin.com/company/tcompra" target="redes">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="t-flex f-column gap-20">
            <div className="t-filtro">
              <i className="fa-regular fa-arrow-right-from-arc"></i>{" "}
              {t("policies")}
            </div>

            <ul className="list-items">
              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}aboutUs/`}
                  target="_blank"
                >
                  {t("aboutUs")}
                </a>
              </li>

              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}politics/`}
                  target="_blank"
                >
                  {t("privacyPolicy")}
                </a>
              </li>

              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}terms/`}
                  target="_blank"
                >
                  {t("termsAndConditions")}
                </a>
              </li>

              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}liquidations/`}
                  target="_blank"
                >
                  {t("sale")}
                </a>
              </li>
            </ul>
          </div>

          <div className="t-flex f-column gap-20">
            <div className="t-filtro">
              <i className="fa-regular fa-arrow-right-from-arc"></i> {t("help")}
            </div>

            <ul className="list-items">
              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}questions/`}
                  target="_blank"
                >
                  {t("FAQ")}
                </a>
              </li>

              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}howPay/`}
                  target="_blank"
                >
                  {t("howToBuy")}
                </a>
              </li>

              <li>
                <a
                  href={`${import.meta.env.VITE_LANDING_PAGE}howSale/`}
                  target="_blank"
                >
                  {t("howToSell")}
                </a>
              </li>

              {/* <li>
                <a href={`${import.meta.env.VITE_LANDING_PAGE}aboutUs/`}
                  target="_blank">{t("customerService")}</a>
              </li> */}
            </ul>
          </div>

          <div className="t-flex f-column gap-20">
            <div className="t-filtro">
              <i className="fa-regular fa-arrow-right-from-arc"></i>{" "}
              {t("contactUs")}
            </div>

            <div className="contact-info-area">
              <div className="contact-items">
                <div className="icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="content">
                  <a href="mailto:info@tcompra.com" className="link">
                    info@tcompra.com
                  </a>
                </div>
              </div>

              <div className="contact-items">
                <div className="icon">
                  <i className="fa-regular fa-phone-alt"></i>
                </div>

                <div className="content">
                  <a href="tel:+51987456321">(+51) 987456321</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="wd-100 hr-se-fo" />
        <div className="footer-s2">
          <div className="min-menu t-flex gap-5">
            <a href="videos.html" className="foo-a">
              <i className="fa-regular fa-video"></i> {t("videos")}
            </a>
          </div>

          <div className="copyright">
            © {dayjs().year()} Tcompra.com. {t("allRightsReserved")}
          </div>
        </div>
      </div>
    </div>
  );
}
