import { Button, Grid2 as Grid, useTheme, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import LoginForm from "./login/loginForm";
import SignupForm from "./signup/signupForm";

export default function AuthForm({ initialMode = "login", onSuccess }) {
  const theme = useTheme();
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <Grid
      container
      direction='column'
      sx={{
        flex: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "common.dark70" : "common.success50",
        p: "4rem 3rem",
        position: "relative",
        borderRadius: "inherit",
      }}
    >
      {/* mode Button */}
      <Grid item sx={{ width: "100%" }}>
        <Grid container sx={{ flex: 1 }}>
          <Grid item sx={{ flex: 1 }}>
            <Button
              fullWidth
              variant='contained'
              disableElevation
              size='small'
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
                borderRadius: 0,
                backgroundColor:
                  mode === "signup"
                    ? "secondary.main"
                    : theme.palette.mode === "dark"
                    ? "common.dark100"
                    : "common.success70",
                color: mode === "signup" ? "primary.main" : "secondary.main",
              }}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Button
              fullWidth
              size='small'
              variant='contained'
              disableElevation
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
                borderRadius: 0,
                backgroundColor:
                  mode === "login"
                    ? "secondary.main"
                    : theme.palette.mode === "dark"
                    ? "common.dark100"
                    : "common.success70",
                color: mode === "login" ? "primary.main" : "secondary.main",
              }}
              onClick={() => setMode("login")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        {mode === "login" ? (
          <LoginForm onSuccess={onSuccess} />
        ) : (
          <SignupForm onSuccess={onSuccess} />
        )}
      </Grid>
    </Grid>
  );
}
