import React, { useState } from "react";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";

function MainPage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div>
      <CssBaseline />
      <div className="main-content">
        <Navbar onMenuToggle={toggleSideMenu} />
        <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
        <Container>{/* Your main content goes here */}</Container>
      </div>
    </div>
  );
}

export default MainPage;
