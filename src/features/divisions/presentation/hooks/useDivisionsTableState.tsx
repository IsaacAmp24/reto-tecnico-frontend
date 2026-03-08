import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useMemo, useState, type Key } from "react";
import type { Division, DivisionListParams } from "../../domain/division.model";

type SearchField = NonNullable<DivisionListParams["search_field"]>;
type SortField = NonNullable<DivisionListParams["sort_field"]>;
type SortOrder = NonNullable<DivisionListParams["sort_order"]>;

function isValidSortField(value: unknown): value is SortField {
  return [
    "id",
    "name",
    "parent_name",
    "collaborators",
    "level",
    "children_count",
  ].includes(String(value));
}

function mapSorter(
  sorter: SorterResult<Division> | SorterResult<Division>[]
): { field: SortField; order: SortOrder } {
  const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

  if (!currentSorter?.columnKey || !currentSorter?.order) {
    return { field: "id", order: "asc" };
  }

  return {
    field: isValidSortField(currentSorter.columnKey)
      ? currentSorter.columnKey
      : "id",
    order: currentSorter.order === "descend" ? "desc" : "asc",
  };
}

function mapFilters(
  filters: Record<string, FilterValue | null>
): Record<string, (string | number)[]> {
  const nextFilters: Record<string, (string | number)[]> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      nextFilters[key] = value as (string | number)[];
    }
  });

  return nextFilters;
}

export function useDivisionsTableState() {
  const [searchField, setSearchField] = useState<SearchField>("name");
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [filters, setFilters] = useState<Record<string, (string | number)[]>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const params: DivisionListParams = useMemo(
    () => ({
      page,
      per_page: perPage,
      search_field: searchField,
      search_text: searchText.trim(),
      sort_field: sortField,
      sort_order: sortOrder,
      filters,
    }),
    [page, perPage, searchField, searchText, sortField, sortOrder, filters]
  );

  return {
    searchField,
    setSearchField,
    searchText,
    setSearchText,
    page,
    setPage,
    perPage,
    setPerPage,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    selectedRowKeys,
    setSelectedRowKeys,
    params,
    mapSorter,
    mapFilters,
  };
}