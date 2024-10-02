import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import LoadingCond from "./pages/utils/LoadingCond.tsx";
import LoadingPage from "./pages/utils/LoadingPage.tsx";
import "./assets/styles.css";
import "./assets/responsive.css";
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
import { ListsProvider } from "./contexts/listsContext.tsx";
import AuthRoleGuard from "./components/guards/AuthRoleGuard.tsx";
import { RolesForSection } from "./utilities/roles.ts";

const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Requirements = lazy(() => import("./pages/Requirements.tsx"));
const Offers = lazy(() => import("./pages/Offers.tsx"));
const Users = lazy(() => import("./pages/Users.tsx"));
const CreateRequirementFloatButton = lazy(
  () =>
    import(
      "./components/section/create-requirement/CreateRequirementFloatButton.tsx"
    )
);
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
            // borderRadius: 16,
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
            <CreateRequirementFloatButton />
            <LoadingCond></LoadingCond>
            <Routes>
              <Route
                path={`${pageRoutes.home}`}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <Home></Home>
                  </Suspense>
                }
              />

              <Route
                path="*"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingPage />}>
                      <Routes>
                        <Route
                          path={`${pageRoutes.search}`}
                          element={
                            <AuthRoleGuard
                              allowedRoles={RolesForSection.search}
                            >
                              <Search />
                            </AuthRoleGuard>
                          }
                        />
                        <Route
                          path={`${pageRoutes.myRequirements}`}
                          element={
                            // <AuthRoleGuard
                            //   allowedRoles={RolesForSection.myRequirements}
                            // >
                            <Requirements />
                            // </AuthRoleGuard>
                          }
                        />
                        <Route
                          path={`${pageRoutes.myOffers}`}
                          element={
                            // <AuthRoleGuard
                            //   allowedRoles={RolesForSection.myOffers}
                            // >
                            <Offers />
                            // </AuthRoleGuard>
                          }
                        />
                        <Route
                          path={`${pageRoutes.users}`}
                          element={
                            // <AuthRoleGuard allowedRoles={RolesForSection.users}>
                            <Users />
                            // </AuthRoleGuard>
                          }
                        />
                        <Route
                          path="*"
                          element={
                            <Navigate to={`${pageRoutes.home}`} replace />
                          }
                        />
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
