import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface SortDropdownProps {
  open: boolean;
  onClose: () => void;
  onSort: (field: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  anchorEl: HTMLElement | null;
}

function SortEmployeeComponent({
  open,
  onClose,
  onSort,
  sortBy,
  sortOrder,
  anchorEl,
}: SortDropdownProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <List>
        <ListItemButton onClick={() => onSort("firstName")}>
          <ListItemIcon>
            {sortBy === "firstName" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "firstName" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="First Name" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("lastName")}>
          <ListItemIcon>
            {sortBy === "lastName" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "lastName" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Last Name" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("academicTitle")}>
          <ListItemIcon>
            {sortBy === "academicTitle" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "academicTitle" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Academic Title" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("userProfile_email")}>
          <ListItemIcon>
            {sortBy === "userProfile_email" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "userProfile_email" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="E-Mail" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("userProfile_role_name")}>
          <ListItemIcon>
            {sortBy === "userProfile_role_name" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "userProfile_role_name" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Role" />
        </ListItemButton>
      </List>
    </Popover>
  );
}

export default SortEmployeeComponent;
