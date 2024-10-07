import { useTranslation } from "react-i18next";
import { FullUser } from "../../models/MainInterfaces";
import { useContext } from "react";
import { ListsContext } from "../../contexts/listsContext";
import { Tooltip } from "antd";

interface UserInfoModalProps {
  user: FullUser;
}

export default function UserInfoModal(props: UserInfoModalProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { categoryData } = context;

  return (
    <div className="modal-card">
      <div className="t-flex gap-15 f-column">
        <div className="card-white card-d1">
          <div className="user-name">{props.user.name}</div>
          <div className="t-flex gap-10 datos-conacto">
            <div className="t-flex oferta-titulo doc-botones">
              <div className="icon-doc-estado i-datos">
                <i className="fa-regular fa-location-dot"></i>
              </div>
              <div className="oferta-usuario col-documento">
                <div className="text-truncate dato-contact1">
                  {t("address")}
                </div>
                <Tooltip title={props.user.address}>
                  <div className="text-truncate dato-contact2">
                    {props.user.address}
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="t-flex oferta-titulo doc-botones">
              <div className="icon-doc-estado i-datos">
                <i className="fa-regular fa-mobile"></i>
              </div>
              <div className="oferta-usuario col-documento">
                <div className="text-truncate dato-contact1">{t("phone")}</div>
                <Tooltip title={props.user.phone}>
                  <div className="text-truncate dato-contact2">
                    {props.user.phone}
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="t-flex oferta-titulo doc-botones">
              <div className="icon-doc-estado i-datos">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="oferta-usuario col-documento">
                <div className="text-truncate dato-contact1">{t("email")}</div>
                <Tooltip title={props.user.email}>
                  <div className="text-truncate dato-contact2">
                    {props.user.email}
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {props.user.categories.length && (
          <div className="t-flex gap-15 card-d2">
            {props.user.categories.map((cat: number) => {
              return (
                <div key={cat} className="card-ofertas card-rubros-2">
                  <div className="t-flex oferta-titulo doc-botones">
                    <div className="icon-doc-estado">
                      <i className="fa-regular fa-layer-group"></i>
                    </div>
                    <div className="oferta-usuario col-documento">
                      <div className="text-truncate doc-name">{`${t(
                        "category"
                      )} ${cat + 1}`}</div>
                      <Tooltip
                        title={
                          categoryData[cat] ? categoryData[cat].value : "-"
                        }
                        open={categoryData[cat] ? undefined : false}
                      >
                        <div className="text-truncate detalles-oferta">
                          {categoryData[cat] ? categoryData[cat].value : "-"}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
