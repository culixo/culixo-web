import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import "../src/css/app.css";
import { appWithTranslation } from "next-i18next";

import { GlobalProvider, GlobalContext } from "@/context/GlobalContext";
import darkTheme from "@/utils/darkTheme";
import lightTheme from "@/utils/lightTheme";
import axios from "@/utils/axios";
import Loading from "@/reusable/loading";
import Header from "@/reusable/header";
import createEmotionCache from "@/createEmotionCache";
import { jwtKey, themeKey } from "@/data/websiteInfo";
import nextI18NextConfig from "../next-i18next.config";
import { useMediaQuery, useTheme } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const publicPages = [];
const allowedAuthPages = [];

const Main = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(
    publicPages.some((p) => router.pathname === p) ||
      allowedAuthPages.some((p) => router.pathname === p)
      ? false
      : true
  );
  const { setAuth } = useContext(GlobalContext);

  useEffect(() => {
    const fetchToken = async () => {
      if (!allowedAuthPages.some((p) => router.pathname === p)) {
        setLoadingAuth(true);
      }
      let Token = null;
      try {
        Token = await localStorage.getItem(jwtKey);
      } catch (e) {
        console.log("Error Fetching jwt Token");
        setLoadingAuth(false);
      }
      if (Token != null) {
        // validate Token Here from server or async storage to find user state
        // validating through server
        try {
          const result = await axios.post("/users/validateToken", null, {
            headers: {
              authorization: "Bearer " + Token,
            },
          });
          if (result.data.success) {
            setAuth({ ...result.data.data.user, token: Token });
          }
          setLoadingAuth(false);
        } catch (e) {
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    if (!publicPages.some((p) => router.pathname === p)) {
      fetchToken();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!allowedAuthPages.some((p) => router.pathname === p) && loadingAuth) {
    return <Loading />;
  }

  return (
    <>
      <Header loadingAuth={loadingAuth} />
      <Component {...pageProps} loadingAuth={loadingAuth} />
    </>
  );
};

//This is to inilize theme
function MuiMain(props) {
  const theme = useTheme();
  const { theme: globalTheme, setTheme } = useContext(GlobalContext);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    // On initial load, check localStorage for the theme and set it
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      setTheme(savedTheme); // Initialize the theme with the value from localStorage
    } else if (prefersDarkMode && globalTheme !== "dark") {
      setTheme("dark");
    }
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={globalTheme === "dark" ? darkTheme : lightTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Head>
        <meta name='theme-color' content={theme.palette.primary.main} />
      </Head>
      <CssBaseline />
      <Main {...props} />
    </ThemeProvider>
  );
}

// this is to inilize providers
function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <GlobalProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <MuiMain Component={Component} pageProps={pageProps} />
      </CacheProvider>
    </GlobalProvider>
  );
}
export default appWithTranslation(MyApp, nextI18NextConfig);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
