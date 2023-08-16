import React from "react";
import { Snackbar } from "@mui/material";

interface ErrorPopupProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

function ErrorPopup({ open, message, onClose }: ErrorPopupProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ContentProps={{
        style: { backgroundColor: "#ff6b6b" },
      }}
    />
  );
}

export function renderErrorPopup(
  open: boolean,
  message: string,
  onClose: () => void,
  loading: boolean
) {
  return <ErrorPopup open={open} message={message} onClose={onClose} />;
}

export default ErrorPopup;
