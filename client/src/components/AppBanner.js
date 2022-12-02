import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";

import EditToolbar from "./EditToolbar";
import SplashBanner from "./SplashBanner";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Fade from "@mui/material/Fade";

export default function AppBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
  };
  const handleLogout2 = () => {
    auth.logoutUser();
  };

  const menuId = "primary-search-account-menu";

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    console.log("userInitials: " + userInitials);
    if (loggedIn) return <div style={{ color: "black" }}>{userInitials}</div>;
    else return <AccountCircle />;
  }

  function MainBanner() {
    return (
      <>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={isMenuOpen ? "fade-menu" : undefined}
          aria-expanded={isMenuOpen ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {getAccountMenu(auth.loggedIn)}
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  let menuTemp = <SplashBanner />;
  if (auth.loggedIn) {
    menuTemp = <MainBanner />;
  }

  return (
    <>
      <AppBar
        position="static"
        style={{ width: "100%", height: "10%", backgroundColor: "#E3E3E3" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              paddingTop: "1%",
              fontStyle: "italic",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#db3d3d",
              textDecoration: "none",
            }}
          >
            Playlister
          </Typography>
          <Box sx={{ flexGrow: 0.95 }}></Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>{menuTemp}</Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
