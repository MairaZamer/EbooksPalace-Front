import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const user = useSelector((state) => state.user);

  if (user.role === "Cliente" || user.role === "Administrador") {
    return <Outlet />;
  } else {
    
  }
};

export default PrivateRoute;
