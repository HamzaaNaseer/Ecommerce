import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loadUser } from "../../actions/userAction";
import store from "../../store";

import Loader from "../layout/Loader/Loader";

//Outlet means the inner component
const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    loading === false && (
      <Fragment>
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      </Fragment>
    )
  );
};

export default ProtectedRoute;
