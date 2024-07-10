import { OfferListItem } from "../../../models/MainInterfaces"
import RequirementOfferListItem from "./RequirementOfferListItem"

interface RequirementOfferListProps {
  offers: OfferListItem[]
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  return (
    <>
    {
      props.offers.map((offer: OfferListItem) => {
        return (
          <RequirementOfferListItem 
            offer={offer}
            style={{
              marginBottom: '10px'
            }}
          />
        )
      })
    }
    </>
  )
}
