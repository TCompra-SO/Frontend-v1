import { Tooltip } from "antd";
import { getScore } from "../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { RateStartCountType } from "../../utilities/types";

interface RateStarCountProps {
  score: number | undefined;
  count: number | undefined;
  type?: RateStartCountType;
}

export default function RateStarCount(props: RateStarCountProps) {
  const { t } = useTranslation();
  const [newScore] = useState(getScore(props.score));
  let label: string = t("noRate");
  if (newScore) {
    if (Number(newScore) > 0 && Number(newScore) <= 1)
      label = t("veryPoorRate");
    else if (Number(newScore) > 1 && Number(newScore) <= 2)
      label = t("poorRate");
    else if (Number(newScore) > 2 && Number(newScore) <= 3)
      label = t("neutralRate");
    else if (Number(newScore) > 3 && Number(newScore) <= 4)
      label = t("goodRate");
    else if (Number(newScore) > 4) label = t("excellentRate");
  }

  if (props.type)
    return (
      <div className="usuario-puntuacion">
        <i className="fa-solid fa-star user-start"></i>
        <Tooltip title={label}>
          <div className="valor-start-2">{newScore}</div>
        </Tooltip>
        <b
          className={
            props.type == RateStartCountType.OFFER_LIST
              ? "user-cantidad"
              : props.type == RateStartCountType.COMPANY_DATA_HOME
              ? "empresa-cantidad"
              : ""
          }
        >
          ({props.count ?? 0})
        </b>
      </div>
    );

  return (
    <div className="puntuacion">
      <i className="fa-solid fa-star p-start"></i>
      <Tooltip title={label}>
        <div className="valor-start">{newScore}</div>
      </Tooltip>
      <b className="p-cantidad">({props.count ?? 0})</b>
    </div>
  );
}
