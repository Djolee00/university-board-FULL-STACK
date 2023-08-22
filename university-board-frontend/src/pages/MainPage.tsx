import React, { useState } from "react";
import { Container } from "@mui/material";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";

function MainPage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div className="main-content">
        <Container>{/* Your main content goes here */}</Container>
      </div>
    </>
  );
}

export default MainPage;
