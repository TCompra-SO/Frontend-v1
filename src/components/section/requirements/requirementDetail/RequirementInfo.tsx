import { Col, Flex, Row } from "antd";
import ImageContainer from "../../../containers/ImageContainer";
import TagContainer from "../../../containers/TagContainer";
import RatingContainer from "../../../containers/RatingContainer";
import ParagraphContainer from "../../../containers/ParagraphContainer";
import PriceContainer from "../../../containers/PriceContainer";
import {
  darkColor,
  darkerGray,
  gray,
  lightColor,
} from "../../../../utilities/colors";
import { RequirementType } from "../../../../utilities/types";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

interface RequirementInfoProps {
  requirement: RequirementTableItem;
}

export default function RequirementInfo(props: RequirementInfoProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="t-flex gap-15 requerimiento-o">
        <ImageContainer
          src={
            props.requirement.image && props.requirement.image.length > 0
              ? props.requirement.image[1]
              : "/src/assets/images/logo-white.svg"
          }
          className="portada-detalle"
        />
      </div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <ImageContainer
            src={
              props.requirement.image && props.requirement.image.length > 0
                ? props.requirement.image[1]
                : "https://placehold.co/300x300"
            }
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Flex justify="flex-start" align="center">
            <TagContainer
              isRequirementTag
              type={props.requirement.type}
            ></TagContainer>
            <RatingContainer
              readOnly={true}
              score={
                props.requirement.type == RequirementType.SALE
                  ? props.requirement.user.sellerScore
                  : props.requirement.user.customerScore
              }
              style={{ marginLeft: "8px" }}
            ></RatingContainer>
          </Flex>
          <ParagraphContainer
            text={props.requirement.description}
            rows={3}
            expandable
            style={{ margin: "5px 0", textAlign: "justify" }}
          />
          <Flex wrap gap="small" align="center">
            <PriceContainer
              price={props.requirement.price}
              coin={props.requirement.coin}
            />
            <TagContainer
              text={props.requirement.user.name}
              color={lightColor}
              truncateText
              style={{ color: darkColor, fontWeight: "bold", height: "24px" }}
            />
            {props.requirement.subUser && (
              <TagContainer
                text={props.requirement.subUser.name}
                color={lightColor}
                truncateText
                style={{ color: darkColor, fontWeight: "bold", height: "24px" }}
              />
            )}
            <TagContainer
              label={t("deliveryTime")}
              text="2 días"
              color={gray}
              style={{ color: darkerGray, fontWeight: "bold", height: "24px" }}
            />
            <TagContainer
              label={t("expirationDate")}
              text="23-08-2024"
              color={gray}
              style={{ color: darkerGray, fontWeight: "bold", height: "24px" }}
            />
          </Flex>
        </Col>
      </Row>
    </>
  );
}
