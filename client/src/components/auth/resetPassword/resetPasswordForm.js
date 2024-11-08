import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Grid2 as Grid,
  Link,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  TextField,
  inputClasses,
} from "@mui/material";

import OtpInput from "react-otp-input";

import axios from "@/utils/axios";
import { GlobalContext } from "@/context/GlobalContext";
export default function ResetPasswordForm({ onClose }) {
  const theme = useTheme();

  const router = useRouter();
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }
  const [code, setCode] = useState("");
  const [step1Done, setStep1Done] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [user, setUser] = useState({
    password: {
      value: "",
      error: false,
      errorMessage: "",
    },
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    if (user.password.value === "") {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: t("emptyPassword"),
        },
      });
      return;
    }
    if (user.confirmPassword.value === "") {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: t("emptyPassword"),
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setError({
        status: true,
        message: t("passwordMatch"),
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post(`/users/resetPassword/${code}`, {
        password: user.password.value,
      });

      if (result.data.success) {
        onClose();
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  const inputSx = {
    [`& .${inputClasses.formControl}`]: {
      backgroundColor: "secondary.main",
      color: "common.dark100",
    },
    [`& fieldset`]: {
      border: "none",
    },
    [`& .${inputClasses.formControl}.${inputClasses.focused} fieldset`]: {
      border: "1px solid",
      borderColor: "common.dark100",
    },
    [`& .${inputClasses.formControl}.${inputClasses.error} fieldset`]: {
      border: "1px solid",
      borderColor: "error.main",
    },
    [`& .MuiFormHelperText-root`]: {
      mx: 0,
      fontSize: "11px",
    },
  };
  return (
    <Grid container direction='column'>
      {/* heading */}
      <Grid item sx={{ width: "100%" }}>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontSize: "32px",
            textAlign: "center",
            fontWeight: 700,
            color: "secondary.main",
          }}
        >
          Reset Password
        </Typography>
      </Grid>
      {/* description */}
      <Grid item sx={{ width: "100%", mt: "10px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            px: "30px",
            color: "secondary.main",
            lineHeight: "20px",
            fontWeight: 400,
            whiteSpace: "break-spaces",
          }}
        >
          {step1Done
            ? "Enter a new Password to Reset your password"
            : "We emailed you code to your email. Enter the code below to reset your password"}
        </Typography>
      </Grid>
      {!step1Done ? (
        <Grid
          item
          sx={{
            width: "100%",
            my: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <OtpInput
            value={code}
            onChange={setCode}
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "65px",
                  height: "65px",
                  margin: "0px 10px",
                  fontSize: "30px",
                  borderRadius: "19px",
                  textAlign: "center",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.common.dark100,
                }}
              />
            )}
          />
        </Grid>
      ) : (
        <>
          {/* password */}
          <Grid
            item
            sx={{
              width: "100%",
              mt: "16px",
            }}
          >
            <TextField
              fullWidth
              type='password'
              size='small'
              placeholder={"Enter new Password"}
              value={user.password.value}
              sx={inputSx}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              error={user.password.error}
              helperText={user.password.errorMessage}
            />
          </Grid>
          {/* confirm password */}
          <Grid
            item
            sx={{
              width: "100%",
              mt: "16px",
            }}
          >
            <TextField
              fullWidth
              type='password'
              size='small'
              placeholder={"Confirm Password"}
              sx={inputSx}
              value={user.confirmPassword.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              error={user.confirmPassword.error}
              helperText={user.confirmPassword.errorMessage}
            />
          </Grid>
        </>
      )}
      {error.status && (
        <Grid item sx={{ marginTop: "1em", width: "100%" }}>
          <Alert severity='warning'>{error.message}</Alert>
        </Grid>
      )}

      {/* submit */}
      <Grid
        item
        display='flex'
        justifyContent='center'
        sx={{ width: "100%", mt: "16px" }}
      >
        <Button
          fullWidth
          variant='contained'
          size='small'
          disableElevation
          sx={{
            color: "secondary.main",
            fontSize: "16px",
            textTransform: "none",
            p: "10px",
            borderRadius: "5px",
            fontWeight: 700,
            background:
              theme.palette.mode === "dark"
                ? theme.palette.common.dark100
                : "linear-gradient(to right, #63BA1B, #73E933)",
            transition: "background 0.3s ease",
            "&:hover": {
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.common.dark100
                  : "linear-gradient(to right, #59A718, #65D02C)",
            },
          }}
          startIcon={
            loading && (
              <CircularProgress
                size='1rem'
                sx={{
                  color: "secondary.main",
                }}
              />
            )
          }
          disabled={loading}
          onClick={
            step1Done
              ? SubmitHandler
              : () => {
                  if (code.length === 4) {
                    setError({
                      status: false,
                      message: "",
                    });
                    setStep1Done(true);
                  } else {
                    setError({
                      status: true,
                      message: "Invalid Code",
                    });
                  }
                }
          }
        >
          Submit
        </Button>
      </Grid>

      {/* Back */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            color: "secondary.main",
            fontWeight: 400,
            cursor: "pointer",
          }}
          onClick={step1Done ? () => setStep1Done(false) : onClose}
        >
          {step1Done ? "Back" : "Back to Login"}
        </Typography>
      </Grid>
    </Grid>
  );
}
