import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import ExploreFeaturedAndNewRelease from "../pages/ExploreFeaturedAndNewRelease";
import { getAccessTokenFromCookie } from "../utils/helpers";
import Browse from "../pages/Browse";
import CategoryPlaylists from "../pages/CategoryPlaylists";
import PlaylistDetails from "../pages/PlaylistDetails";
import ArtistDetails from "../pages/ArtistDetails";

const Router = () => {
  const isAuthenticated = () => {
    const accessToken = getAccessTokenFromCookie();
    return accessToken !== null; // If accessToken is not null, user is authenticated
  };

  let isLogin = isAuthenticated();

  // Update isLogin to false if there is no accessToken
  if (!getAccessTokenFromCookie()) {
    isLogin = false;
  }

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
            <Route
              path="/browse"
              element={
                <DashboardLayout>
                  <Browse />
                </DashboardLayout>
              }
            />
            <Route
              path="/browse/category/:categoryId"
              element={
                <DashboardLayout>
                  <CategoryPlaylists />
                </DashboardLayout>
              }
            />
            <Route
              path="/playlist-items/:playlistId"
              element={
                <DashboardLayout>
                  <PlaylistDetails />
                </DashboardLayout>
              }
            />
            <Route
              path="/artist/:artistId"
              element={
                <DashboardLayout>
                  <ArtistDetails />
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
