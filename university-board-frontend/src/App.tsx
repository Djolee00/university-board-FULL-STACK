import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyProfilePage from "./pages/MyProfilePage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myprofile"
        element={
          <ProtectedRoute>
            <MyProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
