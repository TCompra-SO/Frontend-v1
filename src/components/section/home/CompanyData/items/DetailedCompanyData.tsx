import { useTranslation } from "react-i18next";
import { FullUser } from "../../../../../models/MainInterfaces";
import { ReactNode, useContext } from "react";
import { ListsContext } from "../../../../../contexts/ListsContext";
import { Tooltip } from "antd";
import { defaultCountry } from "../../../../../utilities/globals";
import { DocType, EntityType } from "../../../../../utilities/types";

function CategoryData({
  name,
  index,
  length,
}: {
  name: string;
  index: number;
  length: number;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`card-datos-emp t-flex gap-10 ${
        index == length - 1 ? "em-b" : ""
      }`}
    >
      <div className="i-rubro-2">
        <i className="fa-regular fa-layer-group"></i>
      </div>
      <div className="oferta-usuario col-documento">
        <div className="text-truncate rubro-1">
          {t("category")} {index + 1}
        </div>

        <div className="text-truncate rubro-2">
          <Tooltip title={name} open={name !== "-" ? undefined : false}>
            {name}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function OtherData({
  value,
  icon,
  label,
  expand,
}: {
  value: string | number;
  label: string;
  icon: ReactNode;
  expand?: boolean;
}) {
  return (
    <div
      className={`card-white t-flex gap-10 datos-empresa-2 ${
        expand ? "em-b" : ""
      }`}
    >
      <div className="icon-datos-e">{icon}</div>
      <div className="oferta-usuario col-documento">
        <div className="text-truncate datosem-1">{label}</div>
        <div className="text-truncate datosem-2">{value}</div>
      </div>
    </div>
  );
}

interface DetailedCompanyDataProps {
  user: FullUser;
}

export default function DetailedCompanyData(props: DetailedCompanyDataProps) {
  const { t } = useTranslation();
  const { categoryData, countryData } = useContext(ListsContext);

  return (
    <>
      {props.user.aboutMe && (
        <div className="about-me t-flex j-items j-conten">
          {t("aboutMe")}: {props.user.aboutMe}
        </div>
      )}
      <div className="t-flex gap-15 em-1">
        {props.user.categories.map((cat, i) => (
          <CategoryData
            key={cat}
            name={categoryData[cat] ? categoryData[cat].value : "-"}
            index={i}
            length={props.user.categories.length}
          />
        ))}
      </div>
      <div className="t-flex gap-15 em-2">
        <OtherData
          value={
            countryData[defaultCountry]?.cities.find(
              (val) => val.id == props.user.cityID
            )?.value ?? ""
          }
          label={t("location")}
          icon={<i className="fa-regular fa-map-marked-alt"></i>}
        />
        <OtherData
          value={props.user.document}
          label={
            props.user.typeEntity == EntityType.PERSON
              ? DocType.DNI
              : DocType.RUC
          }
          icon={<i className="fa-regular fa-building"></i>}
        />
        {props.user.tenure && (
          <OtherData
            value={`${props.user.tenure} ${t("years").toLowerCase()}`}
            label={t("tenure")}
            icon={<i className="fa-regular fa-university"></i>}
            expand
          />
        )}
      </div>
    </>
  );
}
