import { Flex } from 'antd'
import RequirementsTable from '../components/common/RequirementsTable';
import InputContainer from '../components/containers/InputContainer'
import ModalContainer from '../components/containers/ModalContainer';
import { ModalTypes } from '../utilities/types';

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
          <InputContainer
            placeholder='Buscar...'
          />
          <RequirementsTable></RequirementsTable>
        </Flex>
    </div>
    </>
  )
}
