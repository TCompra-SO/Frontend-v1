import { useContext } from "react";
import { ListsContext } from "../../contexts/listsContext";
import { Coins } from "../../utilities/types";

interface PriceInHeaderProps {
  coin: number;
  price: number;
  useOfferClass: boolean;
}

export default function PriceInHeader(props: PriceInHeaderProps) {
  const context = useContext(ListsContext);
  const { currencyList } = context;

  return (
    <b className={props.useOfferClass ? "precio-oferta" : "precio-req"}>
      {currencyList && currencyList[props.coin]
        ? Coins[currencyList[props.coin].alias]
        : null}
      {props.price}
    </b>
  );
}
