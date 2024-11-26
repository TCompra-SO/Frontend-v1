import { TableType } from "../../../../../models/Interfaces";
import GeneralTable from "../../../../common/GeneralTable/GeneralTable";

interface HomeMainTableProps {
  loadingTable?: boolean;
  content: TableType;
}

export default function HomeMainTable(props: HomeMainTableProps) {
  return (
    <div className="card-white cbl-4">
      <div className="table-responsive">
        <GeneralTable
          content={props.content}
          loading={props.loadingTable}
          // onRowAction
        />
      </div>
    </div>
  );
}
