import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./settingSlice";

export const store = configureStore({
  reducer: {
    settings: settingSlice,
  },
});
