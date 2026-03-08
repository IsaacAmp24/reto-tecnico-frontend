import { FilterFilled } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SortOrder as AntdSortOrder } from "antd/es/table/interface";
import { useMemo } from "react";
import type { Division, DivisionFilterOptions, DivisionListParams } from "../../domain/division.model";
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
    const nameOptions = filterOptions.name || [];
    const parentOptions = filterOptions.parent_name || [];

    return [
      {
        title: "División",
        dataIndex: "name",
        key: "name",
        sorter: true,
        sortOrder: toAntdSortOrder("name", sortField, sortOrder),
        filteredValue: filters.name ?? null,
        filterDropdown: (props) => (
          <DivisionColumnFilterDropdown {...props} options={nameOptions} />
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
        sorter: true,
        sortOrder: toAntdSortOrder("parent_name", sortField, sortOrder),
        filteredValue: filters.parent_name ?? null,
        filterDropdown: (props) => (
          <DivisionColumnFilterDropdown {...props} options={parentOptions} />
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
        title: "Colaboradores",
        dataIndex: "collaborators",
        key: "collaborators",
        sorter: true,
        sortOrder: toAntdSortOrder("collaborators", sortField, sortOrder),
      },
      {
        title: "Nivel",
        dataIndex: "level",
        key: "level",
        sorter: true,
        sortOrder: toAntdSortOrder("level", sortField, sortOrder),
      },
      {
        title: "Subdivisiones",
        dataIndex: "childrenCount",
        key: "children_count",
        sorter: true,
        sortOrder: toAntdSortOrder("children_count", sortField, sortOrder),
        render: (value: number) => <span>{value}</span>,
      },
      {
        title: "Embajadores",
        dataIndex: "ambassadors",
        key: "ambassadors",
      },
    ];
  }, [filterOptions, filters, sortField, sortOrder]);
}