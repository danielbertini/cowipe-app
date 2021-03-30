import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../display/typography";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    detail: {
      width: 40,
      height: 3,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 2,
      marginTop: 10,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Typography variant={props.variant} gutterBottom={props.gutterBottom}>
        {props.children}
      </Typography>
      <div className={classes.detail} />
    </>
  );
};

export default memo(Component);
