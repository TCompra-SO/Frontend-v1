// import Header from "./components/section/header/header/Header"

import Loading from "./pages/utils/loading"
import Login from "./pages/Login"
import { useState } from "react";
// import Header from "./components/section/header/header/Header"

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeLoadingPage(isLoading: boolean) {
    setIsLoading(isLoading);
  }

  return (
    <>
      {/* <Header /> */}
      {isLoading && <Loading></Loading>}
      <Login onChangeLoadingPage={handleChangeLoadingPage}></Login>
    </>
  )
}

export default App
