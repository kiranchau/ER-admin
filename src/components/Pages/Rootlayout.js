import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import useAuth from '../CommonModules/hooks/useAuth';

const Rootlayout = (props) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    let isAuth = isAuthenticated()
    if (!isAuth) {
      navigate("/")
    }
  }, [])
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <Outlet />
    </>
  );
};

export default Rootlayout;
