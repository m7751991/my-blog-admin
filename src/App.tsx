// src/Router.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteType } from "./type";
import routes from "./routes";

const renderRoutes = (routes: RouteType[]) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={index} path={route.path} element={route.element} />;
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
