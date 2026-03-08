import { FilterFilled } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SortOrder as AntdSortOrder } from "antd/es/table/interface";
import { useMemo } from "react";
import type {
  Division,
  DivisionFilterOptions,
  DivisionListParams,
} from "../../domain/division.model";
import DivisionColumnFilterDropdown from "../components/DivisionsColumnFilterDropdown";

type SortField = NonNullable<DivisionListParams["sort_field"]>;
type SortOrder = NonNullable<DivisionListParams["sort_order"]>;

function toAntdSortOrder(
  field: SortField,
  currentSortField: SortField,
  currentSortOrder: SortOrder
): AntdSortOrder | null {
  if (field !== currentSortField) return null;
  return currentSortOrder === "asc" ? "ascend" : "descend";
}

type Props = {
  filterOptions: DivisionFilterOptions;
  filters: Record<string, (string | number)[]>;
  sortField: SortField;
  sortOrder: SortOrder;
};

export function useDivisionColumns({
  filterOptions,
  filters,
  sortField,
  sortOrder,
}: Props): ColumnsType<Division> {
  return useMemo(() => {
    const nameOptions = filterOptions.name ?? [];
    const parentOptions = filterOptions.parent_name ?? [];

    return [
      {
        title: "División",
        dataIndex: "name",
        key: "name",
        width: 207,
        ellipsis: { showTitle: true },
        sorter: true,
        sortOrder: toAntdSortOrder("name", sortField, sortOrder),
        filteredValue: filters.name ?? null,
        filterDropdown: (dropdownProps) => (
          <DivisionColumnFilterDropdown
            {...dropdownProps}
            options={nameOptions}
          />
        ),
        filterIcon: (filtered) => (
          <FilterFilled
            className={
              filtered
                ? "divisionFilterIcon divisionFilterIcon--active"
                : "divisionFilterIcon"
            }
          />
        ),
      },
      {
        title: "División superior",
        dataIndex: "parentName",
        key: "parent_name",
        width: 249,
        ellipsis: { showTitle: true },
        sorter: true,
        sortOrder: toAntdSortOrder("parent_name", sortField, sortOrder),
        filteredValue: filters.parent_name ?? null,
        filterDropdown: (dropdownProps) => (
          <DivisionColumnFilterDropdown
            {...dropdownProps}
            options={parentOptions}
          />
        ),
        filterIcon: (filtered) => (
          <FilterFilled
            className={
              filtered
                ? "divisionFilterIcon divisionFilterIcon--active"
                : "divisionFilterIcon"
            }
          />
        ),
        render: (value: string | null) => value ?? "-",
      },
      {
        title: "Colaboradores",
        dataIndex: "collaborators",
        key: "collaborators",
        width: 199,
        sorter: true,
        sortOrder: toAntdSortOrder("collaborators", sortField, sortOrder),
      },
      {
        title: "Nivel",
        dataIndex: "level",
        key: "level",
        width: 104,
        sorter: true,
        sortOrder: toAntdSortOrder("level", sortField, sortOrder),
      },
      {
        title: "Subdivisiones",
        dataIndex: "childrenCount",
        key: "children_count",
        width: 215,
        sorter: true,
        sortOrder: toAntdSortOrder("children_count", sortField, sortOrder),
        render: (value: number) => <span>{value}</span>,
      },
      {
        title: "Embajadores",
        dataIndex: "ambassadors",
        key: "ambassadors",
        ellipsis: { showTitle: true },
        render: (value: string | null) => value ?? "-",
      },
    ];
  }, [filterOptions, filters, sortField, sortOrder]);
}