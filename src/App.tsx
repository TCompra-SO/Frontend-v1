import { lazy, Suspense, useEffect } from "react";
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
import { pageRoutes, pageSubRoutes } from "./utilities/routes.ts";
import Sidebar from "./components/section/sidebar/Sidebar.tsx";
import MainHeader from "./components/section/header/header/MainHeader.tsx";
import { ListsProvider } from "./contexts/listsContext.tsx";
import AuthRoleGuard from "./components/guards/AuthRoleGuard.tsx";
import { RolesForSection, RolesForSubSection } from "./utilities/roles.ts";
import { loadUserInfo } from "./services/complete/authServiceComplete.ts";
import { useDispatch } from "react-redux";
import { setIsLoading } from "./redux/loadingSlice.ts";
import useSocket from "./socket/socket.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Requirements = lazy(() => import("./pages/Requirements.tsx"));
const Offers = lazy(() => import("./pages/Offers.tsx"));
const PurchaseOrders = lazy(() => import("./pages/PurchaseOrders.tsx"));
const Users = lazy(() => import("./pages/Users.tsx"));
const AllRequirements = lazy(() => import("./pages/AllRequirements.tsx"));
const AllOffers = lazy(() => import("./pages/AllOffers.tsx"));
const AllPurchaseOrders = lazy(() => import("./pages/AllPurchaseOrders.tsx"));
const Certificates = lazy(() => import("./pages/Certificates.tsx"));
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
  useSocket();
  const dispatch = useDispatch();
  dispatch(setIsLoading(true));

  useEffect(() => {
    async function getUserData() {
      await loadUserInfo();
      dispatch(setIsLoading(false));
    }
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                        <Route path={`${pageRoutes.myRequirements}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.myRequirements}/${pageSubRoutes.goods}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.goods}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myRequirements}
                              >
                                <Requirements />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.services}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myRequirements}
                              >
                                <Requirements />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.sales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myRequirements}
                              >
                                <Requirements />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>

                        <Route path={`${pageRoutes.myOffers}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.myOffers}/${pageSubRoutes.goods}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.goods}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myOffers}
                              >
                                <Offers />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.services}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myOffers}
                              >
                                <Offers />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.sales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.myOffers}
                              >
                                <Offers />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
                        <Route path={`${pageRoutes.myPurchaseOrders}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.myPurchaseOrders}/${pageSubRoutes.issued}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.issued}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={
                                  RolesForSubSection[
                                    pageRoutes.myPurchaseOrders
                                  ][pageSubRoutes.issued]
                                }
                              >
                                <PurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.received}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={
                                  RolesForSubSection[
                                    pageRoutes.myPurchaseOrders
                                  ][pageSubRoutes.received]
                                }
                              >
                                <PurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.issuedSales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={
                                  RolesForSubSection[
                                    pageRoutes.myPurchaseOrders
                                  ][pageSubRoutes.issuedSales]
                                }
                              >
                                <PurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.receivedSales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={
                                  RolesForSubSection[
                                    pageRoutes.myPurchaseOrders
                                  ][pageSubRoutes.receivedSales]
                                }
                              >
                                <PurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
                        <Route
                          path={`${pageRoutes.users}`}
                          element={
                            <AuthRoleGuard allowedRoles={RolesForSection.users}>
                              <Users />
                            </AuthRoleGuard>
                          }
                        />
                        <Route path={`${pageRoutes.allRequirements}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.allRequirements}/${pageSubRoutes.goods}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.goods}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allRequirements}
                              >
                                <AllRequirements />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.services}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allRequirements}
                              >
                                <AllRequirements />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.sales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allRequirements}
                              >
                                <AllRequirements />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
                        <Route path={`${pageRoutes.allOffers}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.allOffers}/${pageSubRoutes.goods}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.goods}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allOffers}
                              >
                                <AllOffers />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.services}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allOffers}
                              >
                                <AllOffers />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.sales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allOffers}
                              >
                                <AllOffers />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
                        <Route path={`${pageRoutes.allPurchaseOrders}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.allPurchaseOrders}/${pageSubRoutes.issued}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.issued}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allPurchaseOrders}
                              >
                                <AllPurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.received}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allPurchaseOrders}
                              >
                                <AllPurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.issuedSales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allPurchaseOrders}
                              >
                                <AllPurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.receivedSales}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.allPurchaseOrders}
                              >
                                <AllPurchaseOrders />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
                        <Route path={`${pageRoutes.certificates}`}>
                          <Route
                            path=""
                            element={
                              <Navigate
                                to={`${pageRoutes.certificates}/${pageSubRoutes.documents}`}
                                replace
                              />
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.documents}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.certificates}
                              >
                                <Certificates />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.received}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.certificates}
                              >
                                <Certificates />
                              </AuthRoleGuard>
                            }
                          />
                          <Route
                            path={`${pageSubRoutes.sent}`}
                            element={
                              <AuthRoleGuard
                                allowedRoles={RolesForSection.certificates}
                              >
                                <Certificates />
                              </AuthRoleGuard>
                            }
                          />
                        </Route>
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
