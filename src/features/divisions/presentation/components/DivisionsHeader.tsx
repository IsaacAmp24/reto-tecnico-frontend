import { Tabs } from "antd";
import type { ReactNode } from "react";

type HeaderTabKey = "divisiones" | "colaboradores";

type Props = {
  activeTab: HeaderTabKey;
  onChangeTab?: (key: HeaderTabKey) => void;
  actions?: ReactNode;
};

const headerTabItems = [
  { key: "divisiones", label: "Divisiones" },
  { key: "colaboradores", label: "Colaboradores" },
] as const;

export default function DivisionsHeader({
  activeTab,
  onChangeTab,
  actions,
}: Props) {
  return (
    <section className="divisionsHeaderSurface">
      <div className="divisionsHeaderMain">
        <div className="divisionsHeaderInfo">
          <h1 className="divisionsTitle">Organización</h1>

          <Tabs
            className="divisionsTabs"
            activeKey={activeTab}
            onChange={(key) => onChangeTab?.(key as HeaderTabKey)}
            items={headerTabItems.map((item) => ({
              key: item.key,
              label: item.label,
            }))}
          />
        </div>

        {actions ? (
          <div className="divisionsHeaderActions">{actions}</div>
        ) : null}
      </div>
    </section>
  );
}