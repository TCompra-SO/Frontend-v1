import { Collapse } from "antd"
import { OfferListItem } from "../../../models/MainInterfaces"
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader"
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
const { Panel } = Collapse;

interface RequirementOfferListProps {
  offers: OfferListItem[]
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  return (
    <>
    <Collapse 
      accordion
      ghost
      bordered={false}
    >
    {
      props.offers.map((offer: OfferListItem) => {
        return (
          <Panel 
            key={offer.key} 
            showArrow={false}
            header={
              <RequirementOfferListItemHeader 
                offer={offer}
              />
            }
            style={{margin: '-12px -16px'}}
          >
            <RequirementOfferListItemBody offer={offer}/>
          </Panel>
        )
      })
    }
    </Collapse>
    </>
  )
}
