import React, { memo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  InfoRounded as InfoIcon,
  WarningRounded as WarningIcon,
} from "@material-ui/icons";

import Typography from "./typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    padding: 15,
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: 15,
  },
  iconError: {
    color: theme.palette.error.main,
    marginRight: 15,
  },
}));

const AtomDisplayInfo = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      {props.type && props.type === "error" ? (
        <WarningIcon className={classes.iconError} />
      ) : (
        <InfoIcon className={classes.icon} />
      )}
      <Typography
        variant="body1"
        style={{
          marginTop: 2,
          color:
            props.type && props.type === "error"
              ? theme.palette.error.main
              : theme.palette.text.primary,
        }}
      >
        {props.text}
      </Typography>
    </div>
  );
};

export default memo(AtomDisplayInfo);
