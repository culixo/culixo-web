import { Dialog, IconButton } from "@mui/material";
import React from "react";
import AuthForm from "./authForm";
import { Clear as ClearIcon } from "@mui/icons-material";

export default function AuthDialog({ open, onClose, initialMode }) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          boxSizing: "border-box",
          maxWidth: "400px",
          borderRadius: "10px",
          position: "relative",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        disableRipple
        sx={{
          position: "absolute",
          right: "1px",
          top: "0px",
          zIndex: 1,
        }}
      >
        <ClearIcon
          sx={{ fontSize: "1.5rem", fontWeight: 700, color: "secondary.main" }}
        />
      </IconButton>
      <AuthForm
        onSuccess={onClose}
        onClose={onClose}
        initialMode={initialMode}
      />
    </Dialog>
  );
}
