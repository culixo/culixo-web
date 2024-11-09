import React, { useState, useRef } from "react";
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  Grid2 as Grid,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Webcam from "react-webcam";
import {
  CameraAltOutlined as CameraAltOutlinedIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import dataURLtoFile from "@/utils/dataURLtoFile";

export default function Step2Form({
  data,
  loading,
  error,
  errorMessage,
  onSubmit,
}) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [file, setFile] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showWebCam, setShowWebCam] = useState(false);
  const webcamRef = useRef(null);
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
    severity: "",
  });

  const getCameraPermission = async () => {
    try {
      const mediaDevices = navigator.mediaDevices;
      const stream = await mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasCameraPermission(true);
      setShowWebCam(true);
    } catch (error) {
      console.log("Error accessing camera:", error);
      setHasCameraPermission(false);
      setShowToast({
        active: true,
        message: "Error accessing camera",
        severity: "error",
      });
    }
  };
  const SubmitHandler = async () => {
    onSubmit({
      ...data,
      profile: file,
    });
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast({
      active: false,
      message: "",
      severity: "",
    });
  };

  const renderWebCamDialog = (
    <Dialog
      open={showWebCam}
      onClose={() => setShowWebCam(false)}
      fullScreen
      fullWidth
    >
      <IconButton
        onClick={() => {
          setShowWebCam(false);
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: `1px solid ${"#667085"}`,
          borderRadius: "50px",
        }}
      >
        <ClearIcon />
      </IconButton>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Webcam
          audio={false}
          width={matchesXS ? "100%" : "380px"}
          height={720}
          ref={webcamRef}
          screenshotFormat='image/png'
        />
        <IconButton
          onClick={() => {
            const imageSrc = webcamRef.current.getScreenshot();
            const imgFile = dataURLtoFile(imageSrc, "captured_image.png");
            setFile(imgFile);

            setShowWebCam(false);
          }}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#E4E7EC",
            border: `1px solid ${"#667085"}`,
            borderRadius: "8px",
          }}
        >
          <CameraAltOutlinedIcon />
        </IconButton>
      </div>
    </Dialog>
  );

  return (
    <Grid container direction='column'>
      <Snackbar
        open={showToast.active}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Alert
          sx={{ fontSize: "20px" }}
          onClose={handleToastClose}
          severity={showToast.severity}
        >
          {showToast.message}
        </Alert>
      </Snackbar>
      {/* heading */}
      <Grid item sx={{ width: "100%", mt: "20px" }}>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontSize: "32px",
            textAlign: "center",
            fontWeight: 400,
            color: "secondary.main",
          }}
        >
          Add Profile Photo
        </Typography>
      </Grid>
      {/* view */}
      <Grid
        item
        sx={{
          width: "100%",
          mt: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          style={{
            width: "159px",
            height: "159px",
          }}
          alt='Profile'
          src={
            file !== null ? URL.createObjectURL(file) : `/assets/sampleUser.jpg`
          }
        />
      </Grid>
      {/* upload from camera */}
      <Grid item sx={{ width: "100%", mt: "40px" }}>
        <input
          type='file'
          accept='image/*'
          capture={hasCameraPermission}
          //capture={hasCameraPermission ? 'environment' : null}
          style={{ display: "none" }}
          onChange={(e) =>
            setFile(e.target.files.length > 0 ? e.target.files[0] : null)
          }
          // ref={inputRef}
        />
        {hasCameraPermission && renderWebCamDialog}

        <Button
          component='span'
          fullWidth
          variant='contained'
          size='small'
          disableElevation
          sx={{
            color: "common.dark50",
            fontSize: "16px",
            textTransform: "none",
            p: "5px",
            borderRadius: "40px",
            fontWeight: 400,
            backgroundColor: "common.light100",
            border: "1px solid",
            borderColor: "common.dark50",
            "&:hover": {
              backgroundColor: "common.light100",
            },
          }}
          onClick={() => {
            if (hasCameraPermission) {
              setShowWebCam(true);
            } else {
              getCameraPermission();
            }
          }}
        >
          Click Now Using Camera
        </Button>
      </Grid>
      {/* upload from gallery */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <input
          accept='image/*'
          style={{ display: "none" }}
          id='profile'
          type='file'
          onChange={(e) =>
            setFile(e.target.files.length > 0 ? e.target.files[0] : null)
          }
        />
        <label htmlFor='profile'>
          <Button
            component='span'
            fullWidth
            variant='contained'
            size='small'
            disableElevation
            sx={{
              color: "common.dark50",
              fontSize: "16px",
              textTransform: "none",
              p: "5px",
              borderRadius: "40px",
              fontWeight: 400,
              backgroundColor: "common.light100",
              border: "1px solid",
              borderColor: "common.dark50",
              "&:hover": {
                backgroundColor: "common.light100",
              },
            }}
          >
            Upload from Gallery
          </Button>
        </label>
      </Grid>
      {/* upload from gallery */}
      <Grid item sx={{ width: "100%", mt: "16px" }}>
        <Button
          fullWidth
          variant='contained'
          size='small'
          disableElevation
          sx={{
            color: "common.dark50",
            fontSize: "16px",
            textTransform: "none",
            p: "5px",
            borderRadius: "40px",
            fontWeight: 400,
            backgroundColor: "common.light100",
            border: "1px solid",
            borderColor: "common.dark50",
            "&:hover": {
              backgroundColor: "common.light100",
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
          {file !== null ? "Submit" : "Skip and Submit"}
        </Button>
      </Grid>

      {error && (
        <Grid item sx={{ marginTop: "1em", width: "100%" }}>
          <Alert severity='warning'>{errorMessage}</Alert>
        </Grid>
      )}
    </Grid>
  );
}
