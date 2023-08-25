import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SearchData } from "../pages/BoardsPage";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BoardStatus, { BoardType } from "../models/Board";

interface BoardSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSearch: (searchData: SearchData) => void;
  boardTypes: BoardType[];
}

function BoardSearchComponent({
  open,
  onClose,
  onSearch,
  boardTypes,
}: BoardSearchDialogProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    name: null,
    startDateFrom: null,
    endDateTo: null,
    boardStatus: null,
    boardTypeUuid: null,
  });

  const handleSearch = () => {
    onSearch(searchData);
  };

  const handleReset = () => {
    setSearchData({
      name: null,
      startDateFrom: null,
      endDateTo: null,
      boardStatus: null,
      boardTypeUuid: null,
    });
    onSearch({
      name: null,
      startDateFrom: null,
      endDateTo: null,
      boardStatus: null,
      boardTypeUuid: null,
    });
  };

  const handleClose = () => {
    setSearchData({
      name: null,
      startDateFrom: null,
      endDateTo: null,
      boardStatus: null,
      boardTypeUuid: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Search Boards</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={searchData.name || ""}
              onChange={(e) =>
                setSearchData({ ...searchData, name: e.target.value })
              }
              fullWidth
              sx={{ marginTop: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From:"
                value={
                  searchData.startDateFrom !== null
                    ? dayjs(searchData.startDateFrom)
                    : null
                }
                onChange={(date) =>
                  setSearchData({
                    ...searchData,
                    startDateFrom: date ? date.toISOString() : null,
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To:"
                value={
                  searchData.endDateTo !== null
                    ? dayjs(searchData.endDateTo)
                    : null
                }
                onChange={(date) =>
                  setSearchData({
                    ...searchData,
                    endDateTo: date ? date.toISOString() : null,
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="board-status-id">Board Status</InputLabel>
              <Select
                labelId="board-status-id"
                label="Board Status"
                value={searchData.boardStatus || ""}
                onChange={(e) =>
                  setSearchData({ ...searchData, boardStatus: e.target.value })
                }
              >
                <MenuItem value="">None</MenuItem>
                {Object.keys(BoardStatus).map((statusKey, index) => {
                  const statusValue = Object.values(BoardStatus)[index];
                  return (
                    <MenuItem key={statusKey} value={statusKey}>
                      {statusValue}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="board-types-id">Board Type</InputLabel>
              <Select
                labelId="board-types-id"
                label="Board Status"
                value={searchData.boardTypeUuid || ""}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    boardTypeUuid: e.target.value,
                  })
                }
              >
                <MenuItem value="">None</MenuItem>
                {boardTypes.map((type) => {
                  return (
                    <MenuItem key={type.uuid} value={type.uuid}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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

export default BoardSearchComponent;
