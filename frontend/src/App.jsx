import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AssetVault from "./pages/AssetVault";
import Nominees from "./pages/Nominees";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DeadManSwitch from "./pages/DeadManSwitch";
import SecurityLog from "./pages/SecurityLog";

import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/assets" element={<AssetVault />} />

          <Route path="/nominees" element={<Nominees />} />

          <Route path="/dead-man-switch" element={<DeadManSwitch />} />

          <Route path="/security-log" element={<SecurityLog />} />

          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
