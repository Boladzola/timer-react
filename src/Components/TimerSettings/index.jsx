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
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import styles from "./index.module.scss";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentBG,
  setCurrentMusic,
  setCurrentSignal,
  setTheme,
} from "../../store/settingSlice";
import {
  backgroundOptions,
  musicOptions,
  signalOptions,
  themes,
} from "../../store/settingSlice/utils";
import Button_ from "../Button";
import ButtonOut from "../ButtonOut";
import IconButton_ from "../IconButton_";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSignalPlaying, setIsSignalPlaying] = useState(false);
  const [localMusic, setLocalMusic] = useState('');
  const [localSignal, setLocalSignal] = useState('');
  const [localBG, setLocalBG] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');

  const audioRef = useRef(new Audio()); // Use ref to control audio playback directly
  const signalRef = useRef(new Audio()); // Use ref for signal playback

  const currentMusic = useSelector((store) => store.settings.currentMusic.id);
  const currentSignal = useSelector((store) => store.settings.currentSignal.id);
  const currentBG = useSelector((store) => store.settings.currentBG.id);
  const theme = useSelector((store) => store.settings.theme);

  const changeCurrentMusic = (id) => dispatch(setCurrentMusic(id));
  const changeCurrentSignal = (id) => dispatch(setCurrentSignal(id));
  const changeCurrentBG = (id) => dispatch(setCurrentBG(id));
  const changeTheme = (id) => dispatch(setTheme(id));

  useEffect(() => {
    // Update audio source when localMusic changes
    audioRef.current.src = musicOptions.find(music => music.id === localMusic)?.src || '';
    audioRef.current.load(); // Reload the audio
  }, [localMusic]);

  useEffect(() => {
    // Update signal source when localSignal changes
    signalRef.current.src = signalOptions.find(signal => signal.id === localSignal)?.src || '';
    signalRef.current.load(); // Reload the signal
  }, [localSignal]);

  const demoMusicPlay = () => {
    audioRef.current.play();
    setIsMusicPlaying(true);
  };

  const demoMusicPause = () => {
    audioRef.current.pause();
    setIsMusicPlaying(false);
  };

  const demoSignalPlay = () => {
    signalRef.current.play();
    setIsSignalPlaying(true);
  };

  const demoSignalPause = () => {
    signalRef.current.pause();
    setIsSignalPlaying(false);
  };

  const handleOpenDialog = () => {
    setLocalMusic(currentMusic);
    setLocalSignal(currentSignal);
    setLocalBG(currentBG);
    setCurrentTheme(theme.id); // Assuming theme.id is used
    setIsDialogOpen(true);
  };

  const showBGPreview = () => {
    changeCurrentBG(localBG);
  };

  const handleSave = () => {
    changeCurrentMusic(localMusic);
    changeCurrentSignal(localSignal);
    changeCurrentBG(localBG);
    changeTheme(currentTheme);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box className={styles.timerSettings}>
      <IconButton_ onClick={handleOpenDialog}>
        <SettingsIcon />
      </IconButton_>
      <Dialog open={isDialogOpen} onClose={handleCancel}>
        <Box className={styles.dialogMainBox}>
          <Box p={1}>
            <Typography textAlign={"center"} variant="h5">
              Settings
            </Typography>
          </Box>
          <Box className={styles.grid}>
            <Box>
              {isMusicPlaying ? (
                <IconButton_  onClick={demoMusicPause}>
                  <PauseRoundedIcon />
                </IconButton_>
              ) : (
                <IconButton_  onClick={demoMusicPlay}>
                  <PlayArrowRoundedIcon />
                </IconButton_>
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
          <Box className={styles.grid}>
            <Box>
              {isSignalPlaying ? (
                <IconButton_ color="success" onClick={demoSignalPause}>
                  <PauseRoundedIcon />
                </IconButton_>
              ) : (
                <IconButton_ color="success" onClick={demoSignalPlay}>
                  <PlayArrowRoundedIcon />
                </IconButton_>
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
          <Box className={styles.grid}>
            <Button_ onClick={showBGPreview} variant="contained" >
              Show Background
            </Button_>
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
          <Box className={styles.grid}>
            <Button_>Change theme</Button_>
            <Select
              value={currentTheme}
              color={"success"}
              onChange={(e) => setCurrentTheme(e.target.value)}
            >
              {themes.map(({ id, color }) => (
                <MenuItem key={id} value={id}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className={styles.grid}>
            <Button_ onClick={handleSave} variant="contained" color="success">
              Save
            </Button_>
            <ButtonOut onClick={handleCancel} variant="outlined" color="success">
              Cancel
            </ButtonOut>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default TimerSettings;
