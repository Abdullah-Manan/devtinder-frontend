import React from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./providers/PrivateRoutes";
import { AuthRoute } from "./providers/AuthRoutes";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Profile from "./component/Profile";

function Routes() {
  return (
    <AppRoutes>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </AppRoutes>
  );
}

export default Routes;
