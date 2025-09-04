import React from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./providers/PrivateRoutes";
import { AuthRoute } from "./providers/AuthRoutes";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Profile from "./component/Profile";
import Requests from "./component/Requests";
import Connections from "./component/Connections";
import Chat from "./component/Chat";

function Routes() {
  return (
    <AppRoutes>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </AppRoutes>
  );
}

export default Routes;
