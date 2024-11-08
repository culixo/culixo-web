import React, { useContext } from "react";
import { useRouter } from "next/router";
import {
  useMediaQuery,
  Grid2 as Grid,
  useTheme,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";

import { GlobalContext } from "../context/GlobalContext";
import { jwtKey } from "@/data/websiteInfo";

export default function Sidebar({ compact }) {
  const drawerWidth = { md: compact ? "80px" : "264px", xs: "80px" };

  const router = useRouter();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  const menus = [
    {
      label: "Home",
      url: "/",
      renderSvg: (fill) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M10.07 2.82 3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01'
          ></path>
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M12 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'
          ></path>
        </svg>
      ),
    },
    {
      label: "Saved Recipes",
      url: "/saved-recipes",
      renderSvg: (fill) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M22 8.52V3.98C22 2.57 21.36 2 19.77 2h-4.04c-1.59 0-2.23.57-2.23 1.98v4.53c0 1.42.64 1.98 2.23 1.98h4.04c1.59.01 2.23-.56 2.23-1.97M22 19.77v-4.04c0-1.59-.64-2.23-2.23-2.23h-4.04c-1.59 0-2.23.64-2.23 2.23v4.04c0 1.59.64 2.23 2.23 2.23h4.04c1.59 0 2.23-.64 2.23-2.23M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98v4.53c0 1.42.64 1.98 2.23 1.98h4.04c1.59.01 2.23-.56 2.23-1.97M10.5 19.77v-4.04c0-1.59-.64-2.23-2.23-2.23H4.23c-1.59 0-2.23.64-2.23 2.23v4.04C2 21.36 2.64 22 4.23 22h4.04c1.59 0 2.23-.64 2.23-2.23'
          ></path>
        </svg>
      ),
    },
    {
      label: "Post Recipes",
      url: "/new-recipe",
      renderSvg: (fill) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7'
          ></path>
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m7.33 14.49 2.38-3.09c.34-.44.97-.52 1.41-.18l1.83 1.44c.44.34 1.07.26 1.41-.17l2.31-2.98'
          ></path>
        </svg>
      ),
    },
    {
      label: "Settings",
      url: "/setting",
      renderSvg: (fill) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6'
          ></path>
          <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.9 1.9 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9'
          ></path>
        </svg>
      ),
    },
  ];

  const logoutHandler = async () => {
    try {
      router.push("/auth");
      setAuth(null);

      await localStorage.removeItem(jwtKey);
    } catch (e) {
      console.log("faled to logout", e);
    }
  };

  const menuSx = (active) => {
    return {
      minWidth: "unset",
      textTransform: "none",
      display: "flex",
      gap: "14px",
      alignItems: "center",
      justifyContent: {
        md: compact ? "center" : "flex-start",
        xs: "center",
      },
      p: {
        md: compact ? "16px 0px" : "16px 24px 16px 12px",
        xs: "16px 0px",
      },
      color: active
        ? "common.success30"
        : theme.palette.mode === "dark"
        ? "common.light100"
        : "common.dark40",
      ":hover": {
        boxShadow: "none",
      },
    };
  };
  return (
    <Grid
      container
      direction='column'
      gap='32px'
      sx={{
        minHeight: "100%",
        width: drawerWidth,
        borderRadius: "10px",
        boxShadow: "0px 0px 30px 0px #AAAAAA29",
        p: "16px",
        backgroundColor:
          theme.palette.mode === "dark" ? "common.dark70" : "common.light100",
      }}
    >
      <Grid item sx={{ flex: 1 }}>
        {menus.map((item, i) => {
          const active = router.pathname === item.url;

          const action = (
            <Button
              key={i}
              fullWidth
              disableElevation
              sx={menuSx(active)}
              onClick={() => {
                if (item.onClick) onClick();
                else router.push(item.url);
              }}
            >
              {item.renderSvg(
                active
                  ? theme.palette.common.success30
                  : theme.palette.mode === "dark"
                  ? theme.palette.common.light100
                  : theme.palette.common.dark40
              )}
              <Typography
                variant='subtitle1'
                sx={{
                  fontFamily: theme.typography.secondaryFont,
                  fontWeight: active ? 700 : 400,
                  lineHeight: "25px",
                  display: { md: compact ? "none" : "unset", xs: "none" },
                }}
              >
                {item.label}
              </Typography>
            </Button>
          );
          return compact || matchesMD ? (
            <Tooltip title={item.label} placement='right'>
              {action}
            </Tooltip>
          ) : (
            action
          );
        })}
      </Grid>
      <Grid item>
        <Button
          fullWidth
          disableElevation
          sx={{
            ...menuSx(false),
            "&:hover": {
              background: "transparent",
            },
          }}
          onClick={logoutHandler}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            fill='none'
            viewBox='0 0 22 22'
          >
            <path
              stroke={
                theme.palette.mode === "dark"
                  ? theme.palette.common.light100
                  : theme.palette.common.dark40
              }
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M7.9 6.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M14 11H2.62M4.85 7.65 1.5 11l3.35 3.35'
            ></path>
          </svg>

          <Typography
            variant='subtitle1'
            sx={{
              fontFamily: theme.typography.secondaryFont,
              fontWeight: 400,
              lineHeight: "25px",
              display: { md: compact ? "none" : "unset", xs: "none" },
            }}
          >
            Log out
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
