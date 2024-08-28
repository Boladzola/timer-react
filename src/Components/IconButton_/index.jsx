import { Button, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

const getIconButtonClassByTheme = (color) => {
  switch (color) {
    case "salmon":
      return styles.salmon;
    case "turquiose":
      return styles.turquiose;
    case "green":
      return styles.green;
    case "pink":
      return styles.pink;
    case "bluegreen":
      return styles.bluegreen;
    case "dark":
      return styles.dark;
    case "grey":
      return styles.grey;

    default:
      return styles.default;
  }
};

const IconButton_ = ({ children, ...rest }) => {
  const theme = useSelector((store) => store.settings.theme);

  return (
    <IconButton {...rest} className={getIconButtonClassByTheme(theme.color)}>
      {children}
    </IconButton>
  );
};

export default IconButton_;
