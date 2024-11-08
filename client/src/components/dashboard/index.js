import React from "react";

export default function index() {
  return <div>dashboard</div>;
}
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid2 as Grid, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "next-i18next";

import { GlobalContext } from "../../context/GlobalContext";
import Header from "../../reusable/header";

export default function Dashboard() {
  const { user: globaluser } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation(["dashboard"]);

  return (
    <Grid container direction='column'>
      <Grid item sx={{ width: "100%" }}>
        <Header />
      </Grid>
      <Grid item sx={{ width: "100%", mt: "20px" }}>
        <Typography variant='h5' align='center'>
          Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}
