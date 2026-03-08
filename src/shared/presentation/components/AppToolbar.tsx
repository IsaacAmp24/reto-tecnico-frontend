import { DownOutlined } from "@ant-design/icons";
import userAvatar from "../../../assets/toolbar/default-avatar-administrador.svg";
import helpIcon from "../../../assets/toolbar/icon-help.svg";
import bellIcon from "../../../assets/toolbar/icon-notification.svg";
import portfolioIcon from "../../../assets/toolbar/icon-portfolio.svg";
import companyLogo from "../../../assets/toolbar/mandu-company-logo.svg";
import leftBrandLogo from "../../../assets/toolbar/mandu-logo-blanco.svg";
import "./AppToolbar.less";

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "organization", label: "Organización", active: true },
  { key: "models", label: "Modelos", hasArrow: true },
  { key: "tracking", label: "Seguimiento", hasArrow: true },
];

type ToolbarProps = {
  companyLogoSrc?: string;
  companyName?: string;
  userAvatarSrc?: string;
  userName?: string;
};

export default function Toolbar({
  companyLogoSrc = companyLogo,
  companyName = "Mandü",
  userAvatarSrc = userAvatar,
  userName = "Administrador",
}: ToolbarProps) {
  return (
    <header className="appToolbar" role="banner">
      <div className="appToolbar__left">
        <div className="appToolbar__brand" aria-label="Mandü">
          <img
            className="appToolbar__brandLogo"
            src={leftBrandLogo}
            alt="Mandü"
          />
        </div>

        <nav className="appToolbar__nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`appToolbar__navItem${
                item.active ? " appToolbar__navItem--active" : ""
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="appToolbar__navItemContent">
                <span>{item.label}</span>
                {item.hasArrow && (
                  <DownOutlined className="appToolbar__navArrow" />
                )}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="appToolbar__right">
        <button
          type="button"
          className="appToolbar__iconButton"
          aria-label="Portafolio"
        >
          <img
            className="appToolbar__iconGlyph appToolbar__iconGlyph--portfolio"
            src={portfolioIcon}
            alt=""
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="appToolbar__iconButton appToolbar__iconButton--help"
          aria-label="Ayuda"
        >
          <span className="appToolbar__helpGlow">
            <img
              className="appToolbar__iconGlyph appToolbar__iconGlyph--help"
              src={helpIcon}
              alt=""
              aria-hidden="true"
            />
          </span>
        </button>

        <button
          type="button"
          className="appToolbar__iconButton appToolbar__iconButton--notification"
          aria-label="Notificaciones"
        >
          <img
            className="appToolbar__iconGlyph appToolbar__iconGlyph--bell"
            src={bellIcon}
            alt=""
            aria-hidden="true"
          />
        </button>

        <div className="appToolbar__user">
          <img
            className="appToolbar__avatarImage"
            src={userAvatarSrc}
            alt=""
            aria-hidden="true"
          />

          <span className="appToolbar__userName">{userName}</span>

          <button
            type="button"
            className="appToolbar__iconButton appToolbar__iconButton--small appToolbar__userChevron"
            aria-label="Abrir menú de usuario"
          >
            <DownOutlined />
          </button>
        </div>

        <div className="appToolbar__companySlot" aria-label={companyName}>
          <img
            className="appToolbar__companyMark"
            src={companyLogoSrc}
            alt={companyName}
          />
        </div>
      </div>
    </header>
  );
}