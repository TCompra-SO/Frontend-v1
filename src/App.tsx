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
import { pageRoutes } from "./utilities/routes.ts";
import Sidebar from "./components/section/sidebar/Sidebar.tsx";
import MainHeader from "./components/section/header/header/MainHeader.tsx";
import { ListsProvider } from "./contexts/ListsContext.tsx";

const Login = lazy(() => import("./pages/Login.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Requirements = lazy(() => import("./pages/Requirements.tsx"));
const Offers = lazy(() => import("./pages/Offers.tsx"));
const currentLanguage = i18n.language;

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="t-flex">
    <Sidebar />

    <div className="col-datos">
      <MainHeader />

      <div className="tc-datos scroll-y">{children}</div>
      {/* <Footer style={{ textAlign: "center" }}>
        TCompra ©{new Date().getFullYear()} Soluciones Online S. A. C.
      </Footer> */}
    </div>
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
            fontFamily: "Rubik",
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
                path={`/${pageRoutes.profile}`}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <Profile></Profile>
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
