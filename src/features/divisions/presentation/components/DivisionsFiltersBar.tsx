import { Input, Select } from "antd";

const { Search } = Input;

type SearchField = "name" | "parent_name" | "ambassadors";

type Props = {
  searchField: SearchField;
  searchText: string;
  onChangeSearchField: (value: SearchField) => void;
  onChangeSearchText: (value: string) => void;
  onSearch: (value: string) => void;
};

const searchFieldOptions: Array<{ value: SearchField; label: string }> = [
  { value: "name", label: "División" },
  { value: "parent_name", label: "División superior" },
  { value: "ambassadors", label: "Embajadores" },
];

export default function DivisionFiltersBar({
  searchField,
  searchText,
  onChangeSearchField,
  onChangeSearchText,
  onSearch,
}: Props) {
  const handleSearch = (value: string) => {
    onSearch(value.trim());
  };

  const handleClearOrChange = (value: string) => {
    onChangeSearchText(value);

    // opcional pero recomendado:
    // cuando el usuario limpia el input con allowClear,
    // se dispara de inmediato una nueva búsqueda vacía.
    if (value === "") {
      onSearch("");
    }
  };

  return (
    <div className="divisionFiltersBar">
      <Select<SearchField>
        value={searchField}
        onChange={onChangeSearchField}
        className="divisionFiltersBar__select"
        options={searchFieldOptions}
      />

      <Search
        placeholder="Buscar"
        allowClear
        value={searchText}
        onChange={(event) => handleClearOrChange(event.target.value)}
        onSearch={handleSearch}
        className="divisionFiltersBar__search"
      />
    </div>
  );
}