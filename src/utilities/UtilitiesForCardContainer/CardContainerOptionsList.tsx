import { AlignCenterOutlined, FileOutlined, LineChartOutlined, MessageOutlined, SolutionOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Option } from "../../models/CardContainerModels/CardContainerOptions.model"

export const utilitieListOptions: Option[] = [
    {
      id: 1,
      text: 'Perfil',
      selected: true,
      icon: <UserOutlined />
    },
    {
      id: 2,
      text: 'Requerimientos',
      selected: false,
      icon: <AlignCenterOutlined />
    },
    {
      id: 3,
      text: 'Mis Ofertas',
      selected: false,
      icon: <SolutionOutlined />
    },
    {
      id: 4,
      text: 'RR.HH.',
      selected: false,
      icon: <UserOutlined />
    },
    {
      id: 5,
      text: 'Orden de Compra',
      selected: false,
      icon: <FileOutlined />
    },
    {
      id: 6,
      text: 'Chat',
      selected: false,
      icon: <MessageOutlined />
    },
    {
      id: 7,
      text: 'Crear Usuarios',
      selected: false,
      icon: <UsergroupAddOutlined />
    },
    {
      id: 8,
      text: 'Requerimientos',
      selected: false,
      icon: <AlignCenterOutlined />
    },
    {
      id: 9,
      text: 'Ofertas',
      selected: false,
      icon: <SolutionOutlined />
    },
    {
      id: 10,
      text: 'Certificados',
      selected: false,
      icon: <FileOutlined />
    },
    {
      id: 11,
      text: 'Órdenes Culminadas',
      selected: false,
      icon: <FileOutlined />
    },
    {
      id: 12,
      text: 'Estadisticas',
      selected: false,
      icon: <LineChartOutlined />
    }
  ]