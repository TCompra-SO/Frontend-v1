import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation(); // check links

  return (
    <div className="footer-h t-flex f-column gap-10">
      <div className="footer-s1">
        <img src={"/src/assets/images/logo-white.svg"} alt="" />
        <div className="t-flex gap-10 f-redes">
          <a href="https://www.facebook.com/Tcompra/" target="redes">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/tcompralatam/" target="redes">
            <i className="fab fa-instagram"></i>
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
      <hr className="wd-100" style={{ opacity: 0.3 }} />
      <div className="footer-s2">
        <div className="copyright">
          © {dayjs().year()} Tcompra.com. {t("allRightsReserved")}
        </div>
        <div className="min-menu t-flex gap-5">
          <a href="#">{t("aboutUs")}</a>
          <div>|</div>
          <a href="#">{t("FAQ")}</a>
        </div>
      </div>
    </div>
  );
}