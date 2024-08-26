import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { auth, provider } from "../../api/firebase";
import { signInWithPopup } from "firebase/auth";
import styles from "./index.module.scss";

const Auth = ({ isAuth }) => {
  const [currentUser, setCurrentUser] = useState({});
  const onSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      const newUser = {
        name: data.user.displayName,
        email: data.user.email,
      };
      setCurrentUser(newUser);
    });
  };

  return (
    <Box className={styles.authBox}>
      {isAuth ? (
        <Box>
          <Typography>{currentUser.name}</Typography>
          <IconButton>
            <MeetingRoomRoundedIcon />
          </IconButton>
        </Box>
      ) : (
        <Box>
          <Typography>anonim</Typography>
          <IconButton onClick={onSignIn}>
            <VpnKeyRoundedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
export default Auth;
