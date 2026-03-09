import { EllipsisOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import type { Division } from "../../domain/division.model";

export type RowActionProps = {
  record: Division;
  onEdit: (division: Division) => void;
  onDelete: (division: Division) => void;
};

export default function DivisionsRowActions({
  record,
  onEdit,
  onDelete,
}: RowActionProps) {
  const items = [
    { key: "edit", label: "Editar" },
    { key: "delete", label: "Eliminar" },
  ];

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (key === "edit") onEdit(record);
    else if (key === "delete") onDelete(record);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <EllipsisOutlined style={{ fontSize: 20, cursor: "pointer" }} />
    </Dropdown>
  );
}
