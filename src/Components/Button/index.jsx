import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

const getButtonClassByTheme = (color) => {
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

const Button_ = ({ children, ...rest }) => {
  const theme = useSelector((store) => store.settings.theme);

  return (
    <Button {...rest} className={getButtonClassByTheme(theme.color)}>
      {children}
    </Button>
  );
};

export default Button_;
