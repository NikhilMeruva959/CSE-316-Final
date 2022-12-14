import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspaceScreen from "./WorkspaceScreen";
import { List } from "@mui/material";
import SongCard from "./SongCard";
import AuthContext from "../auth";
// import Button from "@mui/material";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair, selected } = props;
  const [expanded, setExpanded] = useState(false);
  const { auth } = useContext(AuthContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    handleLoadList(event, idNamePair._id);
  };

  function handleLoadList(event, id) {
    console.log("888");
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList2(id);
      console.log("777");
    }
    console.log(store.currentList);
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    let _id = event.target.id;
    _id = ("" + _id).substring("delete-list-".length);
    store.markListForDeletion(id);
  }

  async function handleDuplicateList(event, id) {
    event.stopPropagation();
    let dulicateSongList = store.getSongsFromList(id);
    console.log(dulicateSongList);
    // dulicateSongList.then(function (result) {

    //   console.log(result); // "Some User token"
    // });
    console.log("JJJJJJJJ");

    console.log(id);
    console.log(dulicateSongList);
    console.log("JJJJJJJJ2");

    // console.log(dulicateSongList);
    // store.duplicateList(dulicateSongList);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }
  let temp2 = "";
  if (auth.loggedIn) {
    // function getUserName(loggedIn) {
    let userName = auth.getUserName();
    // console.log("userNAME: " + userName);
    temp2 = userName;
    // console.log(temp2);
    // console.log("YOLOO: ");

    // if (loggedIn) return { userName };
    // else return <AccountCircle />;
  }
  let date2 = "";
  // {store.currentList.createdAt.substring(5, 7) +
  //   " " +
  //   store.currentList.createdAt.substring(8, 10) +
  //   " " +
  //   store.currentList.createdAt.substring(0, 4)}
  let date = "";
  function dateHelper() {
    if (store.currentList !== null) {
      let monthHelper = Number(store.currentList.createdAt.substring(5, 7)) - 1;

      date = new Date(
        store.currentList.createdAt.substring(0, 4),
        monthHelper,
        store.currentList.createdAt.substring(8, 10)
      );
      const month = date.toLocaleString("default", { month: "long" });
      console.log(month);
      date =
        month +
        " " +
        store.currentList.createdAt.substring(8, 10) +
        " " +
        store.currentList.createdAt.substring(0, 4);
      let date2 = store.getPlaylistSize();

      console.log(store.currentList.createdAt.substring(5, 7));
      console.log(date);
      return " " + date;
    } else {
      date = "";
      return date;
    }
  }
  console.log("date: ");
  console.log(idNamePair);

  let thumbsUp = "";
  function thumbsUpHelper(id) {
    // if (store.currentList !== null) {
    //   thumbsUp = store.currentList.thumbsUp;
    //   return " " + thumbsUp;
    // } else {
    //   thumbsUp = "";
    //   return thumbsUp;
    // }
    console.log(id);
    // (async () => await(let thumbsUp = store.getThumbsUp(id));
    // store.getThumbsUp(id).then((response) => (thumbsUp = response))
    // store.getThumbsUp(id).then((response) => {
    //   thumbsUp = response;
    //   console.log("p2");
    // });
    thumbsUp = store.getThumbsUp(id);
    console.log("PPPP");
    console.log(thumbsUp);
  }
  let thumbsDown = "";
  function thumbsDownHelper(id) {
    if (store.currentList !== null) {
      thumbsDown = store.currentList.thumbsDown;
      return " " + thumbsDown;
    } else {
      thumbsDown = "";
      return thumbsDown;
    }
  }

  // console.log(store.currentList.createdAt);

  let cardElement = (
    <Accordion
      //   id={idNamePair._id}
      //   key={idNamePair._id}
      //   sx={{ marginTop: "15px", display: "flex", p: 1 }}
      //   style={{ width: "100%", fontSize: "48pt" }}
      //   button
      //   onClick={(event) => {
      //     handleLoadList(event, idNamePair._id);
      //   }}
      expanded={expanded === "panel" + idNamePair._id + ""}
      onChange={handleChange("panel" + idNamePair._id + "")}
      //   onChange={(event) => {
      //     handleLoadList(event, idNamePair._id);
      //   }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {idNamePair.name}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>By: {temp2}</Typography>
        <ThumbUpIcon />
        {thumbsUpHelper(idNamePair._id)}
        <ThumbDownIcon />
        {thumbsDownHelper(idNamePair._id)}
      </AccordionSummary>
      <AccordionDetails>
        {/* <Box height="300x"> */}
        <WorkspaceScreen />
        <IconButton
          onClick={(event) => {
            handleDeleteList(event, idNamePair._id);
          }}
          aria-label="delete"
        >
          Delete
        </IconButton>
        <IconButton
          onClick={(event) => {
            handleDuplicateList(event, idNamePair._id);
          }}
          aria-label="duplicate"
        >
          Duplicate
        </IconButton>
        <Typography>Published:{dateHelper()}</Typography>
        <Typography>Listens: </Typography>
        {/* </Box> */}
      </AccordionDetails>
      {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> */}
      {/* <Box sx={{ p: 1 }}>
      <IconButton onClick={handleToggleEdit} aria-label="edit">
        <EditIcon style={{ fontSize: "48pt" }} />
      </IconButton>
    </Box>
    <Box sx={{ p: 1 }}>
      <IconButton
        onClick={(event) => {
          handleDeleteList(event, idNamePair._id);
        }}
        aria-label="delete"
      >
        <DeleteIcon style={{ fontSize: "48pt" }} />
      </IconButton>
    </Box> */}
    </Accordion>
  );

  // let cardElement = (
  //   <ListItem
  //     id={idNamePair._id}
  //     key={idNamePair._id}
  //     sx={{
  //       borderRadius: "25px",
  //       p: "10px",
  //       bgcolor: "#8000F00F",
  //       marginTop: "15px",
  //       display: "flex",
  //       p: 1,
  //     }}
  //     style={{ transform: "translate(1%,0%)", width: "98%", fontSize: "48pt" }}
  //     button
  //     onClick={(event) => {
  //       handleLoadList(event, idNamePair._id);
  //     }}
  //   >
  //     <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
  //     <Box sx={{ p: 1 }}>
  //       <IconButton onClick={handleToggleEdit} aria-label="edit">
  //         <EditIcon style={{ fontSize: "48pt" }} />
  //       </IconButton>
  //     </Box>
  //     <Box sx={{ p: 1 }}>
  //       <IconButton
  //         onClick={(event) => {
  //           handleDeleteList(event, idNamePair._id);
  //         }}
  //         aria-label="delete"
  //       >
  //         <DeleteIcon style={{ fontSize: "48pt" }} />
  //       </IconButton>
  //     </Box>
  //   </ListItem>
  // );
  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
