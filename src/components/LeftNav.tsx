import React, { useEffect, useState, useCallback } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuItem, LeftNavProps } from "../type";

const LeftNav: React.FC<LeftNavProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();

  const getCurrentMenu = useCallback(() => {
    const currentPath = location.pathname;
    const findMenuItem = (items: MenuItem[]): string[] => {
      for (const item of items) {
        if (item.route === currentPath) {
          return [item.key];
        }
        if (item.children) {
          const found = findMenuItem(item.children);
          if (found.length > 0) {
            return [item.key, ...found];
          }
        }
      }
      return [];
    };
    const matchedMenu = findMenuItem(menuItems);
    setCurrentMenu(matchedMenu);
    setOpenKeys(matchedMenu);
  }, [menuItems, location.pathname]);

  useEffect(() => {
    getCurrentMenu();
  }, [getCurrentMenu]);

  const handleMenuClick = (e: MenuInfo, item: MenuItem) => {
    setCurrentMenu(e.keyPath);
    if (item.route) {
      navigate(item.route);
    }
  };

  const handlerSubMenuClick = (openKeys: string[]) => {
    setOpenKeys(openKeys);
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
          <Menu.Item key={item.key} onClick={(e) => handleMenuClick(e, item)}>
            {item.label}
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Menu mode="inline" style={{ height: "100%", borderRight: 0 }} selectedKeys={currentMenu} openKeys={openKeys} onOpenChange={handlerSubMenuClick}>
      {generateMenuItems(menuItems)}
    </Menu>
  );
};

export default LeftNav;
