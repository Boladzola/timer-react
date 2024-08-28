import { Box, Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import TimerInputs from "./TimerInputs";
import gifLoader from "../../assets/clock.gif";
import { Transition } from "react-transition-group";
import Button_ from "../Button";
import ButtonOut from "../ButtonOut";


const timeViewValue = (value) => {
  if (value < 10) return "0" + value;
  else return value;
};

const getBeautifulTimeValue = (value) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return [timeViewValue(minutes), timeViewValue(seconds)];
};

// --------------------------------------------------------
const TimerBody = () => {
  const [timerValue, setTimerValue] = useState(0);
  const [currentTimerId, setCurrentTimerId] = useState(null);
  const [isMusicDialogOpen, setIsMusicDialogOpen] = useState(false);
  //-------------------------------------------------------
  const audioRef = useSelector((state) => state.settings.audioRef);
  const signalRef = useSelector((state) => state.settings.signalRef);
  const [minutes, seconds] = getBeautifulTimeValue(timerValue);

  const playFinalSignal = () => {
    signalRef.current.play();
    setTimeout(() => {
      signalRef.current.pause();
      signalRef.current.currentTime = 0; 
    }, 3000);    
  };
  const playMusic = () => audioRef.current.play();
  const pauseMusic = () => audioRef.current.pause();

  const onTimerStop = () => {
    clearInterval(currentTimerId);
    setCurrentTimerId(null);
    pauseMusic();
  };
  const onClickStart = () => setIsMusicDialogOpen(true);
  const onTimerStart = (withMusic) => {
    if (withMusic) playMusic();
    audioRef.current.loop = true;
    setIsMusicDialogOpen(false);
    const timerId = setInterval(() => {
      setTimerValue((prev) => {
        if (prev === 0) {
          playFinalSignal();
          clearInterval(timerId);
          setCurrentTimerId(null);
          pauseMusic();
          return 0;
        } else return prev - 1;
      });
    }, 1000);
    setCurrentTimerId(timerId);
  };

  return (
    <>
      <Box className={styles.mainTimerBoxWrapper}>
        
          <Box className={styles.mainTimerBox}>
            <Transition
            className={styles.gifLoaderBox}
              in={!!currentTimerId}
              timeout={1000}
              mountOnEnter
              unmountOnExit
            >
              {(state) => (
                <div
                  className={`${styles.gifLoader} ${styles[state]}`}
                  style={{ backgroundImage: `url(${gifLoader})` }}
                />
              )}
            </Transition>
            <Typography variant="h1">
              {minutes}:{seconds}
            </Typography>
            <TimerInputs
              disabled={!!currentTimerId}
              setTimerValue={setTimerValue}
              timerValue={timerValue}
            />
            <Box className={styles.timerButtonsBox}>
              <Button_
                variant="contained"
                // color="success"
                disabled={currentTimerId}
                onClick={onClickStart}
              >
                START
              </Button_>
              <ButtonOut
                variant="outlined"
                // color="success"
                onClick={onTimerStop}
                disabled={!currentTimerId}
              >
                STOP
              </ButtonOut>
            </Box>
          </Box>
            {/* ----------------------------------------------- */}
          <Dialog
            open={isMusicDialogOpen}
            onClose={() => setIsMusicDialogOpen(false)}
          >
            <Box p={2}>
              <Box my={2}>
                <Typography>Do you want to play music?</Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-evenly"} p={1}>
                <Button_
                  variant="contained"
                  // color="success"
                  onClick={() => onTimerStart(true)}
                >
                  Yes
                </Button_>
                <ButtonOut
                  variant="outlined"
                  // color="success"
                  onClick={() => onTimerStart()}
                >
                  No
                </ButtonOut>
              </Box>
              <Box display={"flex"} justifyContent={"center"} p={1}>
                <ButtonOut
                  // color="success"
                  onClick={() => setIsMusicDialogOpen(false)}
                >
                  Cancel
                </ButtonOut>
              </Box>
            </Box>
          </Dialog>
        </Box>
    </>
  );
};

export default TimerBody;
