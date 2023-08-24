import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { clearStorage } from "../utils/AuthUtils";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavbarProps {
  onMenuToggle: () => void;
}

function Navbar({ onMenuToggle }: NavbarProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    clearStorage();
    navigate("/login");
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={onMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            University Board
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            variant="outlined"
            style={{ margin: "20px" }}
          >
            <LogoutIcon />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogoutCancel}
            color="primary"
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            color="error"
            autoFocus
            variant="outlined"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
