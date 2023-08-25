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

function SortBoardComponent({
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
        <ListItemButton onClick={() => onSort("name")}>
          <ListItemIcon>
            {sortBy === "name" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "name" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Name" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("startDate")}>
          <ListItemIcon>
            {sortBy === "startDate" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "startDate" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Start date" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("endDate")}>
          <ListItemIcon>
            {sortBy === "endDate" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "endDate" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="End date" />
        </ListItemButton>
        <ListItemButton onClick={() => onSort("status")}>
          <ListItemIcon>
            {sortBy === "status" && sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : sortBy === "status" && sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <></>
            )}
          </ListItemIcon>
          <ListItemText primary="Status" />
        </ListItemButton>
      </List>
    </Popover>
  );
}

export default SortBoardComponent;
