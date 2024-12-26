// src/routes.ts
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteType } from "../type";

const Home = lazy(() => import("../pages/Home"));
const BlogManager = lazy(() => import("../pages/subPage/BlogManager"));
const BlogComment = lazy(() => import("../pages/subPage/BlogComment"));
const BlogCategory = lazy(() => import("../pages/subPage/BlogCategory"));
const CreateBlog = lazy(() => import("../pages/CreateBlog"));
const System = lazy(() => import("../pages/System"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes: RouteType[] = [
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
    default: true,
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
  { path: "/login", element: <Login /> },
  { path: "/createBlog", element: <CreateBlog /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
