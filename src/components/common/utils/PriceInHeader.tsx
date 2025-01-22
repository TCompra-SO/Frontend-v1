import { useContext } from "react";
import { ListsContext } from "../../../contexts/ListsContext";
import { Coins } from "../../../utilities/types";

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
        ? Coins[currencyData[props.coin].alias]
        : null}
      {props.price}
    </b>
  );
}
