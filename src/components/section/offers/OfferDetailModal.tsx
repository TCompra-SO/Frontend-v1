import { OfferListItem } from "../../../models/MainInterfaces";
import { getLabelFromRequirementType } from "../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import SubUserName from "../../common/SubUserName";
import DescriptionParagraph from "../../common/DescriptionParagraph";
import FrontImage from "../../common/FrontImage";

interface OfferDetailModalProps {
  offer: OfferListItem;
}

export default function OfferDetailModal(props: OfferDetailModalProps) {
  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="detalle-oferta">
        <div className="t-flex gap-15 requerimiento-o">
          <FrontImage image={props.offer.image} isUser={false} />
          <div className="t-flex detalle-req">
            <h2 className="titulo-req">{props.offer.title}</h2>
            <div className="t-flex tags-req">
              <div className="badge-default">{props.offer.user.name}</div>
              <SubUserName subUser={props.offer.subUser} />
              <div className="badge-second">
                {t(getLabelFromRequirementType(props.offer.type))}
              </div>
            </div>
            <DescriptionParagraph text={props.offer.description} />
            <div className="t-flex tags-req t-wrap">
              <div className="badge-grey-border">Arequipa</div>
              <div className="badge-grey-border">Publicado: 21/05/2024</div>
              <div className="badge-grey-border">
                Tiempo de entrega: Inmediato
              </div>
            </div>
            <div className="t-flex tags-req t-wrap">
              <b className="precio-req">S/.2000</b>
              <div className="badge-default-border">
                Fecha de Entrega: 18/11/2024
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
          <div className="card-ofertas">
            <div className="t-flex" style={{ alignItems: "center" }}>
              <div className="t-flex oferta-titulo">
                <img src="img/avatar.jpg" className="img-oferta" />
                <div className="oferta-usuario">
                  <div className="oferta-datos t-wrap m-0">
                    <div
                      className="text-truncate usuario-name"
                      style={{ marginRight: "10px" }}
                    >
                      Requerimiento: Oferta de muebles de sala de espera
                      empresarial
                    </div>
                  </div>
                  <div className="t-flex oferta-descripcion">
                    <div className="text-truncate detalles-oferta">
                      Cliente: Angie Gianela Cruz
                    </div>
                  </div>
                </div>
              </div>
              <div className="multimedia-oferta">
                <div className="t-flex multimedia">
                  <div className="t-flex">
                    <i className="fa-regular fa-images multi-datos"></i>
                    <div className="multi-back"></div>
                    <div className="multi-cantidad">10</div>
                  </div>
                  <div className="t-flex">
                    <i className="fa-regular fa-file-lines multi-datos"></i>
                  </div>
                  <div className="t-flex">
                    <i className="fa-regular fa-comment multi-chat"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 estado-oferta">
          <div className="card-red wd-50">
            <i className="fa-solid fa-ban"></i> Oferta Cancelada
          </div>
          <div className="card-gray-m wd-50">
            <i className="fa-regular fa-person-dolly-empty"></i> No Entregado
          </div>
        </div>
        <div className="t-flex gap-15 estado-oferta">
          <div className="card-green wd-50">
            <i className="fa-regular fa-circle-check"></i> Oferta Elegida
          </div>
          <div className="card-gray-m wd-50">
            <i className="fa-regular fa-person-dolly"></i> Entregado
          </div>
        </div>
      </div>
    </div>
  );
}
