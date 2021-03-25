import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: props.width,
      minHeight: props.height,
      backgroundColor: theme.palette.divider,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      borderRadius: props.radius ? theme.shape.borderRadius : 0,
      boxShadow: theme.shadows[1],
    },
    rootSelected: {
      minWidth: props.width,
      minHeight: props.height,
      backgroundColor: theme.palette.divider,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      borderRadius: props.radius ? theme.shape.borderRadius : 0,
      boxShadow: `inset 0 0 0 3px ${theme.palette.secondary.main}`,
    },
  }));

  const classes = useStyles();

  return (
    <div
      onClick={props.onClick}
      className={props.selected ? classes.rootSelected : classes.root}
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: `url(${props.src})`,
      }}
    ></div>
  );
};

export default memo(Component);
