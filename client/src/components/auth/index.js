import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid2 as Grid } from "@mui/material";

import { GlobalContext } from "@/context/GlobalContext";
import useRandomBackground from "@/hooks/useRandomBackground";
import AuthForm from "./authForm";
export default function index() {
  const randomBackground = useRandomBackground();

  const { user: globaluser } = useContext(GlobalContext);
  const router = useRouter();

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/profile");
    //return <Loading />;
  }

  const inputwidth = { xl: "25%", lg: "30%", md: "40%", sm: "60%", xs: "97%" };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(93,93,93,.5)",
          width: "100%",
          height: "100%",
          zIndex: 0,
          position: "absolute",
        }}
      ></div>

      <Grid
        container
        alignItems='center'
        justifyContent='center'
        sx={{
          minHeight: "inherit",
          background: `url(${randomBackground})`,
          backgroundSize: "cover",
        }}
      >
        <Grid
          item
          sx={{
            width: inputwidth,
            zIndex: 1,
            mt: "16px",
            borderRadius: "10px",
          }}
        >
          <AuthForm onSuccess={() => {}} />
        </Grid>
      </Grid>
    </>
  );
}