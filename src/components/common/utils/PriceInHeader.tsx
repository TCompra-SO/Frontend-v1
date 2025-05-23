import { useContext } from "react";
import { ListsContext } from "../../../contexts/ListsContext";

interface PriceInHeaderProps {
  coin: number;
  price: number;
  useOfferClass: boolean;
}

export default function PriceInHeader(props: PriceInHeaderProps) {
  const context = useContext(ListsContext);
  const { currencyData } = context;

  return (
    <b className={props.useOfferClass ? "precio-oferta" : "precio-req"}>
      {currencyData && currencyData[props.coin]
        ? currencyData[props.coin].alias
        : null}
      {props.price}
    </b>
  );
}
