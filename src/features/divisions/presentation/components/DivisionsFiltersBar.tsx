import { Input, Select } from "antd";

const { Search } = Input;

type Props = {
  searchField: "name" | "parent_name" | "ambassadors";
  onChangeSearchField: (value: Props["searchField"]) => void;
  onSearch: (value: string) => void;
};

export default function DivisionFiltersBar({
  searchField,
  onChangeSearchField,
  onSearch,
}: Props) {
  return (
    <div className="divisionFiltersBar">
      <Select
        value={searchField}
        onChange={onChangeSearchField}
        className="divisionFiltersBar__select"
        options={[
          { value: "name", label: "División" },
          { value: "parent_name", label: "División superior" },
          { value: "ambassadors", label: "Embajadores" },
        ]}
      />

      <Search
        placeholder="Buscar"
        allowClear
        onSearch={onSearch}
        className="divisionFiltersBar__search"
      />
    </div>
  );
}