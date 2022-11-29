import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";

import EditToolbar from "./EditToolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

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
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  let editToolbar = "";
  let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
    if (store.currentList) {
      editToolbar = <EditToolbar />;
    }
  }

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    console.log("userInitials: " + userInitials);
    if (loggedIn)
      // return <div>{userInitials}</div>;
      return <IconButton onClick={handleLogout2}>{userInitials}</IconButton>;
    else return <AccountCircle />;
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              style={{
                color: "black",
                border: "1px solid black",
                paddingTop: "3%",
                paddingBottom: "3%",
                paddingLeft: "11%",
                paddingRight: "11%",
                marginTop: "2%",
                marginRight: "2%",
              }}
              component={Link}
              to="/login/"
            >
              Login
            </Button>
            <Button
              style={{
                color: "black",
                border: "1px solid black",
                paddingTop: "3%",
                paddingBottom: "3%",
                paddingLeft: "5%",
                paddingRight: "5%",
                marginTop: "2%",
                marginRight: "2%",
              }}
              component={Link}
              to="/register/"
            >
              Create Account
            </Button>
            <Button
              style={{
                color: "black",
                border: "1px solid black",
                paddingTop: "3%",
                paddingBottom: "3%",
                paddingLeft: "5%",
                paddingRight: "5%",
                marginTop: "2%",
                marginRight: "2%",
              }}
              component={Link}
              to="/"
            >
              Continue as Guest
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
    </>
  );
}
