import { Modal } from 'antd';
import CitySearch from './CitySearch';
import RequirementType from './RequirementType';
import DateSearch from './DateSearch';

interface MoreOptionsSearchProps {
  visible: boolean,
  onClose: () => void
}

export default function MoreOptionsSearch(props: MoreOptionsSearchProps) {

  return (
    <Modal
      centered
      open={props.visible}
      closable={false}
      onCancel={props.onClose}
      onOk={props.onClose}
    >
      <CitySearch></CitySearch>
      <RequirementType></RequirementType>
      <DateSearch placeholder='Fecha de inicio' name='startDate'/>
      <DateSearch placeholder='Fecha de fin' name='endDate'/>
    </Modal>
  )
}
