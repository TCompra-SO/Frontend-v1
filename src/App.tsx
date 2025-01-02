import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import LoadingCond from "./pages/utils/LoadingCond.tsx";
import LoadingPage from "./pages/utils/LoadingPage.tsx";
import "./assets/styles.css";
import "./assets/custom.css";
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
import { ListsProvider } from "./contexts/ListsContext.tsx";
import AuthRoleGuard from "./components/guards/AuthRoleGuard.tsx";
import { RolesForSection, RolesForSubSection } from "./utilities/roles.ts";
import { useDispatch } from "react-redux";
import { setIsLoading } from "./redux/loadingSlice.ts";
import { useLoadUserInfo } from "./hooks/authHook.ts";
import MainHeader from "./components/section/header/MainHeader.tsx";
import { LoadingDataProvider } from "./contexts/LoadingDataContext.tsx";
import { getSectionFromRoute } from "./utilities/globalFunctions.ts";
import { ModalsProvider } from "./contexts/ModalsContext.tsx";
import { RequestProvider } from "./contexts/RequestContext.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Requirements = lazy(() => import("./pages/Requirements.tsx"));
const Offers = lazy(() => import("./pages/Offers.tsx"));
const PurchaseOrders = lazy(() => import("./pages/PurchaseOrders.tsx"));
const SalesOrders = lazy(() => import("./pages/SalesOrders.tsx"));
const Users = lazy(() => import("./pages/Users.tsx"));
const Chat = lazy(() => import("./pages/Chat.tsx"));
const AllRequirements = lazy(() => import("./pages/AllRequirements.tsx"));
const AllOffers = lazy(() => import("./pages/AllOffers.tsx"));
const AllPurchaseOrders = lazy(() => import("./pages/AllPurchaseOrders.tsx"));
const AllSalesOrders = lazy(() => import("./pages/AllSalesOrders.tsx"));
const Certificates = lazy(() => import("./pages/Certificates.tsx"));
const CertificatesDocs = lazy(() => import("./pages/CertificatesDocs.tsx"));
const Statistics = lazy(() => import("./pages/Statistics.tsx"));
const MyProfile = lazy(() => import("./pages/MyProfile.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const CreateRequirementFloatButton = lazy(
  () =>
    import(
      "./components/section/create-requirement/CreateRequirementFloatButton.tsx"
    )
);
const currentLanguage = i18n.language;

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  function handleShowMenu(show: boolean) {
    setShowMenu(show);
  }

  return (
    <div className="t-flex">
      <Sidebar showMenu={showMenu} onShowMenu={handleShowMenu} />

      <div className="col-datos">
        <MainHeader onShowMenu={handleShowMenu} />

        <div
          className={
            getSectionFromRoute(location.pathname) == pageRoutes.chat
              ? "tc-chat"
              : "tc-datos scroll-y"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const loadUserInfo = useLoadUserInfo();
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
            colorBgContainer: mainBackgroundColor,
            fontFamily: "Rubik",
            fontSize: 16,
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
        <AntdApp>
          <ListsProvider>
            <RequestProvider>
              <ModalsProvider>
                <CreateRequirementFloatButton />
                <LoadingCond></LoadingCond>
                <Routes>
                  <Route
                    path={`${pageRoutes.home}`}
                    element={
                      <Suspense fallback={<LoadingPage />}>
                        <MainHeader />
                        <Home></Home>
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${pageRoutes.productDetail}/:requirementId`}
                    element={
                      <Suspense fallback={<LoadingPage />}>
                        <AuthRoleGuard
                          allowedRoles={RolesForSection.productDetail}
                        >
                          <MainHeader />
                          <ProductDetail />
                        </AuthRoleGuard>
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <LoadingDataProvider>
                        <MainLayout>
                          <Suspense fallback={<LoadingPage />}>
                            <Routes>
                              <Route
                                path={`${pageRoutes.profile}`}
                                element={
                                  <AuthRoleGuard
                                    allowedRoles={RolesForSection.profile}
                                  >
                                    <MyProfile />
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
                                      allowedRoles={
                                        RolesForSection.myRequirements
                                      }
                                    >
                                      <Requirements />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.services}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.myRequirements
                                      }
                                    >
                                      <Requirements />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.sales}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.myRequirements
                                      }
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
                              </Route>
                              <Route path={`${pageRoutes.mySalesOrders}`}>
                                <Route
                                  path=""
                                  element={
                                    <Navigate
                                      to={`${pageRoutes.mySalesOrders}/${pageSubRoutes.issued}`}
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
                                          pageRoutes.mySalesOrders
                                        ][pageSubRoutes.issued]
                                      }
                                    >
                                      <SalesOrders />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.received}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSubSection[
                                          pageRoutes.mySalesOrders
                                        ][pageSubRoutes.received]
                                      }
                                    >
                                      <SalesOrders />
                                    </AuthRoleGuard>
                                  }
                                />
                              </Route>
                              <Route
                                path={`${pageRoutes.users}`}
                                element={
                                  <AuthRoleGuard
                                    allowedRoles={RolesForSection.users}
                                  >
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
                                      allowedRoles={
                                        RolesForSection.allRequirements
                                      }
                                    >
                                      <AllRequirements />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.services}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.allRequirements
                                      }
                                    >
                                      <AllRequirements />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.sales}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.allRequirements
                                      }
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
                                      allowedRoles={
                                        RolesForSection.allPurchaseOrders
                                      }
                                    >
                                      <AllPurchaseOrders />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.received}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.allPurchaseOrders
                                      }
                                    >
                                      <AllPurchaseOrders />
                                    </AuthRoleGuard>
                                  }
                                />
                              </Route>
                              <Route path={`${pageRoutes.allSalesOrders}`}>
                                <Route
                                  path=""
                                  element={
                                    <Navigate
                                      to={`${pageRoutes.allSalesOrders}/${pageSubRoutes.issued}`}
                                      replace
                                    />
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.issued}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.allSalesOrders
                                      }
                                    >
                                      <AllSalesOrders />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.received}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.allSalesOrders
                                      }
                                    >
                                      <AllSalesOrders />
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
                                      allowedRoles={
                                        RolesForSection.certificates
                                      }
                                    >
                                      <CertificatesDocs />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.received}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.certificates
                                      }
                                    >
                                      <Certificates />
                                    </AuthRoleGuard>
                                  }
                                />
                                <Route
                                  path={`${pageSubRoutes.sent}`}
                                  element={
                                    <AuthRoleGuard
                                      allowedRoles={
                                        RolesForSection.certificates
                                      }
                                    >
                                      <Certificates />
                                    </AuthRoleGuard>
                                  }
                                />
                              </Route>
                              <Route
                                path={`${pageRoutes.statistics}`}
                                element={
                                  <AuthRoleGuard
                                    allowedRoles={RolesForSection.statistics}
                                  >
                                    <Statistics />
                                  </AuthRoleGuard>
                                }
                              />
                              <Route
                                path={`${pageRoutes.chat}`}
                                element={
                                  <AuthRoleGuard
                                    allowedRoles={RolesForSection.chat}
                                  >
                                    <Chat />
                                  </AuthRoleGuard>
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
                      </LoadingDataProvider>
                    }
                  />
                </Routes>
              </ModalsProvider>
            </RequestProvider>
          </ListsProvider>
        </AntdApp>
      </ConfigProvider>
    </>
  );
}

export default App;
