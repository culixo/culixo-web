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

import { GlobalContext } from "@/context/GlobalContext";
import FacebookLoginButton from "@/reusable/FacebookLoginButton";
import GoogleLoginButton from "@/reusable/GoogleLoginButton";
export default function SignupForm1({
  loading,
  error,
  errorMessage,
  onSuccess,
  onSubmit,
}) {
  const theme = useTheme();
  const router = useRouter();
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }

  const [user, setUser] = useState({
    firstName: {
      value: "",
      error: false,
      errorMessage: "",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "",
    },
    userName: {
      value: "",
      error: false,
      errorMessage: "",
    },
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
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (user.firstName.value === "") {
      setUser({
        ...user,
        firstName: {
          value: user.firstName.value,
          error: true,
          errorMessage: "First name cannot be empty",
        },
      });
      return;
    }
    if (user.lastName.value === "") {
      setUser({
        ...user,
        lastName: {
          value: user.lastName.value,
          error: true,
          errorMessage: "Last name cannot be empty",
        },
      });
      return;
    }
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
    if (user.userName.value === "") {
      setUser({
        ...user,
        userName: {
          value: user.userName.value,
          error: true,
          errorMessage: "Username cannot be empty",
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
    if (user.password.value !== user.confirmPassword.value) {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: "Password and Confirm Password does not match",
        },
      });
      return;
    }
    onSubmit({
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      userName: user.userName.value,
      email: user.email.value,
      password: user.password.value,
    });
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
          Sign Up
        </Typography>
      </Grid>
      {/* google login */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <GoogleLoginButton onSuccess={onSuccess ? onSuccess : () => {}} />
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
      {/* name */}
      <Grid
        item
        sx={{
          width: "100%",
          mt: "16px",
        }}
      >
        <Grid container gap='10px' sx={{ flex: 1 }}>
          {/* firstName */}
          <Grid item sx={{ flex: 1 }}>
            <TextField
              fullWidth
              type='text'
              size='small'
              placeholder={"First Name"}
              sx={inputSx}
              value={user.firstName.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              error={user.firstName.error}
              helperText={user.firstName.errorMessage}
            />
          </Grid>
          {/* lastName */}
          <Grid item sx={{ flex: 1 }}>
            <TextField
              fullWidth
              type='text'
              size='small'
              placeholder={"Last Name"}
              sx={inputSx}
              value={user.lastName.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  lastName: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              error={user.lastName.error}
              helperText={user.lastName.errorMessage}
            />
          </Grid>
        </Grid>
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
          placeholder={"Email Address"}
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
      {/* userName */}
      <Grid
        item
        sx={{
          width: "100%",
          mt: "16px",
        }}
      >
        <TextField
          fullWidth
          type='text'
          size='small'
          placeholder={"Username"}
          sx={inputSx}
          value={user.userName.value}
          onChange={(e) =>
            setUser({
              ...user,
              userName: {
                value: e.target.value,
                error: false,
                errorMessage: "",
              },
            })
          }
          error={user.userName.error}
          helperText={user.userName.errorMessage}
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
          type='password'
          size='small'
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
      {/*confirm password */}
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
      {error && (
        <Grid item sx={{ marginTop: "1em", width: "100%" }}>
          <Alert severity='warning'>{errorMessage}</Alert>
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
          onClick={SubmitHandler}
        >
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
}
