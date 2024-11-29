import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Connections from "../components/Pages/Connections/Connections";
import Customer from "../components/Pages/Customer/Customer";
import Home from "../components/Pages/Home/Home";
import Masterdata from "../components/Pages/MasterData/Masterdata";
import Reports from "../components/Pages/Reports/Reports";
import User from "../components/Pages/User/User";
import Rootlayout from "../components/Pages/Rootlayout";
import Login from "../components/Pages/Login";
import ErrorPage from "../components/Pages/Error";
import { checkAuthLoader, tokenLoader } from "../API/authCrud";
import * as api from "../API/authCrud";
import ForgotPassword from "../components/Pages/ForgotPassword";
import Signup from "../components/Pages/Signup";
import ResetPassword from "../components/Pages/ResetPassword";
import UseFormContext from "../context/UseFormContext";

const AppRouter = () => {
  const formContext = UseFormContext();
  const navigate = useNavigate();
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const currentURL = window.location.href;

  useEffect(() => {
    const base = currentURL?.split("/");
    const refreshToken = localStorage.getItem("refreshtoken");
    if (refreshToken) {
      const refreshTokenObj = { refresh: refreshToken.replace(/['"]+/g, "") };
      api.tokenUpdate(refreshTokenObj)
        .then((res) => {
          console.log("res..tokenUpdate", res);
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.access));
            if (!base[3]) {
              navigate("/home");
            } else {
              navigate("/" + base[3]);
            }
          } else {
            throw new Error("Token update failed");
          }
        })
        .catch((err) => {
          console.log("Token update error:", err);
          localStorage.clear();
          navigate("/");
        });
    }
  }, []);

  useEffect(() => {
    // Admin URL
    // const base = currentURL.split(`${process.env.REACT_APP_API_URL_ADMIN}`);
    // Local URL
    const base = currentURL.split(`${process.env.REACT_APP_API_URL_LOCAL}`);
    const element = base[1]?.split("/");
    if (element[1] === "password-reset-confirm") {
      formContext.setLiveUrlPath1(element[2]);
      formContext.setLiveUrlPath2(element[3]);
      navigate("/password-reset-confirm");
    }
  }, [window.location.href]); // Dependency should be window.location.href

  const routes = [
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
      loader: tokenLoader,
    },
    {
      path: "/signup",
      element: <Signup />,
      // errorElement: <ErrorPage />,
      // loader: tokenLoader,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
      // errorElement: <ErrorPage />,
      // loader: tokenLoader,
    },
    {
      path: "/password-reset-confirm",
      element: <ResetPassword />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "",
      element: <Rootlayout />,
      id: "root",
      // loader: checkAuthLoader,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/customer", element: <Customer /> },
        // { path: "/connections", element: <Connections /> },
        // { path: "/reports", element: <Reports /> },
        { path: "/masterdata", element: <Masterdata /> },
        { path: "/user", element: <User /> },
        // { path: "*", element: <ErrorPage /> },
      ],
    },
    ...dynamicRoutes,
  ];

  return useRoutes(routes);
};

export default AppRouter;
