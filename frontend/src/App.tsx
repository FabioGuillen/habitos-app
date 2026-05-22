import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import Notes from "./pages/Notes";
import Stats from "./pages/Stats";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./layout/MainLayout";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { Toaster } from "react-hot-toast";
import Goals from "./pages/Goals";
function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,

          style: {
            background: "rgba(15,15,15,0.92)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "14px 16px",
            minWidth: "320px",
            boxShadow: "0 10px 35px rgba(0,0,0,.45)",
            fontSize: "14px",
            fontWeight: 500,
          },

          success: {
            iconTheme: {
              primary: "#BB86FC",
              secondary: "#000",
            },
          },

          error: {
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        {/* Públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Privadas */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
