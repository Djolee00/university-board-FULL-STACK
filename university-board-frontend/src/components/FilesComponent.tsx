import React from "react";
import { Grid, Paper, Link } from "@mui/material";
import { BoardFile } from "../models/Board";

import pdfIcon from "../icons/pdf.png";
import excelIcon from "../icons/excel.png";
import pptxIcon from "../icons/pptx.png";
import rarIcon from "../icons/rar.png";
import wordIcon from "../icons/word.png";
import unknownIcon from "../icons/unknown.png";
import imageIcon from "../icons/image.png";
import textIcon from "../icons/text.png";

interface Props {
  boardFiles: BoardFile[];
  handleDownload: (file: BoardFile) => void;
}

const FilesComponent = ({ boardFiles, handleDownload }: Props) => {
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
            backgroundColor: "#f9f9f9",
            flex: "1",
            maxHeight: "463px",
          }}
        ></Paper>
      </div>
    </>
  );
};

export default FilesComponent;
