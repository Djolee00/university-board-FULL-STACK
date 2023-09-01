import React from "react";
import {
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { getStoredPrivileges } from "../utils/AuthUtils";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {getStoredPrivileges()?.includes("BOARD_R") ? (
          <ListItemButton component={Link} to="/boards">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Boards" />
          </ListItemButton>
        ) : null}

        {getStoredPrivileges()?.includes("ACCOUNT_R") ? (
          <ListItemButton component={Link} to="/employees">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
        ) : null}
        <ListItemButton component={Link} to="/myprofile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SideMenu;
