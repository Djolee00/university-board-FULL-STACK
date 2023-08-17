import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
interface NavbarProps {
  onMenuToggle: () => void;
}

function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={onMenuToggle}
        >
          <SchoolIcon />
        </IconButton>
        <Typography variant="h6">University Board</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
