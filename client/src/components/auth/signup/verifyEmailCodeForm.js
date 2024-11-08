import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  CircularProgress,
  useTheme,
  Paper,
} from "@mui/material";

import { useTranslation } from "next-i18next";
import OtpInput from "react-otp-input";

import { GlobalContext } from "@/context/GlobalContext";
import axios from "@/utils/axios";
import { jwtKey } from "@/data/websiteInfo";
export default function Login() {
  const theme = useTheme();
  const router = useRouter();
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [code, setCode] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    if (code === "") {
      setError({
        status: true,
        message: "Code field cannot be empty",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/users/verifyCode", {
        code: code,
      });

      if (result.data.success) {
        setVerificationSuccess(true);
        setTimeout(async () => {
          await localStorage.setItem(jwtKey, result.data.token);
          setAuth({ ...result.data.data.user, token: result.data.token });
          router.push("/");
        }, 4000);
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
          Verify Email
        </Typography>
      </Grid>
      {/* description */}
      <Grid item sx={{ width: "100%", mt: "4px" }}>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{
            px: "30px",
            lineHeight: "20px",
            fontWeight: 400,
            fontFamily: theme.typography.secondaryFont,
            whiteSpace: "break-spaces",
          }}
        >
          Enter Code sent to Email to verify your account.
        </Typography>
      </Grid>
      {/* success messae */}
      {verificationSuccess && (
        <Grid
          item
          sx={{
            width: "100%",
            mt: { sm: "40px", xs: "30px" },
          }}
        >
          <Typography
            variant='subtitle1'
            align='center'
            sx={{
              fontSize: {
                md: "50px",
                sm: "35px",
                xs: "20px",
              },
              fontWeight: 400,
              display: "block",
              whiteSpace: "break-spaces",
              color: "secondary.main",
            }}
          >
            Verification Successful
          </Typography>
        </Grid>
      )}
      {/* code input */}
      {!verificationSuccess && (
        <Grid
          item
          sx={{
            width: "100%",
            mt: { sm: "30px", xs: "20px" },
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
          {verificationSuccess ? "Submit" : error.status ? "Error" : "Submit"}
        </Button>
      </Grid>
    </Grid>
  );
}
