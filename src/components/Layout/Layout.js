import React, { Suspense } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../routing/RoutingPaths";
import PageContent from "./PageContent";

const Layout = ({ children }) => {
  return (
    <div>
      <PageContent />
      <div>
        <SideNav />
      </div>
    </div>
  );
};

export default Layout;