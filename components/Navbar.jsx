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
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ m: 3 }}
          >
            <Link href="/">
              <HomeIcon fontSize="large" />
            </Link>
          </IconButton>
          <IconButton
            aria-label="favorite videos"
            color="inherit"
            sx={{ m: 3 }}
          >
            <Link href="/favourites">
              <FavoriteIcon fontSize="large" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
