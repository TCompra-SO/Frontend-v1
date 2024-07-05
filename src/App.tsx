import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import LoadingCond from "./pages/utils/LoadingCond.tsx";
import LoadingPage from "./pages/utils/LoadingPage.tsx";
// import Header from "./components/section/header/header/Header"

const Login = lazy(() => import('./pages/Login.tsx'));
const Profile = lazy(() => import('./pages/Profile.tsx'));

function App() {
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
          {/* <Header /> */}
          <LoadingCond></LoadingCond>
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
            <Route path="*" element={<Navigate to="/" replace />}
            />
          </Routes>
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
