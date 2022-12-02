import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function SplashBanner() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  return (
    <>
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
    </>
  );
}

export default SplashBanner;
