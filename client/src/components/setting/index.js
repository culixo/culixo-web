import React, { useState, useContext } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  inputClasses,
  Autocomplete,
  chipClasses,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  AddLink as AddLinkIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { phone } from "phone";

import axios from "@/utils/axios";
import { GlobalContext } from "@/context/GlobalContext";
import Sidebar from "@/reusable/dashboardSidebar";
import PhoneInput from "@/reusable/phoneInput";

const availableCuisine = [
  {
    label: "Italian",
    value: "Italian",
  },
  {
    label: "Mexican",
    value: "Mexican",
  },
  {
    label: "Chinese",
    value: "Chinese",
  },
  {
    label: "Indian",
    value: "Indian",
  },
  {
    label: "Japanese",
    value: "Japanese",
  },
  {
    label: "French",
    value: "French",
  },
  {
    label: "Thai",
    value: "Thai",
  },
  {
    label: "Mediterranean",
    value: "Mediterranean",
  },
];
export default function profile() {
  const theme = useTheme();
  const { user: globalUser, setAuth } = useContext(GlobalContext);
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    status: false,
    message: "",
    action: "",
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
  });

  const initialValues = {
    name: {
      value: globalUser?.name,
      error: false,
      errorMessage: "",
    },
    favoriteCuisine: {
      value: globalUser?.favoriteCuisine || [],
      error: false,
      errorMessage: "",
    },
    phoneCode: {
      value: globalUser?.phoneCode,
      error: false,
      errorMessage: "",
    },
    phoneNumber: {
      value: globalUser?.phoneNumber,
      error: false,
      errorMessage: "",
    },
    bio: {
      value: globalUser?.bio,
      error: false,
      errorMessage: "",
    },
    socials: {
      value: globalUser?.socials || [],
      error: false,
      errorMessage: "",
    },
  };
  const [user, setUser] = useState(initialValues);
  //for profile photo
  const [file, setFile] = useState(null);

  const updateHandler = async () => {
    setError({
      status: false,
      message: "",
      action: "update",
    });
    if (user.name.value === "") {
      setUser({
        ...user,
        name: {
          value: user.name.value,
          error: true,
          errorMessage: "Name cannot be empty",
        },
      });
      return;
    }

    if (user.phoneNumber.value) {
      if (!phone(user.phoneCode.value + "" + user.phoneNumber.value).isValid) {
        setUser({
          ...user,
          phoneNumber: {
            value: user.phoneNumber.value,
            error: true,
            errorMessage: "Invalid Phone",
          },
        });
        return;
      }
    }
    if (
      Array.isArray(user.socials.value) &&
      user.socials.value?.filter((x) => x.href !== "").length > 0
    ) {
      if (
        !user.socials.value.some((socialMedia) =>
          socialMedia.href.startsWith("https://")
        )
      ) {
        setError({
          status: true,
          message: "Invalid social media URL must start with https",
          action: "update",
        });
        return;
      }
    }

    try {
      setLoading({
        active: true,
        action: "update",
      });
      let body = {
        name: user.name.value,
        phoneCode: user.phoneCode.value,
        phoneNumber: user.phoneNumber.value,
        favoriteCuisine: user.favoriteCuisine.value,
        bio: user.bio.value,
        socials: Array.isArray(user.socials.value)
          ? JSON.stringify(user.socials.value.filter((x) => x.href !== ""))
          : JSON.stringify([]),
      };
      let formData = new FormData();
      Object.keys(body).map((key) => {
        formData.append(key, body[key]);
        return key;
      });
      formData.append("profile", file);
      body = formData;

      const result = await axios.patch("/users/", body, {
        headers: {
          authorization: "Bearer " + globalUser?.token,
        },
      });

      if (result.data.success) {
        setShowToast({
          active: true,
          message: "Profile Updated Successfully",
        });
        setAuth({
          ...globalUser,
          ...result.data.data.doc,
        });
        setFile(null);
      } else {
        setError({
          status: true,
          message: result.data.message,
          action: "update",
        });
      }
      setLoading({
        active: false,
        action: "",
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: "",
      });
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
        action: "update",
      });
    }
  };

  const updatePasswordHandler = async () => {
    setError({
      status: false,
      message: "",
      action: "update",
    });
    if (user.passwordCurrent.value === "") {
      setUser({
        ...user,
        passwordCurrent: {
          value: user.passwordCurrent.value,
          error: true,
          errorMessage: "Current Password cannot be empty",
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
        password: {
          value: user.password.value,
          error: true,
          errorMessage: "Password and Confirm Password does not match",
        },
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: "Password and Confirm Password does not match",
        },
      });
      return;
    }

    try {
      setLoading({
        active: true,
        action: "changePassword",
      });
      const result = await axios.patch(
        "/users/updatePassword",
        {
          passwordCurrent: user.passwordCurrent.value,
          password: user.password.value,
        },
        {
          headers: {
            authorization: "Bearer " + globalUser?.token,
          },
        }
      );

      if (result.data.success) {
        setShowToast({
          active: true,
          message: "Password Updated Successfully",
        });
      } else {
        setError({
          status: true,
          message: result.data.message,
          action: "changePassword",
        });
      }
      setLoading({
        active: false,
        action: "",
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: "",
      });
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
        action: "changePassword",
      });
    }
  };

  const labelSx = {
    fontWeight: 500,
    fontFamily: theme.typography.secondaryFont,
    color: theme.palette.mode === "dark" ? "common.light100" : "common.dark40",
    mb: "6px",
  };
  const inputSx = {
    [`& .${inputClasses.formControl}`]: {
      backgroundColor: "common.light40",
      color: "common.dark100",
    },
    [`& fieldset`]: {
      border: "1px solid",
      borderColor: "common.light30",
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
    <Grid
      container
      direction='column'
      alignItems='center'
      sx={{ minHeight: "inherit", px: theme.mixins.px }}
    >
      <Snackbar
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() =>
              setShowToast({
                active: false,
                message: "",
              })
            }
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
        open={showToast.active}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setShowToast({
            active: false,
            message: "",
          });
        }}
        message={showToast.message}
      />
      <Toolbar />

      {/* page */}
      <Grid
        item
        sx={{
          width: { md: "90%", xs: "100%" },
          flex: 1,
          mt: "40px",
          mb: "20px",
          display: "flex",
        }}
      >
        <Grid
          container
          gap={{ md: "20px", sm: "10px", xs: "5px" }}
          sx={{
            flex: 1,
            minHeight: "100%",
            position: "relative",
          }}
        >
          <Grid item sx={{ position: "relative" }}>
            <Sidebar />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Grid
              container
              direction='column'
              sx={{
                minHeight: "100%",
                flexGrow: 1,
                borderRadius: "10px",
                boxShadow: "0px 0px 30px 0px #AAAAAA29",
                px: { md: "32px", xs: "16px" },
                py: "10px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "common.dark70"
                    : "common.light100",
              }}
            >
              {/* profile */}
              <Grid item sx={{ width: "100%", mt: "20px" }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    ...labelSx,
                    ml: "4px",
                  }}
                >
                  Profile Picture
                </Typography>
                <Box sx={{ width: "fit-content", position: "relative" }}>
                  <Avatar
                    variant='rounded'
                    src={
                      file !== null
                        ? URL.createObjectURL(file)
                        : globalUser?.profile
                        ? globalUser?.external
                          ? globalUser?.profile
                          : `${publicRuntimeConfig.REACT_APP_BUCKET}/profile-pictures/${globalUser?.profile}`
                        : `/assets/sampleUser.jgp`
                    }
                    sx={{
                      width: "132px",
                      height: "132px",
                      borderRadius: "18px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-12px",
                      right: "-10px",
                    }}
                  >
                    <input
                      accept='image/*'
                      style={{ display: "none" }}
                      id='profile'
                      type='file'
                      onChange={(e) =>
                        setFile(
                          e.target.files.length > 0 ? e.target.files[0] : null
                        )
                      }
                    />
                    <label htmlFor='profile' style={{ cursor: "pointer" }}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <g clipPath='url(#clip0_188_1276)'>
                          <path
                            fill={
                              theme.palette.mode === "dark"
                                ? theme.palette.common.light100
                                : theme.palette.common.success30
                            }
                            d='M15 3c1.296 0 2.496.41 3.477 1.11l-9.134 9.133a1 1 0 1 0 1.414 1.414l9.134-9.134A5.98 5.98 0 0 1 21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm6.657-.657a1 1 0 0 1 0 1.414L19.89 5.523a6 6 0 0 0-1.414-1.414l1.766-1.766a1 1 0 0 1 1.415 0'
                          ></path>
                        </g>
                        <defs>
                          <clipPath id='clip0_188_1276'>
                            <path fill='#fff' d='M0 0h24v24H0z'></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </label>
                  </div>
                </Box>
              </Grid>
              <Divider sx={{ mt: "30px", height: "2px" }} />
              {/* name and phone */}
              <Grid item sx={{ width: "100%", mt: "20px" }}>
                <Grid container gap='16px' sx={{ flex: 1 }}>
                  {/* name */}
                  <Grid item sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        ...labelSx,
                      }}
                    >
                      Full name
                    </Typography>
                    <TextField
                      fullWidth
                      type='text'
                      size='small'
                      placeholder={"Name"}
                      sx={inputSx}
                      value={user.name.value}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          name: {
                            value: e.target.value,
                            error: false,
                            errorMessage: "",
                          },
                        })
                      }
                      error={user.name.error}
                      helperText={user.name.errorMessage}
                    />
                  </Grid>
                  {/* phone */}
                  <Grid item sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        ...labelSx,
                      }}
                    >
                      Phone number
                    </Typography>
                    <PhoneInput
                      placeholder='Phone number'
                      phoneCode={user.phoneCode.value}
                      phoneNumber={user.phoneNumber.value}
                      onPhoneCodeChange={(newValue) =>
                        setUser({
                          ...user,
                          phoneCode: {
                            value: newValue,
                            error: false,
                            errorMessage: "",
                          },
                        })
                      }
                      onPhoneNumberChange={(newValue) =>
                        setUser({
                          ...user,
                          phoneNumber: {
                            value: newValue,
                            error: false,
                            errorMessage: "",
                          },
                        })
                      }
                      error={user.phoneNumber.error}
                      errorMessage={user.phoneNumber.errorMessage}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* bio */}
              <Grid item sx={{ width: "100%", mt: "16px" }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    ...labelSx,
                  }}
                >
                  Bio
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  type='text'
                  size='small'
                  placeholder={"I’m a foodie and homemade chef :)"}
                  sx={inputSx}
                  value={user.bio.value}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      bio: {
                        value: e.target.value,
                        error: false,
                        errorMessage: "",
                      },
                    })
                  }
                  error={user.bio.error}
                  helperText={user.bio.errorMessage}
                />
              </Grid>
              {/* favoriteCuisine */}
              <Grid item sx={{ width: "100%", mt: "16px" }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    ...labelSx,
                  }}
                >
                  Favorite Cuisine
                </Typography>
                <Autocomplete
                  disablePortal
                  multiple
                  value={
                    Array.isArray(user.favoriteCuisine.value)
                      ? user.favoriteCuisine.value
                      : []
                  }
                  onChange={(event, newValue, reason, details) => {
                    if (
                      Array.isArray(user.favoriteCuisine.value) &&
                      details &&
                      user.favoriteCuisine.value.some(
                        (x) => x === details?.option?.value
                      )
                    ) {
                      return;
                    }
                    setUser({
                      ...user,
                      favoriteCuisine: {
                        value: newValue.map((x) =>
                          typeof x === "object" ? x.value : x
                        ),
                        error: false,
                        errorMessage: "",
                      },
                    });
                  }}
                  options={availableCuisine}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size='small'
                      sx={inputSx}
                      placeholder='Select your favourite Cuisine type'
                    />
                  )}
                  slotProps={{
                    popupIndicator: {
                      sx: {
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                    },
                    clearIndicator: {
                      sx: {
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                    },
                    chip: {
                      sx: {
                        background: "#DADFE3",
                        color: "#000",
                        [`& .${chipClasses.deleteIcon}`]: {
                          color: "rgba(0, 0, 0, 0.26)",
                        },
                      },
                    },
                  }}
                />
              </Grid>
              {/* socialMedia */}
              <Grid item sx={{ width: "100%", mt: "16px" }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    ...labelSx,
                  }}
                >
                  Social Media
                </Typography>
                {/* insta */}
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  placeholder={"Instagram Profile Url"}
                  sx={inputSx}
                  slotProps={{
                    input: {
                      startAdornment: <InstagramIcon sx={{ pr: "6px" }} />,
                    },
                  }}
                  value={
                    Array.isArray(user.socials.value)
                      ? user.socials.value.find((x) => x.name === "instagram")
                          ?.href
                      : []
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      socials: {
                        value:
                          Array.isArray(user.socials.value) &&
                          user.socials.value.length > 0
                            ? user.socials.value.find(
                                (x) => x.name === "instagram"
                              )
                              ? user.socials.value.map((x) => {
                                  if (x.name === "instagram") {
                                    x.href = e.target.value;
                                  }
                                  return x;
                                })
                              : [
                                  ...user.socials.value,
                                  { name: "instagram", href: e.target.value },
                                ]
                            : [{ name: "instagram", href: e.target.value }],
                        error: false,
                        errorMessage: "",
                      },
                    })
                  }
                  error={user.socials.error}
                  helperText={user.socials.errorMessage}
                />
                <div style={{ marginTop: "6px" }} />
                {/* facebook */}
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  placeholder={"Facebook Profile Url"}
                  sx={inputSx}
                  slotProps={{
                    input: {
                      startAdornment: <FacebookIcon sx={{ pr: "6px" }} />,
                    },
                  }}
                  value={
                    Array.isArray(user.socials.value) &&
                    user.socials.value.length > 0
                      ? user.socials.value.find((x) => x.name === "facebook")
                          ?.href
                      : []
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      socials: {
                        value:
                          Array.isArray(user.socials.value) &&
                          user.socials.value.length > 0
                            ? user.socials.value.find(
                                (x) => x.name === "facebook"
                              )
                              ? user.socials.value.map((x) => {
                                  if (x.name === "facebook") {
                                    x.href = e.target.value;
                                  }
                                  return x;
                                })
                              : [
                                  ...user.socials.value,
                                  { name: "facebook", href: e.target.value },
                                ]
                            : [{ name: "facebook", href: e.target.value }],
                        error: false,
                        errorMessage: "",
                      },
                    })
                  }
                  error={user.socials.error}
                  helperText={user.socials.errorMessage}
                />
                <div style={{ marginTop: "6px" }} />
                {/* url */}
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  placeholder={"Your website URL"}
                  sx={inputSx}
                  slotProps={{
                    input: {
                      startAdornment: <AddLinkIcon sx={{ pr: "6px" }} />,
                    },
                  }}
                  value={
                    Array.isArray(user.socials.value) &&
                    user.socials.value.length > 0
                      ? user.socials.value.find((x) => x.name === "website")
                          ?.href
                      : []
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      socials: {
                        value:
                          Array.isArray(user.socials.value) &&
                          user.socials.value.length > 0
                            ? user.socials.value.find(
                                (x) => x.name === "website"
                              )
                              ? user.socials.value.map((x) => {
                                  if (x.name === "website") {
                                    x.href = e.target.value;
                                  }
                                  return x;
                                })
                              : [
                                  ...user.socials.value,
                                  { name: "website", href: e.target.value },
                                ]
                            : [{ name: "website", href: e.target.value }],
                        error: false,
                        errorMessage: "",
                      },
                    })
                  }
                  error={user.socials.error}
                  helperText={user.socials.errorMessage}
                />
              </Grid>
              {error.status && error.action === "update" && (
                <Grid item sx={{ mt: "16px", width: "100%" }}>
                  <Alert severity='warning'>{error.message}</Alert>
                </Grid>
              )}
              {/* submit */}
              <Grid item sx={{ mt: "16px", width: "100%" }}>
                <Grid container gap='16px'>
                  <Button
                    variant='contained'
                    size='small'
                    disableElevation
                    sx={{
                      fontFamily: theme.typography.secondaryFont,
                      p: "4px 32px",
                      fontSize: "16px",
                      fontWeight: 500,
                      textTransform: "none",
                      backgroundColor: "common.success40",
                      color: "common.light100",

                      "&:hover": {
                        backgroundColor: "common.success60",
                      },
                      "&.Mui-disabled": {
                        opacity: 0.8,
                      },
                    }}
                    startIcon={
                      loading.active &&
                      loading.action === "update" && (
                        <CircularProgress
                          size='1rem'
                          sx={{
                            color: "common.light100",
                          }}
                        />
                      )
                    }
                    disabled={loading.active && loading.action === "update"}
                    onClick={updateHandler}
                  >
                    Update Profile
                  </Button>

                  <Button
                    variant='text'
                    onClick={() => {
                      setUser(initialValues);
                      setFile(null);
                    }}
                    sx={{
                      textTransform: "none",
                      color: "common.dark40",
                    }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
