import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  TextField,
  Button,
  Grid2 as Grid,
  Link,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  Paper,
  inputClasses,
} from "@mui/material";

import ForgetPasswordForm from "../forgetPassword/forgetPasswordForm";
// import GoogleLoginButton from "@/reusable/GoogleLoginButton";
import FacebookLoginButton from "@/reusable/FacebookLoginButton";
import { GlobalContext } from "@/context/GlobalContext";
import axios from "@/utils/axios";
import { jwtKey } from "@/data/websiteInfo";

export default function Login({ onSuccess }) {
  const theme = useTheme();
  const router = useRouter();
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }

  const [showForgetPassword, setShowForgetPassword] = useState(false);
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
    password: {
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

    if (user.password.value === "") {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: "Password cannot be empty",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post("/users/login", {
        email: user.email.value,
        password: user.password.value,
      });

      if (result.data.success) {
        await localStorage.setItem(jwtKey, result.data.token);
        setAuth({ ...result.data.data.user, token: result.data.token });
        if (onSuccess) onSuccess();
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
  if (showForgetPassword)
    return <ForgetPasswordForm onClose={() => setShowForgetPassword(false)} />;
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
          Login
        </Typography>
      </Grid>
      {/* google login */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        {/* <GoogleLoginButton  onSuccess={onSuccess ? onSuccess : () => {}} /> */}
      </Grid>
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <FacebookLoginButton onSuccess={onSuccess ? onSuccess : () => {}} />
      </Grid>
      {/* or */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            color: "secondary.main",
            fontWeight: 400,
          }}
        >
          OR
        </Typography>
      </Grid>
      {/* email */}
      <Grid
        item
        sx={{
          width: "100%",
          mt: "16px",
        }}
      >
        <TextField
          fullWidth
          type='email'
          size='small'
          placeholder={"Username or Email Address"}
          sx={inputSx}
          value={user.email.value}
          onChange={(e) =>
            setUser({
              ...user,
              email: {
                value: e.target.value,
                error: false,
                errorMessage: "",
              },
            })
          }
          error={user.email.error}
          helperText={user.email.errorMessage}
        />
      </Grid>
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
          size='small'
          type='password'
          placeholder={"Password"}
          sx={inputSx}
          value={user.password.value}
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
      {error.status && (
        <Grid item sx={{ mt: "16px", width: "100%" }}>
          <Alert severity='warning'>{error.message}</Alert>
        </Grid>
      )}
      {/* Forget passowrd */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            color: "secondary.main",
            fontWeight: 400,
            cursor: "pointer",
          }}
          onClick={() => setShowForgetPassword(true)}
        >
          Forget Password?
        </Typography>
      </Grid>
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
                ? "common.dark100"
                : "linear-gradient(to right, #63BA1B, #73E933)",
            transition: "background 0.3s ease",
            "&:hover": {
              background:
                theme.palette.mode === "dark"
                  ? "common.dark100"
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
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
