import { useMemo } from "react";
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
import AlbumDetails from "../pages/AlbumDetails";

const Router = () => {
  const accessToken = getAccessTokenFromCookie();

  const isLogin = useMemo(() => {
    return !!accessToken;
  }, [accessToken]);

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
            <Route
              path="/album/:albumId"
              element={
                <DashboardLayout>
                  <AlbumDetails />
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
