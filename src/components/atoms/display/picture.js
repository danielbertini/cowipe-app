import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: (props) => props.width,
    minHeight: (props) => props.height,
    backgroundColor: theme.palette.divider,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    borderRadius: (props) => (props.radius ? theme.shape.borderRadius : 0),
    boxShadow: theme.shadows[1],
  },
  rootSelected: {
    minWidth: (props) => props.width,
    minHeight: (props) => props.height,
    backgroundColor: theme.palette.divider,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    borderRadius: (props) => (props.radius ? theme.shape.borderRadius : 0),
    boxShadow: `inset 0 0 0 3px ${theme.palette.secondary.main}`,
  },
}));

const AtomsDisplayPicture = (props) => {
  const classes = useStyles(props);
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

export default memo(AtomsDisplayPicture);
