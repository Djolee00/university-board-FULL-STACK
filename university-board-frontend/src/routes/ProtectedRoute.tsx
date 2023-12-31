import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearStorage,
  getStoredPrivileges,
  getStoredToken,
} from "../utils/AuthUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const checkUserToken = () => {
    const userToken = getStoredToken();
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      clearStorage();
      return navigate("/login");
    }

    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();

    if (
      (location.pathname === "/boards" || location.pathname === "/boards/") &&
      !getStoredPrivileges()?.includes("BOARD_R")
    ) {
      navigate("/myprofile"); // Redirect to UserProfilePage
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
