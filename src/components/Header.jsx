import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={
            "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          }
          alt="Logo"
          style={{ width: "100px", margin: "8px 20px 8px 0" }}
        />
        <Typography
          component={Link}
          to="/"
          color="inherit"
          sx={{ fontSize: "1.3rem", textDecoration: "none", mx: 2 }}
        >
          HOME
        </Typography>
        <Typography
          component={Link}
          to="/favorite"
          color="inherit"
          sx={{ fontSize: "1.3rem", textDecoration: "none", mx: 2 }}
        >
          FAVORITE
        </Typography>
        <Typography
          component={Link}
          to="/rated"
          color="inherit"
          sx={{ fontSize: "1.3rem", textDecoration: "none", mx: 2 }}
        >
          RATED
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography
          component={Link}
          to="/login"
          color="inherit"
          sx={{ fontSize: "1.3rem", textDecoration: "none", ml: "auto" }}
        >
          Login
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
