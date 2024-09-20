import { ChangeEvent, ReactNode } from "react";
import ContentHeader from "../../common/ContentHeader";
import { Col, Row } from "antd";
import InputContainer from "../../containers/InputContainer";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TableType } from "../../../models/Interfaces";
import GeneralTable from "../../common/GeneralTable/GeneralTable";

interface TablePageContentProps {
  title: string;
  subtitle?: string;
  titleIcon: ReactNode;
  subtitleIcon?: ReactNode;
  table: TableType;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TablePageContent(props: TablePageContentProps) {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={props.title} icon={props.titleIcon} />
      <div className="card-white">
        <Row
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: "20px",
          }}
          gutter={[10, 10]}
        >
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div className="sub-titulo">
              {props.subtitleIcon} {props.subtitle}
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <InputContainer
              placeholder={`${t("search")}...`}
              prefix={<SearchOutlined />}
              className="form-control"
              onChange={props.onSearch}
            />
          </Col>
        </Row>
        <div className="table-responsive">
          <GeneralTable content={props.table} />
        </div>
      </div>
    </>
  );
}
