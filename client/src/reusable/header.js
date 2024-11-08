import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  Grid2 as Grid,
  AppBar,
  useMediaQuery,
  useTheme,
  Toolbar,
  Drawer,
  IconButton,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

import AuthModal from "@/components/auth/authDialog";
import CategoriesDropdown from "./categoriesDropdown";
import { GlobalContext } from "@/context/GlobalContext";
import { themeKey } from "@/data/websiteInfo";

const Header = ({ loadingAuth }) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("1050"));
  const router = useRouter();
  const iOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState({
    active: false,
    mode: "login",
  });
  const {
    user: globalUser,
    theme: globalTheme,
    setTheme,
  } = useContext(GlobalContext);

  // Listen for theme changes from other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === themeKey) {
        setTheme(event.newValue); // Update the theme in the current tab
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setTheme]);

  const openModal = (mode) => {
    setShowAuthModal({
      active: true,
      mode: mode,
    });
  };

  const closeModal = () => {
    setShowAuthModal({
      active: false,
      mode: "login",
    });
  };

  const handlePostRecipe = () => {
    router.push("/post-recipe");
  };

  const handleProfileClick = () => {
    router.push("/setting");
  };

  // Function to toggle the theme and save it to localStorage
  const toggleTheme = () => {
    const newTheme = globalTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(themeKey, newTheme); // Store theme in localStorage
  };

  const isActive = (path) => router.pathname === path;

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const menus = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About Us",
      url: "/about",
    },
    {
      label: "Recipes",
      url: "/recipes",
    },
    {
      component: <CategoriesDropdown isActive={isActive} />,
    },
    {
      label: "Contact Us",
      url: "/contact",
    },
  ];

  const logoContainer = (
    <Grid container alignItems='center' gap='2px'>
      <img src='/assets/logo.png' alt='Culixo' style={{ height: "50px" }} />

      <Box
        component='span'
        sx={{ display: openDrawer ? "unset" : { sm: "unset", xs: "none" } }}
      >
        <Typography
          variant='h5'
          sx={{
            color: openDrawer
              ? theme.palette.mode === "light"
                ? "primary.main"
                : "common.light100"
              : "secondary.main",
            fontWeight: 700,
          }}
        >
          Culixo
        </Typography>
      </Box>
    </Grid>
  );

  const renderMenus = (
    <Grid
      container
      direction={matchesMD ? "column" : "row"}
      gap='30px'
      sx={{ position: "relative" }}
    >
      {menus.map((item, i) =>
        item.component ? (
          <Grid item key={i}>
            {item.component}
          </Grid>
        ) : (
          <Grid item key={i}>
            <Link href={item.url} style={{ textDecoration: "none" }}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: isActive(item.url) ? 700 : 500,
                  transition: "color 0.3s ease",
                  color: isActive(item.url)
                    ? "common.success40"
                    : matchesMD && theme.palette.mode === "light"
                    ? "common.dark100"
                    : "common.light100",
                  "&:hover": {
                    color: "common.success60",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          </Grid>
        )
      )}
    </Grid>
  );
  const drawer = (
    <Drawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
      elevation={4}
      sx={{
        ".MuiPaper-root": {
          position: "relative",
          width: { md: "40%", sm: "60%", xs: "100%" },
          //backgroundColor: "secondary.main",
        },
      }}
    >
      <IconButton
        onClick={() => setOpenDrawer((openDrawer) => !openDrawer)}
        disableRipple
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
      >
        <CloseIcon sx={{ fontSize: "2rem" }} />
      </IconButton>

      <Grid
        container
        direction='column'
        sx={{ boxSizing: "border-box", p: "20px" }}
      >
        {/* logo and theme */}
        <Grid item sx={{ width: "100%", mt: "40px" }}>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            gap='5px'
          >
            {logoContainer}
            <IconButton
              disableRipple
              sx={{ p: 0, display: "flex", alignItems: "center", gap: "30px" }}
              onClick={toggleTheme}
            >
              {globalTheme === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Grid>
        </Grid>
        {/* list items */}
        <Grid item sx={{ width: "100%", mt: "50px" }}>
          {renderMenus}
        </Grid>
      </Grid>
    </Drawer>
  );
  return (
    <>
      <AuthModal
        open={showAuthModal.active}
        onClose={closeModal}
        initialMode={showAuthModal.mode}
      />
      <AppBar
        elevation={0}
        position='fixed'
        sx={{
          //background: "transparent",
          zIndex: 1000,
          backgroundColor: "rgba(29, 29, 31, 0.86)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Toolbar
          sx={{
            "&.MuiToolbar-root": { px: 0 },
          }}
        >
          <Grid
            container
            gap='30px'
            wrap='nowrap'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              flex: 1,
              px: theme.mixins.px,
              py: "8px",
            }}
          >
            {/* logo */}
            <Grid item>{logoContainer}</Grid>
            {/* menus */}
            {!matchesMD && <Grid item>{renderMenus}</Grid>}
            {/* actions */}
            {!loadingAuth && (
              <Grid item>
                <Grid container alignItems='center' gap='15px'>
                  {globalUser ? (
                    <>
                      <Button
                        variant='contained'
                        size='small'
                        disableElevation
                        onClick={handlePostRecipe}
                        sx={{
                          p: "4px 16px",
                          fontSize: "14px",
                          boxShadow: "none",
                          fontWeight: 500,
                          textTransform: "none",
                          backgroundColor: "common.success40",
                          color: "common.light100",

                          "&:hover": {
                            backgroundColor: "common.success60",
                          },
                        }}
                      >
                        Post Recipe
                      </Button>
                      <Avatar
                        src={
                          globalUser.profile
                            ? globalUser.external
                              ? globalUser.profile
                              : `${publicRuntimeConfig.REACT_APP_BUCKET}/profile-pictures/${globalUser?.profile}`
                            : `/assets/sampleUser.jgp`
                        }
                        size='small'
                        onClick={handleProfileClick}
                        style={{
                          //      backgroundColor: "transparent",
                          color: "common.light100",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          cursor: "pointer",
                        }}
                        aria-label='User Profile'
                      >
                        {getInitial(globalUser?.firstName)}
                      </Avatar>
                    </>
                  ) : (
                    <>
                      <Button
                        variant='contained'
                        size='small'
                        disableElevation
                        sx={{
                          p: "4px 16px",
                          fontSize: "14px",
                          fontWeight: 500,
                          textTransform: "none",
                          backgroundColor: "common.success40",
                          color: "common.light100",
                          "&:hover": {
                            backgroundColor: "common.success60",
                          },
                        }}
                        onClick={() => openModal("login")}
                      >
                        Login
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        disableElevation
                        sx={{
                          p: "4px 16px",
                          fontSize: "14px",
                          fontWeight: 500,
                          textTransform: "none",
                          backgroundColor: "transparent",
                          color: "common.light100",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                        onClick={() => openModal("signup")}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                  {matchesMD ? (
                    <Grid item>
                      {drawer}

                      <IconButton
                        onClick={() =>
                          setOpenDrawer((openDrawer) => !openDrawer)
                        }
                        disableRipple
                        sx={{
                          p: 0,
                        }}
                      >
                        <MenuIcon sx={{ fontSize: "2rem", color: "#fff" }} />
                      </IconButton>
                    </Grid>
                  ) : (
                    <IconButton
                      sx={{ color: "common.light100" }}
                      onClick={toggleTheme}
                    >
                      {globalTheme === "dark" ? (
                        <Brightness7Icon />
                      ) : (
                        <Brightness4Icon />
                      )}
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
