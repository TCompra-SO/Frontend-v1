import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import LoadingCond from "./pages/utils/LoadingCond.tsx";
import LoadingPage from "./pages/utils/LoadingPage.tsx";
import "./assets/styles.css";
import {
  darkColor,
  mainBackgroundColor,
  primaryColor,
  tableHeaderTextColor,
  white,
} from "./utilities/colors.ts";
import esEs from "antd/locale/es_ES";
import enUs from "antd/locale/en_US";
import i18n from "./utilities/i18n.ts";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { pageRoutes } from "./utilities/routes.ts";
import Sidebar from "./components/section/sidebar/Sidebar.tsx";
import MainHeader from "./components/section/header/header/MainHeader.tsx";
import { ListsProvider } from "./contexts/listsContext.tsx";

const Login = lazy(() => import("./pages/Login.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Requirements = lazy(() => import("./pages/Requirements.tsx"));
const Offers = lazy(() => import("./pages/Offers.tsx"));
const currentLanguage = i18n.language;

// const siderStyle: React.CSSProperties = {
//   overflow: "auto",
//   height: "100vh",
//   position: "fixed",
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarColor: "unset",
// };

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  // <Layout style={{ minHeight: "100vh" }}>
  <div className="t-flex">
    {/* <Sider
      width="21%"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarColor: "unset",
      }}
    > */}
    <Sidebar />
    {/* </Sider> */}
    <div className="col-datos">
      {/* <Layout> */}
      <Header
        style={{ padding: 0, background: "#ffffff" }}
        children={<MainHeader />}
      />
      <Content style={{ margin: "0 16px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        TCompra ©{new Date().getFullYear()} Soluciones Online S. A. C.
      </Footer>
      {/* </Layout> */}
    </div>

    {/* </div> */}
    {/* </Layout> */}
  </div>
);

function App() {
  return (
    <>
      <ConfigProvider
        locale={currentLanguage == "es" ? esEs : enUs}
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
            borderRadius: 10,
            colorBgContainer: mainBackgroundColor,
            fontFamily: "Jost",
          },
          components: {
            Table: {
              headerColor: tableHeaderTextColor,
              headerBg: white,
              headerSortActiveBg: white,
              headerSortHoverBg: white,
              headerSplitColor: "transparent",
              borderColor: "transparent",
            },
            Menu: {
              darkItemBg: darkColor,
              darkSubMenuItemBg: darkColor,
              // itemBg: darkColor,
            },
          },
        }}
      >
        <ListsProvider>
          <AntdApp>
            <LoadingCond></LoadingCond>
            <Routes>
              <Route
                path={`/${pageRoutes.login}`}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <Login></Login>
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingPage />}>
                      <Routes>
                        <Route
                          path={`/${pageRoutes.profile}`}
                          element={<Profile />}
                        />
                        <Route
                          path={`/${pageRoutes.search}`}
                          element={<Search />}
                        />
                        <Route
                          path={`/${pageRoutes.myRequirements}`}
                          element={<Requirements />}
                        />
                        <Route
                          path={`/${pageRoutes.myOffers}`}
                          element={<Offers />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </MainLayout>
                }
              />
            </Routes>
          </AntdApp>
        </ListsProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
