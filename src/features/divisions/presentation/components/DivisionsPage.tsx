import { message, Modal } from "antd";
import { useMemo, useState } from "react";
import { useDivisionCommands } from "../../application/commands/useDivisionCommands";
import { useDivisionFilterOptionsQuery } from "../../application/queries/useDivisionFilterOptionsQuery";
import { useDivisionSubdivisionsQuery } from "../../application/queries/useDivisionSubdivisionsQuery";
import { useDivisionsQuery } from "../../application/queries/useDivisionsQuery";
import type {
  Division,
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
import DivisionsSubdivisionsDrawer from "./DivisionsSubdivisionsDrawer";
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
  const [createParentId, setCreateParentId] = useState<number | null>(null);
  const [createModalTitle, setCreateModalTitle] = useState("Crear división");
  const [lockCreateParent, setLockCreateParent] = useState(false);
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [isSubdivisionsDrawerOpen, setIsSubdivisionsDrawerOpen] = useState(false);

  const filterOptions = useDivisionFilterOptionsQuery();
  const { rows, meta, loading } = useDivisionsQuery(params, reloadKey);
  const { loading: commandLoading, create, update, remove } = useDivisionCommands();

  const { rows: subdivisionRows, loading: subdivisionLoading } =
    useDivisionSubdivisionsQuery(selectedDivision?.id ?? null, isSubdivisionsDrawerOpen);

  const parentOptions: DivisionOption[] = useMemo(
    () =>
      rows.map((division) => ({
        label: division.name,
        value: division.id,
      })),
    [rows]
  );

  const handleOpenCreateModal = () => {
  setEditingDivision(null);
  setCreateParentId(null);
  setCreateModalTitle("Crear división");
  setLockCreateParent(false);
  setIsCreateModalOpen(true);
};

  const handleOpenCreateSubdivision = (division: Division) => {
  setCreateParentId(division.id);
  setCreateModalTitle(`Crear subdivisión de ${division.name}`);
  setLockCreateParent(true);
  setIsCreateModalOpen(true);
};

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateParentId(null);
    setCreateModalTitle("Crear división");
    setLockCreateParent(false);
    setEditingDivision(null);
  };

  const handleOpenSubdivisions = (division: Division) => {
    setSelectedDivision(division);
    setIsSubdivisionsDrawerOpen(true);
  };

  const handleCloseSubdivisions = () => {
    setIsSubdivisionsDrawerOpen(false);
    setSelectedDivision(null);
  };

  /* new action callbacks */
  const handleEditDivision = (division: Division) => {
    setEditingDivision(division);
    setCreateModalTitle("Editar división");
    setCreateParentId(division.parentId ?? null);
    setLockCreateParent(false); // allow changing parent
    setIsCreateModalOpen(true);
  };

  const handleDeleteDivision = (division: Division) => {
    Modal.confirm({
      title: "Confirmar eliminación",
      content: `¿Estás seguro que deseas eliminar la división "${division.name}"? Esta acción no se puede deshacer.`,
      okText: "Eliminar",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await remove(division.id);
          message.success("División eliminada");
          setReloadKey((prev) => prev + 1);
        } catch {
          message.error("No se pudo eliminar la división");
        }
      },
    });
  };

  const handleCreateDivision = async (values: DivisionUpsertPayload) => {
    try {
      if (editingDivision) {
        await update(editingDivision.id, values);
        message.success("División actualizada correctamente");
      } else {
        await create(values);
        message.success("División creada correctamente");
      }
      setIsCreateModalOpen(false);
      setEditingDivision(null);
      setPage(1);
      setReloadKey((prev) => prev + 1);
    } catch {
      message.error(editingDivision ? "No se pudo actualizar la división" : "No se pudo crear la división");
    }
  };

  const columns = useDivisionColumns({
    filterOptions,
    filters,
    sortField,
    sortOrder,
    onOpenCreateSubdivision: handleOpenCreateSubdivision,
    onOpenSubdivisions: handleOpenSubdivisions,
    onEdit: handleEditDivision,
    onDelete: handleDeleteDivision,
  });

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
          initialDivision={editingDivision}
          open={isCreateModalOpen}
          loading={commandLoading}
          title={createModalTitle}
          parentOptions={parentOptions}
          initialParentId={createParentId}
          lockParent={lockCreateParent}
          onCancel={handleCloseCreateModal}
          onSubmit={handleCreateDivision}
        />

        <DivisionsSubdivisionsDrawer
          open={isSubdivisionsDrawerOpen}
          loading={subdivisionLoading}
          parentDivisionName={selectedDivision?.name ?? ""}
          rows={subdivisionRows}
          onClose={handleCloseSubdivisions}
        />
      </section>
    </div>
  );
}