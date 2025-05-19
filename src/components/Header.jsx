import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store";

export default function Header() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logoutAction());
    handleMenuClose();
  };

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

        {username ? (
          <>
            <Typography
              onClick={handleMenuOpen}
              color="inherit"
              sx={{
                fontSize: "1.2rem",
                ml: "auto",
                cursor: "pointer",
              }}
            >
              {username}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              disableRestoreFocus
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Typography
            component={Link}
            to="/login"
            color="inherit"
            sx={{ fontSize: "1.3rem", textDecoration: "none", ml: "auto" }}
          >
            Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
