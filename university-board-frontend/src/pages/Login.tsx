import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";

import "../styles/LoginStyles.css";

function Login() {
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
        <form className="login-form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
      </div>
    </Container>
  );
}

export default Login;
