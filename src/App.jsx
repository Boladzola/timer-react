import { Box } from "@mui/material";
import react, { useEffect, useRef } from "react";
import TimerSettings from "./Components/TimerSettings";
import TimerBody from "./Components/TimerBody";
import { setAudioRef, setSignalRef, } from "./store/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Components/Auth";

function App() {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const signalRef = useRef();
  const currentMusic = useSelector((store) => store.settings.currentMusic);
  const currentSignal = useSelector((store) => store.settings.currentSignal);
  const currentBG = useSelector((store) => store.settings.currentBG);
  // useEffect(() => {
  //   dispatch(setAudioRef(audioRef));
  //   dispatch(setSignalRef(signalRef));
  // }, []);
  
  return (
    <Box
      sx={{ backgroundImage: `url("${currentBG.src}")` }}
      className={"main_container"}
    >
      <Auth />
      <TimerSettings />
      <TimerBody />
      <Box>
        <audio ref={audioRef} src={currentMusic.src} type={"audio.mpeg"} />
        <audio ref={signalRef} src={currentSignal.src} type={"audio.mpeg"} />
      </Box>
    </Box>
  );
}

export default App;



