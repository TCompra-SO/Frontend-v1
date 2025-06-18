import {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import ContentHeader from "./ContentHeader";
import { Col, Row } from "antd";
import InputContainer from "../../containers/InputContainer";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TableType } from "../../../models/Interfaces";
import GeneralTable from "../GeneralTable/GeneralTable";
import { OnChangePageAndPageSizeType } from "../../../utilities/types";

export interface TablePageContentRef {
  resetSearchValue: () => void;
}

interface TablePageContentProps {
  title: string;
  subtitle?: string;
  titleIcon: ReactNode;
  subtitleIcon?: ReactNode;
  table: TableType | null;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  additionalContentHeader?: ReactNode;
  hideSearch?: boolean;
  loading?: boolean;
  onChangePageAndPageSize?: OnChangePageAndPageSizeType;
  total?: number;
  admin?: boolean;
}

const TablePageContent = forwardRef<TablePageContentRef, TablePageContentProps>(
  function TablePageContent(props, ref) {
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState("");

    useImperativeHandle(ref, () => ({
      resetSearchValue: () => setSearchValue(""),
    }));

    function onChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
      setSearchValue(e.currentTarget.value);
      props.onSearch?.(e);
    }

    return (
      <>
        <ContentHeader
          title={props.title}
          icon={props.titleIcon}
          additionalContent={props.additionalContentHeader}
        />
        <div className="card-white">
          <Row
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: "20px",
            }}
            gutter={[10, 10]}
          >
            <Col
              xs={24}
              sm={24}
              md={!props.hideSearch ? 16 : 24}
              lg={!props.hideSearch ? 16 : 24}
              xl={!props.hideSearch ? 16 : 24}
            >
              <div className="sub-titulo">
                {props.subtitleIcon} {props.subtitle}
              </div>
            </Col>
            {!props.hideSearch && (
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <InputContainer
                  placeholder={`${t("search")}...`}
                  prefix={<SearchOutlined />}
                  className="form-control"
                  onChange={onChangeSearchValue}
                  allowClear
                  value={searchValue}
                />
              </Col>
            )}
          </Row>
          {props.table && (
            <div className="table-responsive">
              <GeneralTable
                content={props.table}
                loading={props.loading}
                onChangePageAndPageSize={props.onChangePageAndPageSize}
                total={props.total}
                admin={props.admin}
              />
            </div>
          )}
        </div>
      </>
    );
  }
);

export default TablePageContent;
