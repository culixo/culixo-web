import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid2 as Grid, Typography, Button, Box } from "@mui/material";
//import { useTranslation } from "next-i18next";

import { GlobalContext } from "../../context/GlobalContext";

export default function Homepage() {
  const { user: globaluser } = useContext(GlobalContext);
  const router = useRouter();
  // const { t } = useTranslation(["home"]);

  return (
    <Grid container direction='column'>
      <Grid item sx={{ width: "100%", mt: "20px" }}>
        <Typography variant='h5' align='center'>
          Homepage
        </Typography>
      </Grid>
    </Grid>
  );
}
