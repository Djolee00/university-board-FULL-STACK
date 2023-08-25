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
} from "@mui/material";
import axios from "axios";
import { Board } from "../models/Board";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import { getStoredToken, getStoredUUID } from "../utils/AuthUtils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import "../styles/BoardsStyle.css";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";

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

  const employeeUuid = getStoredUUID();
  const pageSize = 9;

  useEffect(() => {
    const generateApiUrl = () => {
      let apiUrl = `http://localhost:8080/api/v1/boards?page=${currentPage}&size=${pageSize}`;

      if (displayMyBoards) {
        apiUrl += `&employeeUuid=${employeeUuid}`;
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

    fetchBoards();
  }, [displayMyBoards, currentPage, pageSize]);

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
        <Paper
          variant="outlined"
          style={{ margin: "20px", minBlockSize: "550px" }}
        >
          <Grid container spacing={2} padding={"20px"}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={4} key={board.uuid}>
                <Card
                  style={{
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    maxHeight: "230px",
                    minHeight: "230px",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={"bold"}>
                      {board.name}
                    </Typography>
                    <Typography className="description">{`${board.description}`}</Typography>
                    <Typography
                      marginTop={"20px"}
                    >{`Members: ${board.memberships.length}`}</Typography>
                    <Typography>{`Type: ${board.boardType.name}`}</Typography>
                    <Typography>{`From: ${board.startDate} To: ${board.endDate}`}</Typography>
                    {board.memberships.some(
                      (membership) => membership.employee.uuid === employeeUuid
                    ) && (
                      <CardMembershipIcon
                        style={{ marginTop: "25px" }}
                        color="primary"
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
    </>
  );
}

export default BoardsPage;
