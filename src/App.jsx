import { Box } from "@mui/material";
import react from "react";
import TimerSettings from "./Components/TimerSettings";
import TimerBody from "./Components/TimerBody";

function App() {
  return (
    <Box className={"main_container"}>
      <TimerSettings />
      <TimerBody />
    </Box>
  );
}

export default App;
