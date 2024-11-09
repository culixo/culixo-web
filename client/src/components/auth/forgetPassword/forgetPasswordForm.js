import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
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

import ResetPasswordForm from "../resetPassword/resetPasswordForm";
import { GlobalContext } from "@/context/GlobalContext";
import axios from "@/utils/axios";
export default function ForgetPasswordPage({ onClose }) {
  const theme = useTheme();

  const router = useRouter();
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/setting");
    //return <Loading />;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [user, setUser] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });
  const [foretPasswordSuccess, setForgetPasswordSuccess] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    setForgetPasswordSuccess(false);
    if (user.email.value === "") {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: "Email cannot be empty",
        },
      });
      return;
    }
    if (
      !/(?:[a-z0-9!#$%&'*/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        user.email.value
      )
    ) {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: "Invalid Email",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/users/forgetpassword", {
        email: user.email.value,
      });

      if (result.data.success) {
        setForgetPasswordSuccess(true);
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

  if (foretPasswordSuccess) return <ResetPasswordForm onClose={onClose} />;
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
          Forget Password
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
          Enter your email address and we will send you instructions to reset
          your password.
        </Typography>
      </Grid>
      {/* email */}
      <Grid
        item
        sx={{
          width: "100%",
          mt: { sm: "30px", xs: "25px" },
        }}
      >
        <TextField
          fullWidth
          type='email'
          size='small'
          placeholder={"Email Address"}
          sx={inputSx}
          value={user.email.value}
          onChange={(e) => {
            setUser({
              ...user,
              email: {
                value: e.target.value,
                error: false,
                errorMessage: "",
              },
            });
            setForgetPasswordSuccess(false);
          }}
          error={user.email.error}
          helperText={user.email.errorMessage}
        />
      </Grid>

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
          onClick={SubmitHandler}
        >
          Submit
        </Button>
      </Grid>

      {/* back to login */}
      <Grid item sx={{ width: "100%", mt: "30px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            color: "secondary.main",

            fontWeight: 400,
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Back to login
        </Typography>
      </Grid>
    </Grid>
  );
}
