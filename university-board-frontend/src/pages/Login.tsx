import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";

import "../styles/LoginStyles.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { storeToken, scheduleLogout } from "../utils/AuthUtils";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      const { token, expirationTime } = response.data;

      storeToken(token);
      scheduleLogout(expirationTime, handleLogout);
      setSuccessPopupOpen(true);

      setTimeout(() => {
        navigate("/boards");
      }, 1500);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.status === 401
      ) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setErrorPopupOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false); // Close the error popup
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="login-paper">
        <Typography component="h1" variant="h4" className="login-title">
          University Board
        </Typography>
        <Typography component="h2" variant="h6" className="login-subtitle">
          Welcome
        </Typography>
        <form className="login-form" onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <div className="login-submit-container">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit"
            >
              Login
            </Button>
          </div>
        </form>
        <ErrorPopup
          open={errorPopupOpen}
          message={errorMessage}
          onClose={closeErrorPopup}
        />
        <SuccessPopup
          open={successPopupOpen}
          message="Login successful!"
          onClose={() => setSuccessPopupOpen(false)}
        />
      </div>
    </Container>
  );
}

export default Login;
