import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import LoadingCond from "./pages/utils/LoadingCond.tsx";
import LoadingPage from "./pages/utils/LoadingPage.tsx";
import Search from "./pages/Search";
import Header from "./components/section/header/header/Header";
import './assets/styles.css';
import Requirements from "./pages/Requirements.tsx";
import { lightColor, mainBackgroundColor, primaryColor } from "./utilities/colors.ts";

const Login = lazy(() => import('./pages/Login.tsx'));
const Profile = lazy(() => import('./pages/Profile.tsx'));

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
            borderRadius: 10,
            colorBgContainer: mainBackgroundColor,
            fontFamily: 'Jost'
          },
          components: {
            Table: {
              headerColor: primaryColor,
              headerBg: lightColor,
              headerSortActiveBg: lightColor,
              headerSortHoverBg: lightColor
            }
          }
        }}
      >
        <AntdApp>
          <LoadingCond></LoadingCond>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={
              <Suspense fallback={<LoadingPage />}>
                <Login></Login>
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<LoadingPage />}>
                <Profile></Profile>
              </Suspense>
            } />
            <Route path="/search" element={
              <Suspense fallback={<LoadingPage />}>
                <Header />
                <Search ></Search>
              </Suspense>
            } />
            <Route path="/mis-requerimientos" element={
              <Suspense fallback={<LoadingPage />}>
                {/* <Header /> */}
                <Requirements ></Requirements>
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/" replace />}
            />
          </Routes>
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
