import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import type {
    DivisionOption,
    DivisionUpsertPayload,
} from "../../domain/division.model";

type Props = {
  open: boolean;
  loading: boolean;
  parentOptions: DivisionOption[];
  onCancel: () => void;
  onSubmit: (values: DivisionUpsertPayload) => Promise<void>;
};

type FormValues = {
  name: string;
  parent_id?: number;
  ambassadors?: string;
};

export default function DivisionsCreateModal({
  open,
  loading,
  parentOptions,
  onCancel,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleFinish = async (values: FormValues) => {
    await onSubmit({
      name: values.name.trim(),
      parent_id: values.parent_id ?? null,
      ambassadors: values.ambassadors?.trim() || null,
    });
    form.resetFields();
  };

  return (
    <Modal
      title="Crear división"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Guardar"
      cancelText="Cancelar"
      confirmLoading={loading}
      destroyOnHidden
    >
      <Form<FormValues>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: "",
          parent_id: undefined,
          ambassadors: "",
        }}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            { required: true, message: "El nombre es obligatorio" },
            { max: 45, message: "El nombre no debe superar los 45 caracteres" },
          ]}
        >
          <Input placeholder="Ej. Operaciones" maxLength={45} />
        </Form.Item>

        <Form.Item label="División superior" name="parent_id">
          <Select
            allowClear
            placeholder="Selecciona una división superior"
            options={parentOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          label="Embajador"
          name="ambassadors"
          rules={[
            { max: 120, message: "El nombre no debe superar los 120 caracteres" },
          ]}
        >
          <Input placeholder="Ej. Juan Pérez" maxLength={120} />
        </Form.Item>
      </Form>
    </Modal>
  );
}