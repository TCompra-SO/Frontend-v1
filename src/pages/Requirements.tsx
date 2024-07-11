import { Col, Flex, Row } from 'antd'
import RequirementsTable from '../components/common/RequirementsTable';
import InputContainer from '../components/containers/InputContainer'
import ModalContainer from '../components/containers/ModalContainer';
import { ModalTypes } from '../utilities/types';
import Title from 'antd/es/typography/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleCarryBox } from '@fortawesome/free-solid-svg-icons';
import { primaryColor, lightColor } from '../utilities/colors';
import { SearchOutlined } from '@ant-design/icons';


export default function Requirements() {
  return (
    <>
      <ModalContainer
        type={ModalTypes.DETAILED_REQUIREMENT}
      />
      <div className='table-container-page'>
        <Flex 
          vertical 
          justify="center" 
          align="center" 
          className="table-container" 
          gap='30px'        
        >
          <Row style={{width: '100%'}} gutter={[10,18]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Flex align='center'>
                <FontAwesomeIcon 
                  color={primaryColor}
                  style={{
                    borderRadius: '20px',
                    backgroundColor: lightColor,
                    padding: '5px',
                    marginRight: '8px'
                  }}
                  icon={faPeopleCarryBox}></FontAwesomeIcon>
                <Title level={3} style={{margin: '0'}}>Listado de Bienes</Title>
              </Flex>
              
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputContainer
                placeholder= 'Buscar...'
                prefix={<SearchOutlined/>}
                style={{
                  background: '#f3f7fa',
                  border: '0'
                }}
              />
            </Col>
          </Row>
          
          <RequirementsTable></RequirementsTable>
        </Flex>
    </div>
    </>
  )
}
