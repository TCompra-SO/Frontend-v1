import BasicCompanyData from "./items/BasicCompanyData";
import CertificationData from "./items/CertificationData";
import DetailedCompanyData from "./items/DetailedCompanyData";

export default function CompanyData() {
  return (
    <div className="t-flex f-column gap-15">
      {/* <BasicCompanyData /> */}
      <DetailedCompanyData />
      <CertificationData />
    </div>
  );
}
