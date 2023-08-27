import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import axios from "axios";
import { Board } from "../models/Board";
import ErrorPopup from "../components/ErrorPopup";
import { getStoredToken } from "../utils/AuthUtils";

function BoardDetailsPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const [board, setBoard] = useState<Board | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Board>(`http://localhost:8080/api/v1/boards/${uuid}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => setBoard(response.data))
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
      });
  }, [uuid]);

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  return (
    <>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h4">{board?.name}</Typography>
        <Typography>{`Description: ${board?.description}`}</Typography>
        <Typography>{`Start Date: ${board?.startDate}`}</Typography>
        <Typography>{`End Date: ${board?.endDate}`}</Typography>
        <Typography>{`Board Status: ${board?.status}`}</Typography>
        <Typography>{`Board Type: ${board?.boardType!.name}`}</Typography>
        {/* Add more sections for members, comments, and files */}
      </Paper>
      <ErrorPopup
        open={errorPopupOpen}
        message={errorMessage}
        onClose={closeErrorPopup}
      />
    </>
  );
}

export default BoardDetailsPage;
