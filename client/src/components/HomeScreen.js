import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SortIcon from "@mui/icons-material/Sort";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import WorkspaceScreen from "./WorkspaceScreen";
import SongCard from "./SongCard.js";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import YouTubePlayer from "./YouTubePlayer";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const options = [
    "Name (A-Z)",
    "Publish Date(Newest)",
    "Listens (High - Low)",
    "Likes (High - Low)",
    "Dislikes (high - Low)",
  ];
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);
  let userName = auth.getUserName();
  const [value, setValue] = React.useState("one");

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  function handleCreateNewList() {
    store.createNewList();
  }
  function handleLogout() {
    auth.logoutUser();
    history.push("/");
  }
  let listCard = "";
  let youtubePlayerComments = "";

  if (store) {
    console.log("KKK");
    // const temp = store.idNamePairs[0];
    // console.log(temp._id);
    console.log("KKK");
    listCard = (
      <List
        sx={{ width: "45%", left: "5%", bgcolor: "background.paper" }}
        style={{ display: "inline-block" }}
      >
        {store.idNamePairs.map((pair) => (
          <ListCard key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
  }
  if (store) {
    youtubePlayerComments = (
      <Box
        sx={{ width: "45%", left: "5%", backgroundColor: "orange" }}
        style={{ float: "right", display: "inline-block" }}
      >
        <Tabs
          value={value}
          onChange={handleChange2}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Player" />
          <Tab value="two" label="Comments" />
        </Tabs>
        <YouTubePlayer />
      </Box>
    );
  }
  // let deleteListModal = "";
  // if (store.isDeleteListModalOpen()) deleteListModal = <MUIDeleteModal />;

  // if (store) {
  //   listCard = (
  //     <List sx={{ width: "50%", left: "5%", bgcolor: "background.paper" }}>
  //       {store.idNamePairs.map((pair) => (
  //         <Accordion
  //           expanded={expanded === "panel" + pair._id + ""}
  //           onChange={handleChange("panel" + pair._id + "")}
  //         >
  //           <AccordionSummary
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls="panel1bh-content"
  //             id="panel1bh-header"
  //             onClick={store.setCurrentList2(pair._id)}
  //           >
  //             <Typography sx={{ width: "33%", flexShrink: 0 }}>
  //               {pair.name}
  //             </Typography>
  //             <ThumbUpIcon />
  //             <ThumbDownIcon />
  //             <Typography>{pair._id}</Typography>
  //           </AccordionSummary>
  //           <AccordionDetails>
  //             <List sx={{ width: "80%", left: "5%", bgcolor: "olive" }}>
  //               {/* <List
  //                   id="playlist-cards"
  //                   sx={{ width: "100%", bgcolor: "background.paper" }}
  //                 > */}
  //               {/* {store.currentList === null
  //                 ? "HEllo"
  //                 : store.currentList.songs.map((song, index) => (
  //                     <SongCard
  //                       id={"playlist-song-" + index}
  //                       key={"playlist-song-" + index}
  //                       index={index}
  //                       song={song}
  //                     />
  //                   ))} */}
  //               {/* <WorkspaceScreen /> */}
  //               {/* </List> */}
  //               <Button>Delete</Button> <Button>Duplicate</Button>
  //               <Typography>Published: </Typography>
  //               <Typography>Listens: </Typography>
  //             </List>
  //           </AccordionDetails>
  //         </Accordion>
  //       ))}
  //     </List>
  //   );
  // }

  return (
    <>
      <div
        id="topBarMainPage"
        style={{
          backgroundColor: "grey",
          borderBottomColor: "black",
          borderStyle: "solid",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              justifyContent: "space-between",
            },
          }}
          style={{ marginTop: "1%" }}
        >
          <div>
            <HomeIcon sx={{ fontSize: 65 }} />
            <GroupsIcon sx={{ fontSize: 65 }} />
            <AccountCircleIcon sx={{ fontSize: 65 }} />
          </div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search songs" }}
            />
          </Paper>
          <div>
            <span style={{ fontSize: "45px" }}>Sort By</span>
            <SortIcon
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ fontSize: 65 }}
            ></SortIcon>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "25ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Box>
      </div>
      <div id="">
        <div id="">
          {listCard}
          {youtubePlayerComments}
          <MUIDeleteModal />
        </div>
      </div>
      <div
        id=""
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "purple",
        }}
      >
        <Fab
          color="black"
          aria-label="add"
          //   id="add-list-button"
          onClick={handleCreateNewList}
        >
          <AddIcon />
        </Fab>
        <Typography variant="h2">Your Lists</Typography>
      </div>
    </>
  );
};

export default HomeScreen;
