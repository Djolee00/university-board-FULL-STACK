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

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Boards" />
        </ListItemButton>
        <ListItemButton component={Link} to="/employees">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
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
