import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountBox as AccountBoxIcon } from "@mui/icons-material";

import { useTranslation } from "next-i18next";

export default function Sidebar({ open, setOpen }) {
  const { t } = useTranslation();

  const router = useRouter();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { user: globaluser } = useContext(GlobalContext);

  const listItems = [
    {
      url: "/profile",
      label: "Profile",
      visible: true,
      icon: <AccountBoxIcon />,
    },
    {
      url: "/vehicles",
      label: "Vehicles",
      visible: ["Super Admin", "Admin"].some((r) =>
        globaluser.roles.includes(r)
      ),
      icon: <AccountBoxIcon />,
    },
  ];
  return (
    <SwipeableDrawer
      variant={matchesSM ? "temporary" : "persistent"}
      anchor='left'
      open={open}
      onClose={handleDrawerClose}
      onOpen={() => setOpen(true)}
    >
      <Toolbar />
      <List>
        {listItems
          .filter((x) => x.visible)
          .map((listItem, index) => (
            <ListItem
              key={listItem.url}
              component={Link}
              target={listItem.url}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </SwipeableDrawer>
  );
}
