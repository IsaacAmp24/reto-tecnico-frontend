import { Segmented } from "antd";
import DivisionFiltersBar from "./DivisionsFiltersBar";

type SearchField = "name" | "parent_name" | "ambassadors";
type ViewMode = "listado" | "arbol";

type Props = {
  viewMode?: ViewMode;
  searchField: SearchField;
  searchText: string;
  onChangeSearchField: (value: SearchField) => void;
  onChangeSearchText: (value: string) => void;
  onSearch: (value: string) => void;
};

export default function DivisionsControlsRow({
  viewMode = "listado",
  searchField,
  searchText,
  onChangeSearchField,
  onChangeSearchText,
  onSearch,
}: Props) {
  return (
    <div className="divisionsControlsRow">
      <Segmented
        className="divisionsViewMode"
        value={viewMode}
        options={[
          { label: "Listado", value: "listado" },
          { label: "Árbol", value: "arbol" },
        ]}
      />

      <DivisionFiltersBar
        searchField={searchField}
        searchText={searchText}
        onChangeSearchField={onChangeSearchField}
        onChangeSearchText={onChangeSearchText}
        onSearch={onSearch}
      />
    </div>
  );
}