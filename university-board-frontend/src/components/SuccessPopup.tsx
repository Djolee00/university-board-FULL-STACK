import React from "react";
import { Snackbar } from "@mui/material";

interface SuccessPopupProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

function SuccessPopup({ open, message, onClose }: SuccessPopupProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ContentProps={{
        style: { backgroundColor: "#34c240" },
      }}
    />
  );
}

export function renderSuccessPopup(
  open: boolean,
  message: string,
  onClose: () => void
) {
  return <SuccessPopup open={open} message={message} onClose={onClose} />;
}

export default SuccessPopup;
