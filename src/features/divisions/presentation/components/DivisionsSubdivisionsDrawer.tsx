import { Drawer, Empty, List, Spin, Typography } from "antd";
import type { Division } from "../../domain/division.model";

const { Text } = Typography;

type Props = {
  open: boolean;
  loading: boolean;
  parentDivisionName: string;
  rows: Division[];
  onClose: () => void;
};

export default function DivisionsSubdivisionsDrawer({
  open,
  loading,
  parentDivisionName,
  rows,
  onClose,
}: Props) {
  return (
    <Drawer
      title={`Subdivisiones de ${parentDivisionName}`}
      open={open}
      onClose={onClose}
      width={420}
      destroyOnHidden
    >
      {loading ? (
        <Spin />
      ) : rows.length === 0 ? (
        <Empty description="No hay subdivisiones registradas" />
      ) : (
        <List
          dataSource={rows}
          renderItem={(item) => (
            <List.Item>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Text strong>{item.name}</Text>
                <Text type="secondary">
                  Nivel: {item.level} · Colaboradores: {item.collaborators}
                </Text>
                <Text type="secondary">
                  Embajador: {item.ambassadors ?? "-"}
                </Text>
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
}