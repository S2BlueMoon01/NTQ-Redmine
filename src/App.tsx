import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "~/libs/constants/router/routes";
import { Fragment } from "react";
import DefaultLayoutPrivate from "~/pages/default/DefaultLayoutPrivate";
import DefaultLayoutPublic from "~/pages/default/DefaultLayoutPublic";

const App = () => {
  return (
    <div className="scroll-smooth">
      <Router>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = null;

            if (route.privateLayout) {
              Layout = DefaultLayoutPrivate;
            } else {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  // <AuthProtect>
                  <Layout>
                    <Page />
                  </Layout>
                  // </AuthProtect>
                }
              />
            );
          })}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = null;

            if (route.publicLayout) {
              Layout = DefaultLayoutPublic;
            } else {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
