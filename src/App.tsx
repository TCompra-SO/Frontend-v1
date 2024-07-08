
import Login from "./pages/Login"
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import Loading from "./pages/utils/Loading";
import Search from "./pages/Search";
import Header from "./components/section/header/header/Header";
import './assets/styles.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeLoadingPage(isLoading: boolean) {
    setIsLoading(isLoading);
  }

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#BC1373',
            borderRadius: 10,
            colorBgContainer: '#ffffff',
            fontFamily: 'sans-serif'
          },
        }}
      >
        <AntdApp>
          <Header />
          {isLoading && <Loading></Loading>}
          <Routes>
            <Route path='/' element={<Login onChangeLoadingPage={handleChangeLoadingPage}></Login>} />
            <Route path="/profile" element={<Profile onChangeLoadingPage={handleChangeLoadingPage}></Profile>} />
            <Route path="/search" element={<Search ></Search>} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
