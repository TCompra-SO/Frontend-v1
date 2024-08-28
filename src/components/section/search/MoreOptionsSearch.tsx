import { Modal } from "antd";
import CitySearch from "./CitySearch";
import RequirementType from "./RequirementType";
import DateSearch from "./DateSearch";
import { useTranslation } from "react-i18next";

interface MoreOptionsSearchProps {
  visible: boolean;
  onClose: () => void;
}

export default function MoreOptionsSearch(props: MoreOptionsSearchProps) {
  const { t } = useTranslation();

  return (
    <Modal
      centered
      open={props.visible}
      closable={false}
      onCancel={props.onClose}
      onOk={props.onClose}
    >
      <CitySearch></CitySearch>
      <RequirementType></RequirementType>
      <DateSearch placeholder={t("startDate")} name="startDate" />
      <DateSearch placeholder={t("endDate")} name="endDate" />
    </Modal>
  );
}
