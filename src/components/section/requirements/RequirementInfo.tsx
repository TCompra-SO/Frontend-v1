import { Col, Flex, Row } from "antd";
import ImageContainer from "../../containers/ImageContainer";
import TagContainer from "../../containers/TagContainer";
import RatingContainer from "../../containers/RatingContainer";
import ParagraphContainer from "../../containers/ParagraphContainer";
import PriceContainer from "../../containers/PriceContainer";
import { darkColor, lightColor } from "../../../utilities/colors";
import { RequirementType } from "../../../utilities/types";

export default function RequirementInfo() {
  return (
    <Row gutter={[10,10]}>

      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <ImageContainer
          alt="imagen"
          src="https://placehold.co/300x300"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Col>
      
      <Col xs={24} sm={24} md={18} lg={18} xl={18}
      > 
        <Flex justify='flex-start' align='center'>
          <TagContainer isRequirementTag type={RequirementType.GOOD}></TagContainer>
          <RatingContainer readOnly={true} score={4.5}></RatingContainer>  
        </Flex>  
        <ParagraphContainer 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque augue massa, dictum tempus turpis pellentesque ac. Suspendisse potenti. Cras pharetra augue eget fermentum mattis. Donec non molestie ipsum. Nunc sed condimentum ante, sed pulvinar elit. Sed a ligula at mi dapibus consequat et vel arcu. Pellentesque mauris lectus, imperdiet eu suscipit vehicula, lacinia ut lorem. Curabitur in diam nec felis tempor maximus vel a ligula. Integer sit amet diam tellus.'
          rows={2}
          style={{margin: '5px 0'}}
        />
        <Flex wrap gap="small" align="center">
          <PriceContainer price={3434} coin="$"/>
          <TagContainer
            text="SOLUCIONES ONLINE SAC"
            color={lightColor}
            truncateText
            style={{color: darkColor, fontWeight: 'bold', height: '24px'}}
          />
          <TagContainer
            label="Tiempo de entrega"
            text="2 días"
            color='#e8e8e8'
            style={{color: '#6e6e6e', fontWeight: 'bold', height: '24px'}}
          />
          <TagContainer
            label="Fecha de expiración"
            text="23-08-2024"
            color='#e8e8e8'
            style={{color: '#6e6e6e', fontWeight: 'bold', height: '24px'}}
          />
        </Flex>
      </Col>
    </Row>
  )
}
