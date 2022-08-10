import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link"

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link href="/">
              <HomeIcon />
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="favorite videos" color="inherit">
            <Link href="/favorites">
              <FavoriteIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
