import { message } from "antd";
import { useMemo, useState } from "react";
import { useDivisionCommands } from "../../application/commands/useDivisionCommands";
import { useDivisionFilterOptionsQuery } from "../../application/queries/useDivisionFilterOptionsQuery";
import { useDivisionsQuery } from "../../application/queries/useDivisionsQuery";
import type {
  DivisionOption,
  DivisionUpsertPayload,
} from "../../domain/division.model";
import "../divisions.less";

import { useDivisionColumns } from "../hooks/useDivisionColumns";
import { useDivisionsTableState } from "../hooks/useDivisionsTableState";
import DivisionsControlsRow from "./DivisionsControlsRow";
import DivisionsCreateModal from "./DivisionsCreateModal";
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const filterOptions = useDivisionFilterOptionsQuery();
  const { rows, meta, loading } = useDivisionsQuery(params, reloadKey);
  const { loading: commandLoading, create } = useDivisionCommands();

  const columns = useDivisionColumns({
    filterOptions,
    filters,
    sortField,
    sortOrder,
  });

  const parentOptions: DivisionOption[] = useMemo(
    () =>
      rows.map((division) => ({
        label: division.name,
        value: division.id,
      })),
    [rows]
  );

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateDivision = async (values: DivisionUpsertPayload) => {
    try {
      await create(values);

      message.success("División creada correctamente");
      setIsCreateModalOpen(false);

      // vuelve a la primera página y fuerza recarga
      setPage(1);
      setReloadKey((prev) => prev + 1);
    } catch {
      message.error("No se pudo crear la división");
    }
  };

  return (
    <div className="divisionsScreen">
      <DivisionsHeader
        activeTab="divisiones"
        actions={<DivisionsHeaderActions onAdd={handleOpenCreateModal} />}
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
              const nextPageSize = pagination.pageSize ?? 10;
              const pageSizeChanged = nextPageSize !== perPage;

              setPerPage(nextPageSize);
              setPage(pageSizeChanged ? 1 : (pagination.current ?? 1));
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

        <DivisionsCreateModal
          open={isCreateModalOpen}
          loading={commandLoading}
          parentOptions={parentOptions}
          onCancel={handleCloseCreateModal}
          onSubmit={handleCreateDivision}
        />
      </section>
    </div>
  );
}