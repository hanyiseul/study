import type { MenuGroup } from '../lib/dashboardData';

type Props = {
  menuGroups: MenuGroup[];
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
};

export default function Sidebar({
  menuGroups,
  selectedMenu,
  setSelectedMenu,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-row">
        <div className="sidebar-logo-mark">
          <span className="mark-left"></span>
          <span className="mark-right"></span>
        </div>
        <h1 className="sidebar-logo-text">Smart Wms</h1>
      </div>

      <div className="sidebar-menu-wrap">
        {menuGroups.map(function (group) {
          return (
            <section className="sidebar-group" key={group.title}>
              <h2 className="sidebar-group-title">{group.title}</h2>

              {group.items.map(function (item) {
                const isActive = selectedMenu === item.label;
                const className =
                  item.type === 'main'
                    ? isActive
                      ? 'sidebar-menu active'
                      : 'sidebar-menu'
                    : isActive
                    ? 'sidebar-submenu active-submenu'
                    : 'sidebar-submenu';

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={className}
                    onClick={function () {
                      setSelectedMenu(item.label);
                    }}
                  >
                    <span
                      className={
                        item.type === 'main'
                          ? 'sidebar-menu-icon'
                          : 'sidebar-submenu-icon'
                      }
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>
    </aside>
  );
}