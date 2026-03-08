import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState, type Key } from "react";
import type { Division, DivisionListParams } from "../../domain/division.model";

type SearchField = NonNullable<DivisionListParams["search_field"]>;
type SortField = NonNullable<DivisionListParams["sort_field"]>;
type SortOrder = NonNullable<DivisionListParams["sort_order"]>;

function mapSorter(
  sorter: SorterResult<Division> | SorterResult<Division>[]
): { field: SortField; order: SortOrder } {
  const s = Array.isArray(sorter) ? sorter[0] : sorter;

  const order: SortOrder =
    s?.order === "descend"
      ? "desc"
      : s?.order === "ascend"
      ? "asc"
      : "asc";

  const field = (s?.columnKey as SortField) || "id";

  return { field, order };
}

function mapFilters(
  filters: Record<string, FilterValue | null>
): Record<string, (string | number)[]> {
  const out: Record<string, (string | number)[]> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      out[key] = value as (string | number)[];
    }
  });

  return out;
}

export function useDivisionsTableState() {
  const [searchField, setSearchField] = useState<SearchField>("name");
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [filters, setFilters] = useState<Record<string, (string | number)[]>>(
    {}
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const params: DivisionListParams = {
    page,
    per_page: perPage,
    search_field: searchField,
    search_text: searchText,
    sort_field: sortField,
    sort_order: sortOrder,
    filters,
  };

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