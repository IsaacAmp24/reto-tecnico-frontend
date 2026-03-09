import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";

type SearchField = "name" | "parent_name" | "ambassadors" | undefined;

type Props = {
  searchField: SearchField;
  searchText: string;
  onChangeSearchField: (
    value: "name" | "parent_name" | "ambassadors" | undefined
  ) => void;
  onChangeSearchText: (value: string) => void;
  onSearch: (value: string) => void;
};

const searchFieldOptions: DefaultOptionType[] = [
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
  const handleChange = (value: string) => {
    onChangeSearchText(value);

    if (value === "") {
      onSearch("");
    }
  };

  const handlePressEnter = () => {
    onSearch(searchText.trim());
  };

  return (
    <div className="divisionFiltersBar">
      <Select<"name" | "parent_name" | "ambassadors">
        value={searchField}
        placeholder="Columnas"
        allowClear
        onChange={(value) => onChangeSearchField(value)}
        className="divisionFiltersBar__select"
        options={searchFieldOptions}
      />

      <Input
        placeholder="Buscar"
        value={searchText}
        onChange={(event) => handleChange(event.target.value)}
        onPressEnter={handlePressEnter}
        className="divisionFiltersBar__search"
        suffix={
          <SearchOutlined
            className="divisionFiltersBar__searchIcon"
            onClick={() => onSearch(searchText.trim())}
          />
        }
      />
    </div>
  );
}