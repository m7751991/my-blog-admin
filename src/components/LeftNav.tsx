import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  key: string;
  label: string;
  route?: string;
  children?: MenuItem[];
}

interface LeftNavProps {
  menuItems: MenuItem[];
}

const LeftNav: React.FC<LeftNavProps> = ({ menuItems }) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: MenuItem) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  const generateMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} title={item.label}>
            {generateMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} onClick={() => handleMenuClick(item)}>
            {item.label}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
      {generateMenuItems(menuItems)}
    </Menu>
  );
};

export default LeftNav;
