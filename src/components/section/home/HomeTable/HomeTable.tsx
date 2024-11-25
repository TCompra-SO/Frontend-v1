import { TableType } from "../../../../models/Interfaces";
import HomeFilters from "./items/HomeFilters";
import HomeMainTable from "./items/HomeMainTable";

interface HomeTableProps {
  loadingTable?: boolean;
  content: TableType;
}

export default function HomeTable(props: HomeTableProps) {
  return (
    <>
      <HomeFilters />
      <HomeMainTable
        content={props.content}
        loadingTable={props.loadingTable}
      />
    </>
  );
}
