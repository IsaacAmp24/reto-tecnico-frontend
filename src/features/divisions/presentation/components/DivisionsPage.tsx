import { useDivisionFilterOptionsQuery } from "../../application/queries/useDivisionFilterOptionsQuery";
import { useDivisionsQuery } from "../../application/queries/useDivisionsQuery";
import "../divisions.less";

import { useDivisionColumns } from "../hooks/useDivisionColumns";
import { useDivisionsTableState } from "../hooks/useDivisionsTableState";
import DivisionsControlsRow from "./DivisionsControlsRow";
import DivisionsHeader from "./DivisionsHeader";
import DivisionsHeaderActions from "./DivisionsHeaderActions";
import DivisionsTable from "./DivisionsTable";

export default function DivisionsPage() {
  const {
    searchField,
    setSearchField,
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
  } = useDivisionsTableState();

  const filterOptions = useDivisionFilterOptionsQuery();
  const { rows, meta, loading } = useDivisionsQuery(params);

  const columns = useDivisionColumns({
    filterOptions,
    filters,
    sortField,
    sortOrder,
  });

  return (
    <div className="divisionsScreen">
      <DivisionsHeader
        activeTab="divisiones"
        actions={<DivisionsHeaderActions />}
      />

      <section className="divisionsBodySurface">
        <DivisionsControlsRow
          searchField={searchField}
          onChangeSearchField={(value) => {
            setSearchField(value);
            setPage(1);
          }}
          onSearch={(value) => {
            setSearchText(value ?? "");
            setPage(1);
          }}
        />

        <DivisionsTable
          rows={rows}
          loading={loading}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          onChangeSelectedRowKeys={setSelectedRowKeys}
          pagination={{
            current: meta.current_page ?? page,
            pageSize: meta.per_page ?? perPage,
            total: meta.total ?? 0,
          }}
          onChangeTable={({ pagination, filters: antdFilters, sorter }) => {
            setPage(pagination.current ?? 1);
            setPerPage(pagination.pageSize ?? 10);

            const s = mapSorter(sorter);
            setSortField(s.field);
            setSortOrder(s.order);

            setFilters(mapFilters(antdFilters));
          }}
        />
      </section>
    </div>
  );
}