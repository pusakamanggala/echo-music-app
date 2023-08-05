import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import ExploreFeaturedAndNewRelease from "../pages/ExploreFeaturedAndNewRelease";
import { getAccessTokenFromCookie } from "../utils/helpers";

const Router = () => {
  const isAuthenticated = () => {
    const accessToken = getAccessTokenFromCookie();
    return accessToken !== null; // If accessToken is not null, user is authenticated
  };

  const isLogin = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isLogin ? <LoginPage /> : <Navigate to="/home" />}
        />
        {/* Protected route */}
        {isLogin && (
          <>
            <Route
              path="/home"
              element={
                <DashboardLayout>
                  <HomePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/explore/:type"
              element={
                <DashboardLayout>
                  <ExploreFeaturedAndNewRelease />
                </DashboardLayout>
              }
            />
          </>
        )}
        <Route
          path="*"
          element={isLogin ? <PageNotFound /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
