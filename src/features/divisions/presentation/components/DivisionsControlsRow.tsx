import { Segmented } from "antd";
import DivisionFiltersBar from "./DivisionsFiltersBar";

type SearchField = "name" | "parent_name" | "ambassadors";
type ViewMode = "listado" | "arbol";

type Props = {
  viewMode?: ViewMode;
  searchField: SearchField;
  onChangeSearchField: (value: SearchField) => void;
  onSearch: (value: string) => void;
};

export default function DivisionsControlsRow({
  viewMode = "listado",
  searchField,
  onChangeSearchField,
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
        onChangeSearchField={onChangeSearchField}
        onSearch={onSearch}
      />
    </div>
  );
}