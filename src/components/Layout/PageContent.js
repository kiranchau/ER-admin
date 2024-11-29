import React, { Suspense } from "react";
import Header from "./Header";
import { routesData } from "../../routing/RoutingPaths";
import { Route, Routes } from "react-router-dom";

const PageContent = () => {
  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200"
      //   ref={mainContentRef}
      >
        <Suspense >
          <Routes>
            {routesData.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component/>}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            {/* <Route path="*" element={<Page404 />} /> */}
          </Routes>
        </Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
};

export default PageContent;
