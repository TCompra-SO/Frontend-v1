import { Divider, Modal, } from "antd"
import { ModalTypes } from "../../utilities/types";
import Title from "antd/es/typography/Title"
import RequirementInfo from "../section/requirements/RequirementInfo"
import RequirementOfferFilters from "../section/requirements/RequirementOfferFilters";
import RequirementOfferList from "../section/requirements/RequirementOfferList";
import { OfferListItem } from "../../models/MainInterfaces";

interface ModalContainerProps {
  type: ModalTypes
}

const offerList: OfferListItem[] = [
  {
    key: '1',
    title: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RGB keyboard',
    coin: 'USD',
    price: 1500,
    warranty: '1 year',
    deliveryTime: '2-3 weeks',
    location: 'Madre de dios',
    user: {
      uid: 'user1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      document: '123456789',
      userTable: 1
    }
  },
  {
    key: '2',
    title: 'Smartphone',
    description: 'Latest model smartphone with dual cameras',
    coin: 'EUR',
    price: 800,
    warranty: '2 years',
    deliveryTime: '1-2 weeks',
    location: 'Madre de dios',
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
    description: 'Waterproof fitness tracker with heart rate monitor',
    coin: 'USD',
    price: 100,
    warranty: '6 months',
    deliveryTime: '1 week',
    location: 'Loreto',
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
    coin: 'GBP',
    price: 120,
    warranty: '1 year',
    deliveryTime: '3-4 weeks',
    location: 'Loreto',
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
    coin: 'USD',
    price: 200,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Loreto',
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
    coin: 'USD',
    price: 80,
    warranty: '1 year',
    deliveryTime: '1-2 weeks',
    location: 'Arequipa',
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
    coin: 'EUR',
    price: 300,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Arequipa',
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
    coin: 'USD',
    price: 2500,
    warranty: '3 years',
    deliveryTime: '3-4 weeks',
    location: 'Arequipa',
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
    coin: 'USD',
    price: 1800,
    warranty: '1 year',
    deliveryTime: '2-3 weeks',
    location: 'Lima',
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
    coin: 'GBP',
    price: 600,
    warranty: '2 years',
    deliveryTime: '2-3 weeks',
    location: 'Lima',
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


export default function ModalContainer(props: ModalContainerProps) {
  switch (props.type) {
    case ModalTypes.DETAILED_REQUIREMENT:
      return (
        <Modal 
          title='ssss hfdjhdj fjdhfjdh jh'
          open={true}
          closable={false}
          width='700px'
          footer={null}
        >
          <Divider style={{margin: '10px 0'}}/>
          <RequirementInfo></RequirementInfo>
          <div
            style={{
              textAlign: 'center', 
              margin: '15px 0', 
              padding: '10px',
              boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px'
            }}
          >
            <b>Filtros de búsqueda: </b> Puede seleccionar opciones para ordenar y filtrar ofertas
          </div>
          <RequirementOfferFilters></RequirementOfferFilters>
          <Divider style={{margin: '15px 0'}}/>
          <Title style={{textAlign: 'center', marginTop: '0'}} level={4}>Ofertas recibidas</Title>
          <RequirementOfferList offers={offerList}/>
        </Modal>
      )
    case ModalTypes.VALIDATE_CODE:
      return (
        <div>ModalContainer</div>
      )
  }
  
}
