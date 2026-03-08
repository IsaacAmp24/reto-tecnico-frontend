import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { Division } from "../../domain/division.model";

type Props = {
  rows: Division[];
  loading: boolean;
  columns: ColumnsType<Division>;
  pagination: { current: number; pageSize: number; total: number };
  selectedRowKeys: React.Key[];
  onChangeSelectedRowKeys: (keys: React.Key[]) => void;
  onChangeTable: (args: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<Division> | SorterResult<Division>[];
  }) => void;
};

export default function DivisionsTable({
  rows,
  loading,
  columns,
  pagination,
  selectedRowKeys,
  onChangeSelectedRowKeys,
  onChangeTable,
}: Props) {
  return (
    <div className="divisionsTableWrapper">
      <Table<Division>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={rows}
        className="divisionsTable"
        rowSelection={{
          selectedRowKeys,
          onChange: onChangeSelectedRowKeys,
          columnWidth: 44,
        }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          showTotal: (total) => `Total registros: ${total}`,
        }}
        onChange={(p, f, s) => onChangeTable({ pagination: p, filters: f, sorter: s })}
      />
    </div>
  );
}