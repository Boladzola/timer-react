import { createSlice } from "@reduxjs/toolkit";
import { backgroundOptions, musicOptions, signalOptions } from "./utils";

const initialState = {
  audioRef: null,
  signalRef: null,
  currentMusic: musicOptions[0],
  currentSignal: signalOptions[0],
  currentBG: backgroundOptions[0],
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAudioRef(state, { payload: newRef }) {
      state.audioRef = newRef;
    },
    setSignalRef(state, { payload: newRef }) {
      state.signalRef = newRef;
    },
    setCurrentMusic(state, { payload: id }) {
      const newMusic = musicOptions.find((item) => item.id === id);
      if (newMusic) state.currentMusic = newMusic;
    },
    setCurrentSignal(state, { payload: id }) {
      const newSignal = signalOptions.find((item) => item.id === id);
      if (newSignal) state.currentSignal = newSignal;
    },
    setCurrentBG(state, { payload: id }) {
      const newBG = backgroundOptions.find((item) => item.id === id);
      if (newBG) state.currentBG = newBG;
    },
  },
});

export default settingsSlice.reducer;

export const {
  setAudioRef,
  setSignalRef,
  setCurrentMusic,
  setCurrentSignal,
  setCurrentBG,
} = settingsSlice.actions;
