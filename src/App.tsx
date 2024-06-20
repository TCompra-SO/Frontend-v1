import { CarContainerOptions } from "./components/CardContainerOptions/CardContainerOptions"
import { utilitieListOptions } from "./utilities/UtilitiesForCardContainer/CardContainerOptionsList"

function App() {
  return <>
    <div>
      <CarContainerOptions listOptions={utilitieListOptions} />
    </div>
  </> 
}

export default App
