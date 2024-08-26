import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./index.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentBG,
  setCurrentMusic,
  setCurrentSignal,
} from "../../store/settingSlice";
import {
  backgroundOptions,
  musicOptions,
  signalOptions,
} from "../../store/settingSlice/utils";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

const TimerSettings = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const audioRef = useSelector((store) => store.settings.audioRef);
  const signalRef = useSelector((store) => store.settings.signalRef);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSignalPlaying, setIsSignalPlaying] = useState(false);

  const currentMusic = useSelector((store) => store.settings.currentMusic.id);
  const currentSignal = useSelector((store) => store.settings.currentSignal.id);
  const currentBG = useSelector((store) => store.settings.currentBG.id);
  const changeCurrentMusic = (id) => dispatch(setCurrentMusic(id));
  const changeCurrentSignal = (id) => dispatch(setCurrentSignal(id));
  const changeCurrentBG = (id) => dispatch(setCurrentBG(id));

  const demoMusicPlay = () => {
    audioRef.current.play();
    setIsMusicPlaying(true);
  };
  const demoMusicPause = () => {
    audioRef.current.pause();
    setIsMusicPlaying(false);
  };
  // --------------------------------------------
  const demoSignalPlay = () => {
    signalRef.current.play();
    setIsSignalPlaying(true);
  };
  const demoSignalPause = () => {
    signalRef.current.pause();
    setIsSignalPlaying(false);
  };

  return (
    <Box className={styles.timerSettings}>
      <IconButton color="success" onClick={() => setIsDialogOpen(true)}>
        <SettingsIcon />
      </IconButton>
      {/* //----------------------------------------------------- */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Box className={styles.dialogMainBox}>
          <Box p={1}>
            <Typography textAlign={"center"} variant="h5">
              Settings
            </Typography>
          </Box>
          {/* ------------------------------------------------------- */}
          <Box className={styles.grid} >
            {/* <FormControlLabel
              control={<Switch color="success" />}
              label={"Music"}
            /> */}
            <Box>
              {isMusicPlaying ? (
                <IconButton color="success">
                  <PauseRoundedIcon onClick={demoMusicPause} />
                </IconButton>
              ) : (
                <IconButton color="success">
                  <PlayArrowRoundedIcon onClick={demoMusicPlay} />
                </IconButton>
              )}
            </Box>
            
            <Select
              value={currentMusic}
              color={"success"}
              onChange={(e) => changeCurrentMusic(e.target.value)}
            >
              {musicOptions.map((musicItem) => (
                <MenuItem key={musicItem.id} value={musicItem.id}>
                  {musicItem.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ------------------------------------------------------------- */}
          <Box className={styles.grid} >
            {/* <FormControlLabel
              control={<Switch color="success" />}
              label={"Alarm"}
            /> */}
            <Box>
              {isSignalPlaying ? (<IconButton color="success">
                <PauseRoundedIcon onClick={demoSignalPause} />
              </IconButton>) : (<IconButton color="success">
                <PlayArrowRoundedIcon onClick={demoSignalPlay} />
              </IconButton>)}
              
            </Box>
            
            <Select
              value={currentSignal}
              color={"success"}
              onChange={(e) => changeCurrentSignal(e.target.value)}
            >
              {signalOptions.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ----------------------------------------------------------------- */}
          <Box className={styles.grid} >
            <FormControlLabel
              control={<Switch color="success" />}
              label={"Background"}
            />
            <Select
              value={currentBG}
              color={"success"}
              onChange={(e) => changeCurrentBG(e.target.value)}
            >
              {backgroundOptions.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ----------------------------------------------------------------- */}
          <Box className={styles.grid} >
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="contained"
              color="success"
            >
              Save
            </Button>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outlined"
              color="success"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default TimerSettings;
