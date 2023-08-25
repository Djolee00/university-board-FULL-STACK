import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyProfilePage from "./pages/MyProfilePage";
import EmployeesPage from "./pages/EmployeesPage";
import BoardsPage from "./pages/BoardsPage";
import { useEffect } from "react";
import { clearStorage, getStoredToken } from "./utils/AuthUtils";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;

    const checkExpiration = () => {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        // Token has expired, perform logout
        clearStorage(); // Clear the stored token
        navigate("/login"); // Navigate to the login page
      } else {
        setTimeout(checkExpiration, 1000);
      }
    };
    checkExpiration();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <BoardsPage />
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
