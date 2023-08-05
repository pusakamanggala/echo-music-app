import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import AuthContext from "../context/AuthProvider";
import ExploreFeaturedAndNewRelease from "../pages/ExploreFeaturedAndNewRelease";

const Router = () => {
  const { setAccessToken } = useContext(AuthContext);

  const isAuthenticated = () => {
    // Get all cookies as a string
    const cookies = document.cookie;

    // Split the cookies string into individual cookie key-value pairs
    const cookieArray = cookies.split(";");

    // Iterate over the cookieArray to check if the "access_token" cookie exists
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();

      // Check if the cookie name matches "access_token"
      if (cookie.startsWith("access_token=")) {
        return true; // "access_token" cookie found, user is authenticated
      }
    }

    return false; // "access_token" cookie not found, user is not authenticated
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
