import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {  Navigate, Outlet } from "react-router-dom";

import Loader from "../layout/Loader/Loader";

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log("value of loading is ", loading);
  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </Fragment>
  );
};

export default ProtectedRoute;
