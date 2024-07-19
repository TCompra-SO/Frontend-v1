import { Collapse } from "antd";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
import { OfferFilters } from "../../../models/Interfaces";
const { Panel } = Collapse;

interface RequirementOfferListProps {
  offers: OfferListItem[];
  requirement: RequirementTableItem;
  offerFilters: OfferFilters;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  // const collapseItems: CollapseProps['items'] = props.offers.map((offer: OfferListItem) => {
  //   return {
  //     key: offer.key,
  //     children: (
  //       <Panel
  //           key={offer.key}
  //           showArrow={false}
  //           header={
  //             <RequirementOfferListItemHeader
  //               offer={offer}
  //             />
  //           }
  //           style={{margin: '-12px -16px'}}
  //         >
  //           <RequirementOfferListItemBody offer={offer}/>
  //         </Panel>
  //     )
  //   }
  // });

  // const list = useState<CollapseProps['items']>(collapseItems);

  return (
    <>
      <Collapse
        accordion
        ghost
        bordered={false}
        // items={list}
      >
        {props.offers.map((offer: OfferListItem) => {
          return (
            <Panel
              key={offer.key}
              showArrow={false}
              header={<RequirementOfferListItemHeader offer={offer} />}
              style={{ margin: "-12px -16px" }}
            >
              <RequirementOfferListItemBody
                offer={offer}
                requirement={props.requirement}
                offerFilters={props.offerFilters}
              />
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
}
