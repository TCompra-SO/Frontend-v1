import { Col, Flex, Row } from 'antd'
import RequirementsTable from '../components/common/RequirementsTable';
import InputContainer from '../components/containers/InputContainer'
import ModalContainer from '../components/containers/ModalContainer';
import { Action, ModalTypes, OfferState, RequirementState, RequirementType, UserTable } from '../utilities/types';
import Title from 'antd/es/typography/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleCarryBox } from '@fortawesome/free-solid-svg-icons';
import { primaryColor, lightColor } from '../utilities/colors';
import { SearchOutlined } from '@ant-design/icons';
import { OfferListItem, RequirementTableItem } from '../models/MainInterfaces';
import { useState } from 'react';

const requirements: RequirementTableItem[] = [
  {
    key: '1',
    title: 'Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20',
    category: 'Informática',
    coin: '$',
    price: 5500,
    numberOffers: 999,
    state: RequirementState.CANCELED,
    type: RequirementType.GOOD,
    location: 'Arequipa',
    date: '23-04-2023',
    description: 'Desription',
    image: 'https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg',
    user: {
      uid: 'user1',
      name: 'Soluciones Online Soluciones Online Soluciones Online S. A. C.',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY,
      tenure: 'Más de 10 años'
    },
  },
  {
    key: '2',
    title: 'Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas. Se necesita un maletín ejecutivo con un compartimento acolchado para un portátil de 15 pulgadas',
    category: 'Cuero y calzado',
    coin: 'S/.',
    price: 234,
    numberOffers: 0,
    state: RequirementState.EXPIRED,
    type: RequirementType.GOOD,
    location: 'Lima',
    date: '23-04-2023',
    description: 'Desription',
    user: {
      uid: 'user1',
      name: 'Soluciones Online Soluciones Online Soluciones Online S. A. C.',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY,
      tenure: 'Más de 10 años'
    },
  },
  {
    key: '3',
    title: 'Se requiere un ordenador portátil resistente para uso en exteriores',
    category: 'Hardware',
    coin: 'S/.',
    price: 230,
    numberOffers: 0,
    state: RequirementState.DISPUTE,
    type: RequirementType.GOOD,
    location: 'Madre de Dios',
    date: '23-04-2023',
    description: 'Desription',
    user: {
      uid: 'user1',
      name: 'Soluciones Online Soluciones Online Soluciones Online S. A. C.',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY,
      tenure: 'Más de 10 años'
    },
  },
  {
    key: '4',
    title: 'Necesito 10 Monitores de PC con Variedad en Marca y Tamaño',
    category: 'Hardware',
    coin: '$',
    price: 2323,
    numberOffers: 3,
    state: RequirementState.FINISHED,
    type: RequirementType.GOOD,
    location: 'Loreto',
    date: '23-04-2023',
    description: 'Desription',
    user: {
      uid: 'user1',
      name: 'Soluciones Online Soluciones Online Soluciones Online S. A. C.',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY,
      tenure: 'Más de 10 años'
    },
  },
  {
    key: '5',
    title: 'Requiero 15 Escritorios de Oficina con Variedad en Marca y Color',
    category: 'Carpintería',
    coin: '$',
    price: 455,
    numberOffers: 0,
    state: RequirementState.PUBLISHED,
    type: RequirementType.GOOD,
    location: 'Huancavelica',
    date: '23-04-2023',
    description: 'Desription',
    user: {
      uid: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      document: '987654321',
      tenure: '15 años',
      userTable: 1
    }
  },
  {
    key: '6',
    title: 'Se requiere comprar muebles para la sala de espera',
    category: 'Casa y hogar',
    coin: 'S/. ',
    price: 500,
    numberOffers: 1,
    state: RequirementState.SELECTED,
    type: RequirementType.GOOD,
    location: 'Arequipa',
    date: '03-12-2023',
    description: 'Desription',
    user: {
      uid: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      document: '987654321',
      tenure: '15 años',
      userTable: 1
    }
  }
];

const offerList: OfferListItem[] = [
  {
    key: '1',
    title: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RGB keyboard',
    coin: '$',
    price: 150089.56,
    warranty: '1 year',
    deliveryTime: '2-3 weeks',
    location: 'Madre de dios',
    state: OfferState.ACTIVE,
    user: {
      uid: 'user1',
      name: 'Soluciones Online Soluciones Online Soluciones Online S. A. C.',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY,
      tenure: 'Más de 10 años'
    },
    subUser: {
      uid: 'user1',
      name: 'Javier Alberto Solís Calcina Javier Alberto Solís Calcina',
      email: 'javiersolis@example.com',
      password: 'password123',
      document: '123456789',
      userTable: UserTable.COMPANY
    },
  },
  {
    key: '2',
    title: 'Smartphone Latest model smartphone with dual cameras Latest model smartphone with dual cameras',
    description: 'Latest model smartphone with dual cameras, Waterproof fitness tracker with heart rate monitor',
    coin: '$',
    price: 800,
    warranty: '2 years',
    deliveryTime: '1-2 weeks',
    location: 'Madre de dios',
    selectionDate: new Date(),
    state: OfferState.CANCELED,
    user: {
      uid: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      document: '987654321',
      tenure: '15 años',
      userTable: 1
    }
  },
  {
    key: '3',
    title: 'Fitness Tracker',
    description: '',
    coin: 's/.',
    price: 100,
    warranty: '6 months',
    deliveryTime: '1 week',
    location: 'Loreto',
    state: OfferState.DISPUTE,
    user: {
      uid: 'user3',
      name: 'Fitness Pro Tech Co.',
      email: 'fitnesspro@example.com',
      password: 'password789',
      document: '246810975',
      userTable: 0
    }
  },
  {
    key: '4',
    title: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with Bluetooth',
    coin: 'S/.',
    price: 120,
    warranty: '1 year',
    deliveryTime: '3-4 weeks',
    location: 'Loreto',
    state: OfferState.FINISHED,
    user: {
      uid: 'user4',
      name: 'SoundTech Solutions Ltd.',
      email: 'info@soundtech.example.com',
      password: 'passwordabc',
      document: '135792468',
      userTable: 1
    }
  },
  {
    key: '5',
    title: 'Coffee Machine',
    description: 'Espresso coffee machine with milk frother',
    coin: '$',
    price: 200,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Loreto',
    state: OfferState.WINNER,
    user: {
      uid: 'user5',
      name: 'Coffee Experts Inc.',
      email: 'info@coffeeexperts.example.com',
      password: 'passwordxyz',
      document: '864209753',
      userTable: 0
    }
  },
  {
    key: '6',
    title: 'Portable Speaker',
    description: 'Portable Bluetooth speaker with waterproof design',
    coin: '$',
    price: 80,
    warranty: '1 year',
    deliveryTime: '1-2 weeks',
    location: 'Arequipa',
    state: OfferState.ACTIVE,
    user: {
      uid: 'user6',
      name: 'AudioTech Corp.',
      email: 'info@auditech.example.com',
      password: 'password123',
      document: '975310864',
      userTable: 0
    }
  },
  {
    key: '7',
    title: 'Smartwatch',
    description: 'Fitness-focused smartwatch with GPS and heart rate monitor',
    coin: 'S/.',
    price: 300,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Arequipa',
    state: OfferState.CANCELED,
    user: {
      uid: 'user7',
      name: 'FitGear Solutions',
      email: 'info@fitgear.example.com',
      password: 'password456',
      document: '531086479',
      userTable: 1
    }
  },
  {
    key: '8',
    title: 'Desktop Computer',
    description: 'High-end desktop computer for gaming and professional use',
    coin: '$',
    price: 2500,
    warranty: '3 years',
    deliveryTime: '3-4 weeks',
    location: 'Arequipa',
    state: OfferState.DISPUTE,
    user: {
      uid: 'user8',
      name: 'TechSavvy Inc.',
      email: 'info@techsavvy.example.com',
      password: 'password789',
      document: '123098765',
      userTable: 1
    }
  },
  {
    key: '9',
    title: 'Camera Kit',
    description: 'Professional camera kit with multiple lenses and accessories',
    coin: '$',
    price: 1800,
    warranty: '1 year',
    deliveryTime: '2-3 weeks',
    location: 'Lima',
    state: OfferState.FINISHED,
    user: {
      uid: 'user9',
      name: 'SnapLens Co.',
      email: 'info@snaplens.example.com',
      password: 'passwordabc',
      document: '098765432',
      userTable: 0
    }
  },
  {
    key: '10',
    title: 'Electric Scooter',
    description: 'Foldable electric scooter with long battery life',
    coin: 'S/.',
    price: 600,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Lima',
    state: OfferState.WINNER,
    user: {
      uid: 'user10',
      name: 'EcoWheels Ltd.',
      email: 'info@ecowheels.example.com',
      password: 'passwordxyz',
      document: '456789012',
      userTable: 1
    }
  }
];

export default function Requirements() {
  const [modalType, setModalType] = useState(ModalTypes.DETAILED_REQUIREMENT);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<OfferListItem[] | RequirementTableItem | null>(null);
  const [requirement, setRequirement] = useState<null | RequirementTableItem>(null);

  function handleOnButtonClick(action: Action, data: any) {
    switch(action) {
      case Action.SHOW_OFFERS: {
        const dataReq = data as RequirementTableItem;
        setModalType(ModalTypes.DETAILED_REQUIREMENT);
        setDataModal(offerList);
        setIsOpenModal(true);
        setRequirement(dataReq);
        break;
      }
    }
  }

  function handleCloseModal() {
    console.log(333)
    setIsOpenModal(false);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        width='850px'
        title={requirement?.title}
        type={modalType}
        data={{offerList: dataModal, requirement}}
        isOpen={isOpenModal} 
        onClose={handleCloseModal}  
        style={{
          maxHeight: '75vh', 
          overflowY: 'scroll', 
          paddingBottom: '0',
        }}    
        className='custom-scroll'
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
          
          <RequirementsTable 
            type={RequirementType.GOOD} 
            data={requirements}
            onButtonClick={handleOnButtonClick}
          />
        </Flex>
    </div>
    </>
  )
}