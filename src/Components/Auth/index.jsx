import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { auth, provider } from "../../api/firebase";
import { signInWithPopup } from "firebase/auth";
import styles from "./index.module.scss";
import IconButton_ from "../IconButton_";
import Typography_ from "../Typography_";

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
          <Typography_ className={styles.text}>{currentUser.name}</Typography_>
          <IconButton_>
            <MeetingRoomRoundedIcon />
          </IconButton_>
        </Box>
      ) : (
        <Box>
          <Typography_ className={styles.text}>anonim</Typography_>
          <IconButton_ onClick={onSignIn}>
            <VpnKeyRoundedIcon />
          </IconButton_>
        </Box>
      )}
    </Box>
  );
};
export default Auth;
