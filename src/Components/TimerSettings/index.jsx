import { Box, Dialog, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./index.module.scss";
import { useState } from "react";

const TimerSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Box className={styles.timerSettings}>
      <IconButton onClick={() => setIsDialogOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Box className={styles.dialogMainBox}>DIALOG</Box>
      </Dialog>
    </Box>
  );
};

export default TimerSettings;
