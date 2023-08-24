import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { SearchData } from "../pages/EmployeesPage";
import SearchIcon from "@mui/icons-material/Search";
import { AcademicTitle } from "../models/AcademicTitleEnum";

interface EmployeeSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSearch: (searchData: SearchData) => void;
}

function EmployeeSearchDialog({
  open,
  onClose,
  onSearch,
}: EmployeeSearchDialogProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    academicTitle: null,
  });

  const handleSearch = () => {
    onSearch(searchData);
  };

  const handleReset = () => {
    setSearchData({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      academicTitle: null,
    });
    onSearch({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      academicTitle: null,
    });
  };

  const handleClose = () => {
    setSearchData({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      academicTitle: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Search Employees</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={searchData.firstName || ""}
          onChange={(e) =>
            setSearchData({ ...searchData, firstName: e.target.value })
          }
          fullWidth
          sx={{ marginBottom: 2, marginTop: 2 }}
        />
        <TextField
          label="Last Name"
          value={searchData.lastName || ""}
          onChange={(e) =>
            setSearchData({ ...searchData, lastName: e.target.value })
          }
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone Number"
          type="number"
          value={searchData.phoneNumber || ""}
          onChange={(e) =>
            setSearchData({ ...searchData, phoneNumber: e.target.value })
          }
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="academici-title-id">Academic Title</InputLabel>
          <Select
            labelId="academic-title-id"
            label="Academic Title"
            value={searchData.academicTitle || ""}
            onChange={(e) =>
              setSearchData({ ...searchData, academicTitle: e.target.value })
            }
          >
            <MenuItem value="">None</MenuItem>
            {Object.keys(AcademicTitle).map((titleKey, index) => {
              const titleValue = Object.values(AcademicTitle)[index];
              return (
                <MenuItem key={titleKey} value={titleKey}>
                  {titleValue}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeSearchDialog;
