import { useSelector } from "react-redux";
import { MainState } from "../../models/Redux";
import { Navigate, useParams } from "react-router-dom";
import { rucFormat } from "../../utilities/globals";
import { ReactNode, useContext, useEffect, useState } from "react";
import { pageRoutes } from "../../utilities/routes";
import makeRequest from "../../utilities/globalFunctions";
import { searchCompanyByNameService } from "../../services/requests/authService";
import { transformToDisplayUser } from "../../utilities/transform";
import { HomeContext } from "../../contexts/Homecontext";

interface CompanyProfileGuardProps {
  children: ReactNode;
}

export default function CompanyProfileGuard(props: CompanyProfileGuardProps) {
  const { companyId } = useParams();
  const isLoadingGlobal = useSelector(
    (state: MainState) => state.loadingUser.isLoading
  );
  const { updateUserId } = useContext(HomeContext);

  const [loading, setLoading] = useState(true);
  const [companyExists, setCompanyExists] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkCompany() {
      if (companyId && rucFormat.test(companyId)) {
        try {
          const { responseData } = await makeRequest({
            service: searchCompanyByNameService(companyId),
            method: "get",
          });

          const data = responseData?.data?.[0];

          if (data) {
            const transformed = transformToDisplayUser(data);
            updateUserId(transformed);
            setCompanyExists(true);
          } else {
            setCompanyExists(false);
          }
        } catch (err) {
          setCompanyExists(false);
        } finally {
          setLoading(false);
        }
      } else {
        setCompanyExists(false);
        setLoading(false);
      }
    }

    checkCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (isLoadingGlobal || loading) {
    return null; // show nothing (or a loader)
  }

  if (companyExists === false) {
    return <Navigate to={pageRoutes.home} />;
  }

  return <>{props.children}</>;
}
