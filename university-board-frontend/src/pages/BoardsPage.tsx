import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Button,
  Paper,
  Fab,
} from "@mui/material";
import axios from "axios";
import BoardStatus, { Board, BoardType } from "../models/Board";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import {
  getStoredPrivileges,
  getStoredToken,
  getStoredUUID,
} from "../utils/AuthUtils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "../styles/BoardsStyle.css";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";
import SearchIcon from "@mui/icons-material/Search";
import BoardSearchComponent from "../components/BoardSearchComponent";
import SortIcon from "@mui/icons-material/Sort";
import SortBoardComponent from "../components/SortBoardComponent";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BoardCreationDialog from "../components/BoardCreationDialog";
import { Employee } from "../models/Employee";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../utils/ConfigUtils";

export interface SearchData {
  name: string | null;
  startDateFrom: string | null;
  endDateTo: string | null;
  boardStatus: string | null;
  boardTypeUuid: string | null;
}

function BoardsPage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [boards, setBoards] = useState<Board[]>([]);
  const [displayMyBoards, setDisplayMyBoards] = useState(false);

  const [name, setName] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [boardStatus, setBoardStatus] = useState<string | null>(null);
  const [boardTypeUuid, setBoardTypeUuid] = useState<string | null>(null);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    useState<HTMLElement | null>(null);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const employeeUuid = getStoredUUID();
  const [boardTypes, setBoardTypes] = useState<BoardType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const pageSize = 9;

  useEffect(() => {
    const generateApiUrl = () => {
      let apiUrl = `${apiBaseUrl}/boards?page=${currentPage}&size=${pageSize}&sort=${sortBy},${sortOrder}`;

      if (displayMyBoards) {
        apiUrl += `&employeeUuid=${employeeUuid}`;
      }

      if (name) {
        apiUrl += `&nameLike=${name}`;
      }

      if (startDate) {
        apiUrl += `&startDateFrom=${startDate}`;
      }

      if (endDate) {
        apiUrl += `&endDateTo=${endDate}`;
      }

      if (boardStatus) {
        apiUrl += `&status=${boardStatus}`;
      }

      if (boardTypeUuid) {
        apiUrl += `&boardTypeUuid=${boardTypeUuid}`;
      }

      return apiUrl;
    };

    const fetchBoards = async () => {
      try {
        const apiUrl = generateApiUrl();
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        });
        setBoards(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching data from server");
        }
        setErrorPopupOpen(true);
      }
    };

    const fetchBoardTypes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/board-types`, {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        });
        setBoardTypes(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
        setErrorPopupOpen(true);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/employees`, {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        });
        setEmployees(response.data.content);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
        setErrorPopupOpen(true);
      }
    };

    fetchBoards();
    fetchBoardTypes();
    fetchEmployees();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    displayMyBoards,
    currentPage,
    pageSize,
    name,
    startDate,
    endDate,
    boardStatus,
    boardTypeUuid,
    employeeUuid,
    sortOrder,
    sortBy,
  ]);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  const handleOpenSearchDialog = () => {
    setShowSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setShowSearchDialog(false);
  };

  const handleSearch = (searchData: SearchData) => {
    if (searchData.startDateFrom) {
      searchData.startDateFrom = searchData.startDateFrom.split("T")[0];
    }
    if (searchData.endDateTo) {
      searchData.endDateTo = searchData.endDateTo.split("T")[0];
    }
    setName(searchData.name);
    setStartDate(searchData.startDateFrom);
    setEndDate(searchData.endDateTo);
    setBoardStatus(searchData.boardStatus);
    setBoardTypeUuid(searchData.boardTypeUuid);
    setCurrentPage(0);
    setShowSearchDialog(false);
  };

  const handleSortButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortPopoverAnchorEl(event.currentTarget);
  };

  const closeSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  function refreshSearchFilters() {
    setName(name === "" ? null : "");
    setStartDate(null);
    setEndDate(null);
    setBoardStatus(null);
    setBoardTypeUuid(null);
    setCurrentPage(0);
  }

  async function createBoard(board: Board): Promise<void> {
    try {
      await axios.post(`${apiBaseUrl}/boards`, board, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });
      setSuccessMessage("Board successfully saved");
      setSuccessPopupOpen(true);
      refreshSearchFilters();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Error fetching board types from server");
      }
      setErrorPopupOpen(true);
    }
  }

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div>
        <ToggleButtonGroup
          value={displayMyBoards}
          exclusive
          onChange={() => setDisplayMyBoards(!displayMyBoards)}
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
        >
          <ToggleButton value={false} style={{ marginTop: "20px" }}>
            All Boards
          </ToggleButton>
          <ToggleButton value={true} style={{ marginTop: "20px" }}>
            My Boards
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="boards-button-container">
          <div className="boards-buttons-left">
            <Button
              onClick={handleOpenSearchDialog}
              startIcon={<SearchIcon />}
              variant="contained"
            >
              Search
            </Button>
            <Button
              onClick={handleSortButtonClick}
              startIcon={<SortIcon />}
              variant="contained"
            >
              Sort
            </Button>
          </div>
          <div className="boards-buttons-right">
            <Fab
              size="medium"
              color="success"
              aria-label="add"
              variant="extended"
              onClick={() => setCreateDialogOpen(true)}
              disabled={!getStoredPrivileges()?.includes("BOARD_C")}
            >
              <NoteAddIcon sx={{ mr: 1 }} />
              New
            </Fab>
          </div>
        </div>
        <Paper
          variant="outlined"
          style={{ margin: "20px", minBlockSize: "550px" }}
        >
          {boards.length === 0 ? (
            <p className="center-text">No boards found</p>
          ) : (
            <Grid container spacing={2} padding={"20px"}>
              {boards.map((board) => (
                <Grid item xs={12} sm={6} md={4} key={board.uuid}>
                  <Link
                    to={`/boards/${board.uuid}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      style={{
                        backgroundColor: "#f9f9f9",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        maxHeight: "230px",
                        minHeight: "230px",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" fontWeight={"bold"}>
                          {board.name}
                        </Typography>
                        <Typography className="description">{`${board.description}`}</Typography>
                        <Typography marginTop={"20px"}>{`Members: ${
                          board.memberships!.length
                        }`}</Typography>
                        <Typography className="description">{`Status:  ${
                          Object.values(BoardStatus)[
                            Object.keys(BoardStatus).indexOf(
                              board.status as string
                            )
                          ]
                        }`}</Typography>
                        <Typography>{`Type: ${
                          board.boardType!.name
                        }`}</Typography>
                        <Typography>{`From: ${board.startDate} To: ${board.endDate}`}</Typography>
                        {board.memberships!.some(
                          (membership) =>
                            membership.employee?.uuid === employeeUuid
                        ) && (
                          <BookmarkAddedIcon
                            style={{ marginTop: "10px" }}
                            color="primary"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </div>
      <div className="pagination-container">
        <Button
          className="pagination-button"
          disabled={currentPage === 0}
          onClick={handlePreviousPage}
        >
          <NavigateBeforeIcon />
        </Button>
        <span>{`Page ${
          totalPages !== 0 ? currentPage + 1 : 0
        } of ${totalPages}`}</span>
        <Button
          className="pagination-button"
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
        >
          <NavigateNextIcon />
        </Button>
      </div>
      <ErrorPopup
        open={errorPopupOpen}
        message={errorMessage}
        onClose={closeErrorPopup}
      />
      <SuccessPopup
        open={successPopupOpen}
        message={successMessage}
        onClose={() => setSuccessPopupOpen(false)}
      />
      <BoardSearchComponent
        open={showSearchDialog}
        onClose={handleCloseSearchDialog}
        onSearch={handleSearch}
        boardTypes={boardTypes}
      />
      <SortBoardComponent
        anchorEl={sortPopoverAnchorEl}
        open={Boolean(sortPopoverAnchorEl)}
        onClose={closeSortPopover}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <BoardCreationDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        boardTypes={boardTypes}
        employees={employees}
        onCreate={createBoard}
      />
    </>
  );
}

export default BoardsPage;
