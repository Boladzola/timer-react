import {
  Box,
  Button,
  Dialog,
  IconButton,
  MenuItem,
  Select,
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

  const [localMusic, setLocalMusic] = useState(currentMusic);
  const [localSignal, setLocalSignal] = useState(currentSignal);
  const [localBG, setLocalBG] = useState(currentBG);

  const changeCurrentMusic = (id) => dispatch(setCurrentMusic(id));
  const changeCurrentSignal = (id) => dispatch(setCurrentSignal(id));
  const changeCurrentBG = (id) => dispatch(setCurrentBG(id));

  const demoMusicPlay = () => {     // demo music play
    audioRef.current.play();
    setIsMusicPlaying(true);
  };
  const demoMusicPause = () => {    // demo music pause
    audioRef.current.pause();
    setIsMusicPlaying(false);
  };
  // --------------------------------------------
  const demoSignalPlay = () => {    // demo signal play
    signalRef.current.play();
    setIsSignalPlaying(true);
  };
  const demoSignalPause = () => {   // demo signal pause
    signalRef.current.pause();
    setIsSignalPlaying(false);
  };

  const handleOpenDialog = () => {  // open dialoge window
    setLocalMusic(currentMusic);
    setLocalSignal(currentSignal);
    setLocalBG(currentBG);
    setIsDialogOpen(true); 
  };


  const showBGPreview = () => {    //button show BG in real-time
    changeCurrentBG(localBG);
    setIsDialogOpen(true);
  };


  const handleSave = () => {      //savings
    changeCurrentMusic(localMusic);
    changeCurrentSignal(localSignal);
    changeCurrentBG(localBG);
    setIsDialogOpen(false);    
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // close dialog window
  };

  return (
    <Box className={styles.timerSettings}>
      <IconButton color="success" onClick={handleOpenDialog}>
        <SettingsIcon />
      </IconButton>
      {/* //----------------------------------------------------- */}
      <Dialog open={isDialogOpen} onClose={handleCancel}>
        <Box className={styles.dialogMainBox}>
          <Box p={1}>
            <Typography textAlign={"center"} variant="h5">
              Settings
            </Typography>
          </Box>
          {/* -----------------------------Music Settings-------------------------- */}
          <Box className={styles.grid}>
            
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
              value={localMusic}
              color={"success"}
              onChange={(e) => setLocalMusic(e.target.value)}
            >
              {musicOptions.map((musicItem) => (
                <MenuItem key={musicItem.id} value={musicItem.id}>
                  {musicItem.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ---------------------------------Signal settings---------------------------- */}
          <Box className={styles.grid}>
            
            <Box>
              {isSignalPlaying ? (
                <IconButton color="success">
                  <PauseRoundedIcon onClick={demoSignalPause} />
                </IconButton>
              ) : (
                <IconButton color="success">
                  <PlayArrowRoundedIcon onClick={demoSignalPlay} />
                </IconButton>
              )}
            </Box>

            <Select
              value={localSignal}
              color={"success"}
              onChange={(e) => setLocalSignal(e.target.value)}
            >
              {signalOptions.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ------------------------------Setting of background----------------------------------- */}
          <Box className={styles.grid}>
            <Button onClick={showBGPreview} variant="contained" color="success">Show Background</Button>

            <Select
              value={localBG}
              color={"success"}
              onChange={(e) => setLocalBG(e.target.value)}
            >
              {backgroundOptions.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* ------------------------------Save and Cancel Buttons----------------------------------- */}
          <Box className={styles.grid}>
            <Button onClick={handleSave} variant="contained" color="success">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="success">
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default TimerSettings;
