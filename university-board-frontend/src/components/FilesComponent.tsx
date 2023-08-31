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
import { getStoredToken } from "../utils/AuthUtils";

interface Props {
  boardFiles: BoardFile[];
  handleDownload: (file: BoardFile) => void;
  board: Board;
  onUpload: (file: BoardFile) => void;
}

const FilesComponent = ({
  boardFiles,
  handleDownload,
  board,
  onUpload,
}: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

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
      .post<BoardFile>(
        `http://localhost:8080/api/v1/${board!.uuid}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        onUpload(response.data);
      })
      .catch((error) => {
        console.log("GRESKA");
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.details);
        } else {
          setErrorMessage("Error occured while uploading file.");
        }
        setErrorPopupOpen(true);
      });
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
                    }}
                  >
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
            backgroundColor: isDragActive ? "#f0f8ff" : "#f9f9f9",
            flex: "1",
            maxHeight: "463px",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                textAlign: "left",
                color: "gray",
              }}
            >
              Drag and Drop
            </p>
            <p style={{ textAlign: "left", color: "gray", marginTop: "3px" }}>
              Or
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
                style={{ marginTop: "20px" }}
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
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
                      color="secondary"
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
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Paper>
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
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default FilesComponent;
