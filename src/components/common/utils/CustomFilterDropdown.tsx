import { FilterDropdownProps, FilterValue } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { StrictColumnFilterItem } from "../../../models/Interfaces";
import { useEffect, useState } from "react";
import { Button, Checkbox, Space } from "antd";
import ButtonContainer from "../../containers/ButtonContainer";

// Permite aplicar filtros otra vez cuando no éstos no han cambiado
export default function CustomFilterDropdown({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  filters,
  filteredInfo,
}: Omit<Partial<FilterDropdownProps>, "filters"> & {
  filters?: StrictColumnFilterItem[];
  filteredInfo?: Record<string, FilterValue | null>;
}) {
  const { t } = useTranslation();
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(
    selectedKeys || []
  );
  useEffect(() => {
    if (filteredInfo)
      if (Object.keys(filteredInfo).length == 0) {
        setInternalSelectedKeys([]);
        clearFilters?.();
      }
  }, [filteredInfo]);

  return (
    <div style={{ padding: 8 }}>
      {filters?.map((filter, i) => (
        <div
          key={filter.value}
          style={i == filters?.length - 1 ? {} : { paddingBottom: 4 }}
        >
          <Checkbox
            checked={internalSelectedKeys.includes(filter.value)}
            onChange={(e) => {
              const newSelectedKeys = e.target.checked
                ? [...internalSelectedKeys, filter.value]
                : internalSelectedKeys.filter((key) => key !== filter.value);
              setInternalSelectedKeys(newSelectedKeys);
            }}
          >
            {filter.text}
          </Checkbox>
        </div>
      ))}
      <Space
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ButtonContainer
          size="small"
          onClick={() => {
            setInternalSelectedKeys([]);
            clearFilters?.();
          }}
        >
          {t("resetFilters")}
        </ButtonContainer>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setSelectedKeys?.(internalSelectedKeys);
            confirm?.({ closeDropdown: true });
          }}
        >
          {t("OK")}
        </Button>
      </Space>
    </div>
  );
}
