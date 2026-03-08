import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useMemo, useState, type Key } from "react";

type Props = FilterDropdownProps & {
  options: Array<string | number>;
};

export default function DivisionColumnFilterDropdown({
  options,
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}: Props) {
  const [search, setSearch] = useState("");

  const currentSelectedKeys = (selectedKeys ?? []) as (string | number)[];

  const filteredOptions = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return options;

    return options.filter((option) =>
      String(option).toLowerCase().includes(term)
    );
  }, [options, search]);

  const handleChange = (values: Array<string | number>) => {
    setSelectedKeys(values as Key[]);
  };

  const handleReset = () => {
    setSearch("");
    clearFilters?.();
    setSelectedKeys([]);
    confirm({ closeDropdown: true });
  };

  const handleConfirm = () => {
    confirm({ closeDropdown: true });
  };

  return (
    <div className="divisionColumnFilter">
      <Input
        size="small"
        placeholder="Buscar"
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="divisionColumnFilter__list">
        <Checkbox.Group
          value={currentSelectedKeys}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {filteredOptions.map((option) => (
            <div key={String(option)} className="divisionColumnFilter__item">
              <Checkbox value={option}>{option}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>

      <div className="divisionColumnFilter__footer">
        <Button
          type="link"
          className="divisionColumnFilter__reset"
          onClick={handleReset}
        >
          Reiniciar
        </Button>

        <Button type="primary" size="small" onClick={handleConfirm}>
          OK
        </Button>
      </div>
    </div>
  );
}