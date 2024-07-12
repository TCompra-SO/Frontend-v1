import { Avatar, Dropdown, Flex, Space, Table, TableProps } from "antd"
import { RequirementTableItem } from "../../models/MainInterfaces"
import { RequirementType } from "../../utilities/types"
import { CaretDownOutlined } from "@ant-design/icons";
import TagContainer from "../containers/TagContainer";
import { RequirementStateMeta, lightColor, primaryColor, tableHeaderTextColor } from "../../utilities/colors";
import ButtonContainer from "../containers/ButtonContainer";

interface RequirementsTableProps {
  type: RequirementType,
  data: RequirementTableItem[]
}

const columns: TableProps<RequirementTableItem>['columns'] = [
  
  {
    dataIndex: 'image',
    align: 'center',
    // hidden: true,
    width: 40,
    render: (_, {image}) => (
      <Avatar
        src={image ?? 'https://placehold.co/100x100'}
      ></Avatar>
    )
  },
  {
    title: 'Nombre',
    dataIndex: 'title',
    key: 'name',
    align: 'center',
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    render: (_, { title, category }) => (
      < >
          <Flex vertical>
          <div 
            className="text-truncate" 
            style={{textAlign: 'left'}}
          >
            {title}
          </div>
          <div
            className="text-truncate"
            style={{textAlign: 'left', color: tableHeaderTextColor}}
          >
            {category}
          </div>
          </Flex>
      </>
    ),
  },
  // {
  //   title: 'Rubro',
  //   dataIndex: 'category',
  //   key: 'category',
  //   align: 'center' ,
  //   sorter: (a, b) => a.title.localeCompare(b.title), 
  //   showSorterTooltip: false,
  //   width: '120px',
  //   render: (_, { category }) => (
  //     <div 
  //       style={{textAlign: 'left'}}
  //     >
  //       {category}
  //     </div>
  //   ),
  // },
  {
    title: 'Departmento',
    dataIndex: 'location',
    key: 'location',
    align: 'center',
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: '120px',
    render: (_, { location }) => (
      <div 
        style={{textAlign: 'left'}}
      >
        {location}
      </div>
    ),
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
      <ButtonContainer
        size="small" 
        type="default" 
        shape="round"
        text={numberOffers}
        style={{
          height: '32px', 
          textAlign: 'center', 
          fontSize: '15px',
          fontWeight: '500',
          color: primaryColor,
          background: lightColor,
          border: '0'
        }}
      />

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
      <TagContainer
        color={RequirementStateMeta[state].background}
        text={RequirementStateMeta[state].label}
        style={{
          width: '70px', 
          textAlign: 'center', 
          marginInlineEnd: '0',
          color: RequirementStateMeta[state].color
        }}
      />
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    showSorterTooltip: false,
    width: '135px',
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
          <ButtonContainer
            size="small" 
            type="primary" 
            ghost 
            text='Seleccione'
            upperCaseSmaller
            icon={<CaretDownOutlined />}
            iconPosition="end"
          />
        </Dropdown>
      </Space>
    ),
  },
];

export default function RequirementsTable(props: RequirementsTableProps) {
  const pageSizeOptions = ['10', '20', '50', '100'];

  return (  
      <Table 
        dataSource={props.data} 
        columns={columns}
        scroll={{ x: 1200 }}
        style={{width: '100%'}}
        bordered={false}
        pagination={{ 
          pageSizeOptions,
          showSizeChanger: true,
          // hideOnSinglePage: true,<
          locale: { 
            items_per_page: `/ ${
              props.type == RequirementType.GOOD ? 'Bienes' : 
              props.type == RequirementType.SERVICE ? 'Servicios' :
              props.type == RequirementType.SALE ? 'Liquidaciones' :
              'Puestos de trabajo' } por página`
          },
        }}
      >
      </Table>
    
  )
}
