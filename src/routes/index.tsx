// src/routes.ts
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const BlogManager = lazy(() => import("../pages/subPage/BlogManager"));
const BlogComment = lazy(() => import("../pages/subPage/BlogComment"));
const BlogCategory = lazy(() => import("../pages/subPage/BlogCategory"));
const System = lazy(() => import("../pages/System"));
const CreateBlog = lazy(() => import("../pages/CreateBlog"));

const NotFound = lazy(() => import("../pages/NotFound"));

export interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: RouteType[];
}

// { key: "0", label: "系统概览" },

//   {
//     key: "1",
//     label: "博客管理",
//     children: [
//       { key: "1-1", label: "博客管理", route: "/admin/blogManager" },
//       { key: "1-2", label: "博客评论", route: "/admin/blogComment" },
//       { key: "1-3", label: "博客分类", route: "/admin/blogCategory" },
//     ],
//   },
//   {
//     key: "2",
//     label: "模块管理",
//     children: [
//       { key: "2-1", label: "友情链接", route: "/admin/friendLink" },
//       { key: "2-2", label: "轮播图管理", route: "/admin/systemSetting" },
//     ],
//   },
//   {
//     key: "3",
//     label: "权限管理",
//     children: [
//       { key: "3-1", label: "权限列表", route: "/admin/permissionList" },
//       { key: "3-2", label: "权限分配", route: "/admin/permissionAssign" },
//       { key: "3-3", label: "用户管理", route: "/admin/userManager" },
//     ],
//   },

//   { key: "4", label: "系统设置", route: "/admin/systemSetting" },

const routes: RouteType[] = [
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admin",
    element: <Home />,
    children: [
      {
        path: "/admin/blogManager",
        element: <BlogManager />,
      },
      { path: "/admin/blogComment", element: <BlogComment /> }, // Nested route example
      { path: "/admin/blogCategory", element: <BlogCategory /> }, // Nested route example
      { path: "/admin/system", element: <System /> }, // Nested route example
    ],
  },

  { path: "/createBlog", element: <CreateBlog /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
