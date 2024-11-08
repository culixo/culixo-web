import React, { useContext, useState } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import { Facebook as FacebookIcon } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Typography } from "@mui/material";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { jwtKey } from "@/data/websiteInfo";
import axios from "@/utils/axios";
import { GlobalContext } from "@/context/GlobalContext";

const FacebookLoginButton = ({ onSuccess }) => {
  const { setAuth } = useContext(GlobalContext);

  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const handleLogin = async (fbData) => {
    setError({
      status: false,
      message: "",
    });

    try {
      const result = await axios.post(`/users/externalLogin`, {
        token: fbData.accessToken,
        method: "facebook",
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
    } catch (err) {
      console.log(err?.response?.data?.message);

      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  const onFailure = (err) => {
    console.log("failed", err);
    setError({
      status: true,
      message: err.message || "Something went wrong",
    });
  };
  return (
    <>
      <FacebookLogin
        render={(renderProps) => (
          <Button
            fullWidth
            size='small'
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "common.dark100",
              backgroundColor: "common.light100",
              borderRadius: "50px",
              fontWeight: 400,
              textTransform: "none",
              boxShadow: "none",
              p: "8px",
              "&:hover": {
                color: "common.dark100",
                backgroundColor: "common.light100",
              },
            }}
            onClick={() => renderProps.onClick()}
          >
            <FacebookIcon style={{ marginRight: "10px" }} /> Log in with
            Facebook
          </Button>
        )}
        appId={publicRuntimeConfig.REACT_APP_FACEBOOK_APP_ID}
        fields={"name, email, picture, birthday, gender, timezone"}
        onSuccess={handleLogin}
        onFailure={onFailure}
        //icon={facebookLogo}

        redirectUri='http://localhost:3000/en'
      />

      {error.status && (
        <Grid item sx={{ marginTop: "1em" }}>
          <Typography
            variant='subtitle2'
            sx={{ display: "flex", alignItems: "center" }}
          >
            {" "}
            <ErrorOutlineIcon
              style={{ fill: "red", marginRight: "4px" }}
            />{" "}
            {error.message}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default FacebookLoginButton;
