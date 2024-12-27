// src/Router.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteType } from "./type";
import routes from "./routes";
import PrivateRoute from "./components/PrivateRouteWrap";

const renderRoutes = (routes: RouteType[]) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={<PrivateRoute element={route.element} />}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    if (route.path === "/login") {
      return <Route key={index} path={route.path} element={route.element} />;
    }
    return <Route key={index} path={route.path} element={<PrivateRoute element={route.element} />} />;
  });
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>{renderRoutes(routes)}</Routes>
    </Router>
  );
};

export default App;
