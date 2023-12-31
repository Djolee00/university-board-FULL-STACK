import React, { useState } from "react";
import {
  Grid,
  Paper,
  Link,
  Button,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Board, BoardFile } from "../models/Board";

import pdfIcon from "../icons/pdf.png";
import excelIcon from "../icons/excel.png";
import pptxIcon from "../icons/pptx.png";
import rarIcon from "../icons/rar.png";
import wordIcon from "../icons/word.png";
import unknownIcon from "../icons/unknown.png";
import imageIcon from "../icons/image.png";
import textIcon from "../icons/text.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";
import axios from "axios";
import {
  getStoredPrivileges,
  getStoredToken,
  getStoredUUID,
} from "../utils/AuthUtils";
import "../styles/FileComponentStyle.css";
import { apiBaseUrl } from "../utils/ConfigUtils";

interface Props {
  boardFiles: BoardFile[];
  handleDownload: (file: BoardFile) => void;
  board: Board;
  onUpload: (file: BoardFile) => void;
  onDelete: (file: BoardFile) => void;
}

const FilesComponent = ({
  boardFiles,
  handleDownload,
  board,
  onUpload,
  onDelete,
}: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);

  const [deleteFile, setDeleteFile] = useState<BoardFile | null>(null);

  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteFile(null);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    onDelete(deleteFile!);
    setDeleteFile(null);
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  const getFileExtension = (filename: string) => {
    const parts = filename.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return "";
  };

  const getFileIcon = (extension: string) => {
    switch (extension.toLowerCase()) {
      case "pdf":
        return (
          <img
            src={pdfIcon}
            alt="PDF Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "docx":
        return (
          <img
            src={wordIcon}
            alt="DOCX Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "pptx":
        return (
          <img
            src={pptxIcon}
            alt="PPTX Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "zip":
      case "rar":
        return (
          <img
            src={rarIcon}
            alt="RAR Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "xlsx":
        return (
          <img
            src={excelIcon}
            alt="Excel Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "csv":
      case "png":
      case "jpg":
      case "jpeg":
        return (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={imageIcon}
            alt="Image Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "txt":
        return (
          <img
            src={textIcon}
            alt="Txt Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
      default:
        return (
          <img
            src={unknownIcon}
            alt="Unknown Icon"
            style={{ width: "24px", height: "24px" }}
          />
        );
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);

    const droppedFiles = event.dataTransfer.files;
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(droppedFiles),
    ]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleCancelFile = (file: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile !== file)
    );
  };

  async function handleSave() {
    setLoading(true);
    let numOfSuccessfullyUploads = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      // eslint-disable-next-line no-loop-func
      await saveFile(selectedFiles[i]).then(() => {
        numOfSuccessfullyUploads++;
      });
    }
    setLoading(false);
    setSuccessMessage(
      `Board files successfully uploaded: ${numOfSuccessfullyUploads} / ${selectedFiles.length}`
    );
    setSuccessPopupOpen(true);
    setSelectedFiles([]);
  }

  async function saveFile(file: File) {
    let formData = new FormData();

    formData.append("file", file);

    await axios
      .post<BoardFile>(`${apiBaseUrl}/${board!.uuid}/files`, formData, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onUpload(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.details);
        } else {
          setErrorMessage("Error occured while uploading file.");
        }
        setErrorPopupOpen(true);
      });
  }

  function handleDeleteFile(boardFile: BoardFile) {
    setDeleteFile(boardFile);
    setOpenDialog(true);
  }

  return (
    <>
      <h3
        style={{
          marginLeft: "40px",
          paddingTop: "10px",
          marginBottom: "2px",
        }}
      >
        Files
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Paper
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            margin: "25px",
            backgroundColor: "#f9f9f9",
            flex: "1",
            minHeight: "463px",
            maxHeight: "463px",

            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {boardFiles.length !== 0 ? (
            <Grid container spacing={2}>
              {boardFiles.map((boardFile) => (
                <Grid item key={boardFile.uuid!} xs={6}>
                  <Paper
                    style={{
                      padding: "20px",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#EAF1FC",
                      minHeight: "100px",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                      color="error"
                      onClick={() => handleDeleteFile(boardFile)}
                      disabled={
                        !getStoredPrivileges()?.includes("FILE_D") ||
                        board.memberships?.filter(
                          (m) => m.employee?.uuid === getStoredUUID()
                        ).length === 0
                      }
                    >
                      <CancelIcon />
                    </IconButton>
                    <div
                      style={{
                        margin: "15px",
                        width: "36px",
                        height: "36px",
                      }}
                    >
                      {getFileIcon(getFileExtension(boardFile.originalName!))}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <Link
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleDownload(boardFile!);
                        }}
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {boardFile.originalName}
                      </Link>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        Type: {boardFile.type}
                      </p>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No board files. Feel free to add one!</p>
          )}
        </Paper>
        <Paper
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            margin: "25px",
            backgroundColor: "#f9f9f9",
            flex: "1",
            maxHeight: "463px",
            overflow: "auto",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#f7f7f7",
                padding: "20px",
                border: "2px dashed #ccc",
                borderRadius: "10px",
                minWidth: "500px",
                backgroundColor: isDragActive ? "#f0f8ff" : "#f9f9f9",
              }}
            >
              <h2
                style={{ fontSize: "24px", textAlign: "center", color: "#555" }}
              >
                Drag and drop files
              </h2>
              <p
                style={{ fontSize: "18px", textAlign: "center", color: "#777" }}
              >
                Here
              </p>
              <Box
                className="drag-drop-box"
                style={{
                  backgroundColor: isDragActive ? "#f0f8ff" : "#f9f9f9",
                }}
              >
                🚀
              </Box>
            </div>
            <p
              style={{
                fontSize: "16px",
                textAlign: "center",
                color: "#aaa",
                marginTop: "20px",
              }}
            >
              ...or choose this option
            </p>
            <label htmlFor="file-upload">
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
                multiple
              />
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                disabled={
                  !getStoredPrivileges()?.includes("FILE_UP") ||
                  board.memberships?.filter(
                    (m) => m.employee?.uuid === getStoredUUID()
                  ).length === 0
                }
              >
                Upload
              </Button>
            </label>
            {selectedFiles.length > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Selected Files:</Typography>
                {selectedFiles.map((file, index) => (
                  <Box
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <Typography>{file.name}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleCancelFile(file)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={handleSave}
                  disabled={
                    !getStoredPrivileges()?.includes("FILE_UP") ||
                    board.memberships?.filter(
                      (m) => m.employee?.uuid === getStoredUUID()
                    ).length === 0
                  }
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Paper>
      </div>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="outlined"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default FilesComponent;
