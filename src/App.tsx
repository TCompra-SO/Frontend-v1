// import Header from "./components/section/header/header/Header"

import Loading from "./pages/utils/loading"
import Login from "./pages/Login"
// import Header from "./components/section/header/header/Header"

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL)
  return (
    <>
      {/* <Header /> */}
      <Loading></Loading>
      <Login></Login>
    </>
  )
}

export default App
