import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "./typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconDecoration: {
    width: 44,
    height: 44,
    backgroundColor: theme.palette.divider,
    borderRadius: 22,
    marginRight: (props) => (props.title ? 10 : 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      opacity: 0.25,
    },
  },
}));

const AtomsDisplayIcon = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.iconDecoration}>{props.children}</div>
        <div>
          {props.title && (
            <Typography variant="subtitle1">{props.title}</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(AtomsDisplayIcon);
