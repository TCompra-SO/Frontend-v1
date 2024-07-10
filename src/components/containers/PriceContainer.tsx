import { primaryColor } from "../../utilities/colors"

interface PriceContainerProps {
  price: number,
  coin: string
}

export default function PriceContainer(props: PriceContainerProps) {
  return (
    <div style={{fontSize: '22px', color: primaryColor, fontWeight: '700', margin: '0'}}>
      {props.coin} {props.price}
    </div>
  )
}
