import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ConsultingListPage from "./pages/ConsultingListPage";
import ConsultingFormPage from "./pages/ConsultingFormPage";
import ConsultingDetailPage from "./pages/ConsultingDetailPage";
import OptionManagePage from "./pages/OptionManagePage";
import ExcelUploadPage from "./pages/ExcelUploadPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/consultings"
        element={
          <ProtectedRoute>
            <ConsultingListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultings/new"
        element={
          <ProtectedRoute>
            <ConsultingFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultings/:id"
        element={
          <ProtectedRoute>
            <ConsultingDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/options"
        element={
          <ProtectedRoute>
            <OptionManagePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/excel"
        element={
          <ProtectedRoute>
            <ExcelUploadPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
