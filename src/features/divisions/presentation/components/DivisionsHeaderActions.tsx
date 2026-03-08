import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
};

export default function DivisionsHeaderActions({
  onAdd,
  onImport,
  onExport,
}: Props) {
  return (
    <div className="divisionsHeaderActions">
      <Button
        type="text"
        className="divisionsHeaderActionButton divisionsHeaderActionButton--add"
        icon={<PlusOutlined />}
        onClick={onAdd}
        aria-label="Agregar división"
      />

      <div className="divisionsHeaderActionsGroup">
        <Button
          type="text"
          className="divisionsHeaderActionButton divisionsHeaderActionButton--import"
          icon={<UploadOutlined />}
          onClick={onImport}
          aria-label="Importar divisiones"
        />

        <Button
          type="text"
          className="divisionsHeaderActionButton divisionsHeaderActionButton--export"
          icon={<DownloadOutlined />}
          onClick={onExport}
          aria-label="Exportar divisiones"
        />
      </div>
    </div>
  );
}