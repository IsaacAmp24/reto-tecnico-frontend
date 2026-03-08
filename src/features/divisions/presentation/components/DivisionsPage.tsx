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
          searchText={searchText}
          onChangeSearchText={(value) => {
            setSearchText(value);
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
            current: page,
            pageSize: perPage,
            total: meta.total ?? 0,
          }}
          onChangeTable={({ pagination, filters: antdFilters, sorter, extra }) => {
            const nextFilters = mapFilters(antdFilters);
            const nextSorter = mapSorter(sorter);

            if (extra.action === "paginate") {
              setPage(pagination.current ?? 1);
              setPerPage(pagination.pageSize ?? 10);
              return;
            }

            if (extra.action === "sort") {
              setPage(1);
              setSortField(nextSorter.field);
              setSortOrder(nextSorter.order);
              return;
            }

            if (extra.action === "filter") {
              setPage(1);
              setFilters(nextFilters);
            }
          }}
        />
      </section>
    </div>
  );
}