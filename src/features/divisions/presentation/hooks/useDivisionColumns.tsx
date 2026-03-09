import { FilterFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SortOrder as AntdSortOrder } from "antd/es/table/interface";
import { useMemo } from "react";
import type {
  Division,
  DivisionFilterOptions,
  DivisionListParams,
} from "../../domain/division.model";
import DivisionColumnFilterDropdown from "../components/DivisionsColumnFilterDropdown";
import DivisionsRowActions from "../components/DivisionsRowActions";

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
  onOpenCreateSubdivision: (division: Division) => void;
  onOpenSubdivisions: (division: Division) => void;
  onEdit: (division: Division) => void;
  onDelete: (division: Division) => void;
};

export function useDivisionColumns({
  filterOptions,
  filters,
  sortField,
  sortOrder,
  onOpenCreateSubdivision,
  onOpenSubdivisions,
  onEdit,
  onDelete,
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
        render: (value: number, record: Division) => (
          <div className="divisionSubdivisionsCell">
            <button
              type="button"
              className="divisionSubdivisionsCell__count"
              onClick={() => onOpenSubdivisions(record)}
            >
              {value}
            </button>

            <Button
              type="text"
              className="divisionSubdivisionsCell__add"
              icon={<PlusCircleFilled />}
              onClick={() => onOpenCreateSubdivision(record)}
              aria-label={`Crear subdivisión para ${record.name}`}
            />
          </div>
        ),
      },
      {
        title: "Embajadores",
        dataIndex: "ambassadors",
        key: "ambassadors",
        ellipsis: { showTitle: true },
        render: (value: string | null) => value ?? "-",
      },
      {
        title: "",
        key: "actions",
        width: 60,
        fixed: "right",
        className: "ant-table-column-cell-actions",
        render: (_: unknown, record: Division) => (
          <DivisionsRowActions
            record={record}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ];
  }, [filterOptions, filters, sortField, sortOrder]);
}