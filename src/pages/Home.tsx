import React from "react";
import LeftNav from "../components/LeftNav"; // Adjust the import path as necessary
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
const menuItems = [
  { key: "0", label: "系统概览", route: "/admin" },

  {
    key: "1",
    label: "博客管理",
    children: [
      { key: "1-1", label: "博客管理", route: "/admin/blogManager" },
      { key: "1-2", label: "博客评论", route: "/admin/blogComment" },
      { key: "1-3", label: "博客分类", route: "/admin/blogCategory" },
    ],
  },
  {
    key: "2",
    label: "模块管理",
    children: [
      { key: "2-1", label: "友情链接", route: "/admin/friendLink" },
      { key: "2-2", label: "轮播图管理", route: "/admin/carouselManager" },
    ],
  },
  {
    key: "3",
    label: "权限管理",
    children: [
      { key: "3-1", label: "权限列表", route: "/admin/permissionList" },
      { key: "3-2", label: "权限分配", route: "/admin/permissionAssign" },
      { key: "3-3", label: "用户管理", route: "/admin/userManager" },
    ],
  },

  { key: "4", label: "系统设置", route: "/admin/systemSetting" },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1 ">
        <div className="w-280  overflow-y-auto my-16">
          <LeftNav menuItems={menuItems} />
        </div>
        <div className="flex-1  overflow-y-auto m-16 p-16 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
