import React from "react";
import YouTube from "react-youtube";
import { useContext } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import Box from "@mui/material/Box";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import Typography from "@mui/material/Typography";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastForwardIcon from "@mui/icons-material/FastForward";

function YouTubePlayer() {
  const { store } = useContext(GlobalStoreContext);
  //test playlist
  let playlist = ["_mVW8tgGY_w", "_m-gO0HSCYk", "_2-Y2WbrKpw"];
  let currentSong = 0;

  const playerDim = {
    height: "400",
    width: "550",
    playerVars: {
      autoplay: 0,
    },
  };

  function currentSongLoad(player) {
    let song = playlist[currentSong];
    player.loadVideoById(song);
    player.playVideo();
  }

  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
  }

  function playerReady(event) {
    currentSongLoad(event.target);
    event.target.playVideo();
  }
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      console.log("-1");
    } else if (playerStatus === 0) {
      console.log("0");
      incSong();
      currentSongLoad(player);
    } else if (playerStatus === 1) {
      console.log("1");
    } else if (playerStatus === 2) {
      console.log("2");
    } else if (playerStatus === 3) {
      console.log("3");
    } else if (playerStatus === 5) {
      console.log("5");
    }
  }

  return (
    <>
      <YouTube
        videoId={playlist[currentSong]}
        opts={playerDim}
        onReady={playerReady}
        onStateChange={onPlayerStateChange}
      />
      <Box sx={{ bgcolor: "background.paper" }} id="Youtube-Bar">
        <Typography
          id="Youtube-Player-Typography"
          variant="h6"
          sx={{ color: "#301974", fontWeight: "bold", mt: 1 }}
        >
          Now Playing
        </Typography>
        <Button id="rewind-button" variant="contained">
          <FastRewindIcon />
        </Button>
        <Button
          disabled={!store.canUndo()}
          id="pause-button"
          variant="contained"
        >
          <PauseIcon />
        </Button>
        <Button
          disabled={!store.canClose()}
          id="fast-forward-button"
          variant="contained"
        >
          <FastForwardIcon />
        </Button>
        <Button
          disabled={!store.canRedo()}
          id="user-button"
          variant="contained"
        >
          <PlayArrowIcon />
        </Button>
      </Box>
    </>
  );
}
export default YouTubePlayer;
