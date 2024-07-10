import { Button, Dropdown, Space, Table, TableProps, Tag } from "antd"
import { RequirementTableItem } from "../../models/MainInterfaces"
import { RequirementState, RequirementStateMeta, RequirementType } from "../../utilities/types"
import { CaretDownOutlined } from "@ant-design/icons";

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
    description: 'Desription'
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
    description: 'Desription'
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
    description: 'Desription'
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
    description: 'Desription'
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
    description: 'Desription'
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
    description: 'Desription'
  }
];

const columns: TableProps<RequirementTableItem>['columns'] = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    render: (_, { title }) => (
      <div 
        className="text-truncate"
        style={{textAlign: 'left'}}
      >
        {title}
      </div>
    ),
  },
  {
    title: 'Rubro',
    dataIndex: 'category',
    key: 'category',
    align: 'center' ,
    sorter: (a, b) => a.title.localeCompare(b.title), 
    showSorterTooltip: false,
    width: '120px'
  },
  {
    title: 'Departmento',
    dataIndex: 'location',
    key: 'location',
    align: 'center',
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: '120px'
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    showSorterTooltip: false,
    ellipsis: true,
    width: '120px'
  },
  {
    title: 'Cotización',
    dataIndex: 'price',
    align: 'center',
    key: 'price',
    render: (_, record) => (
      <div style={{textAlign: 'left'}}>{record.coin} {record.price}</div>
    ),
    sorter: (a, b) =>  a.price - b.price,
    showSorterTooltip: false,
    width: '120px'
  },
  {
    title: 'Ofertas',
    dataIndex: 'numberOffers',
    key: 'offers',
    align: 'center',
    sorter: (a, b) =>  a.numberOffers - b.numberOffers,
    showSorterTooltip: false,
    width: '120px',
    render: (_, { numberOffers }) => (
      <Button 
        size="small" 
        type="primary" 
        style={{width: '64px', textAlign: 'center', fontSize: '11px'}}
      >
        VER: {numberOffers}
      </Button>
    ),
  },
  {
    title: 'Estado',
    key: 'state',
    align: 'center',
    dataIndex: 'state',
    showSorterTooltip: false,
    width: '120px',
    render: (_, { state }) => (
      <Tag 
        color={RequirementStateMeta[state].color}
        style={{width: '70px', textAlign: 'center'}}
      >
        {RequirementStateMeta[state].label}
      </Tag>      
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    showSorterTooltip: false,
    width: '120px',
    render: () => (
      <Space size="middle">
        <Dropdown 
          trigger={['click']}
          menu={ {
            items: [
              {
                key: 'profile',
                label: 'perfil'
              },
              {
                key: 'logout',
                label: 'salir'
              },
            ]
          }}>
          <Button size="small" type="primary" style={{fontSize: '11px'}}>
            SELECCIONE <CaretDownOutlined />
          </Button>
        </Dropdown>
      </Space>
    ),
  },
];

export default function RequirementsTable() {
  const pageSizeOptions = ['10', '20', '50', '100'];

  return (  
      <Table 
        dataSource={requirements} 
        columns={columns}
        scroll={{ x: 1200 }}
        style={{width: '100%'}}
        pagination={{ 
          pageSizeOptions,
          showSizeChanger: true,
          locale: { items_per_page: "/ Bienes por página"}
          // hideOnSinglePage: true
        }}
      >
      </Table>
    
  )
}
